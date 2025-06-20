import mongoose from 'mongoose';
import systemLogger, { LogLevels } from '../utils/logger';
import getEnvVariable from '../utils/getEnvVariable';
import SystemError from "../utils/systemError";
import { timeOut } from '../utils/time';

let maxRetries = 10;
const isConnected = () => mongoose.connection.readyState === 1;

const connectToDatabase_internal = async (): Promise<true | null> => {
    const MONGODB_URI = getEnvVariable('MONGODB_URI', true);
    const POOL_SIZE = Number(getEnvVariable('MONGODB_POOL_SIZE', true));

    if (isConnected()) {
        return null;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            maxPoolSize: POOL_SIZE,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4,
        });

        return true;
    }
    catch (error) {
        throw error;
    }
};

const connectToDatabase = async (retryInterval = 2000): Promise<void> => {
    if (maxRetries <= 0) {
        systemLogger(LogLevels.FATAL, "MongoDB: Max retry attempts reached.");
        systemLogger(LogLevels.FATAL, "MongoDB: Failed to connect to database.");
        systemLogger(LogLevels.FATAL, "*** EXITING PROCESS IMMEDIATELY ***");

        process.exit(-1);
    }

    let attempt = 1;

    while (attempt <= maxRetries) {
        try {
            const result = await connectToDatabase_internal();

            if (result === true) {
                return systemLogger(LogLevels.INFO, 'MongoDB: Database connected successfully.');
                maxRetries = 10;
            } else {
                return systemLogger(LogLevels.WARN, 'MongoDB: Attempting to reconnect to database when it\'s already connected.');
            }
        } catch (error) {
            systemLogger(LogLevels.ERROR, `MongoDB: Attempt ${attempt} - Failed to connect to database.`, { error });

            await timeOut(Math.pow(2, attempt) * retryInterval);
            attempt++;
        }
    }
};

mongoose.connection.on('disconnected', () => {
    systemLogger(LogLevels.ERROR, 'MongoDB: Database disconnected.');
    systemLogger(LogLevels.WARN, 'MongoDB: Attempting to reconnect...');
    connectToDatabase();
});


mongoose.connection.on('reconnected', () => {
    systemLogger(LogLevels.INFO, 'MongoDB: Database reconnected.');
});

const getDatabaseConnection = async (): Promise<typeof mongoose> => {
    if (!isConnected()) {
        await connectToDatabase();
    }

    if (isConnected()) {
        return mongoose;
    }
    else {
        throw new SystemError(
            'Not able to retrieve database connection.',
            {
                origin: "src:database:db:getDatabaseConnection()",
                MONGODB_URI: getEnvVariable('MONGODB_URI', true),
            }
        );
    }
};

const checkDatabaseConnectionStatus = async (): Promise<boolean> => {
    return isConnected();
};

process.on('SIGINT', async () => {
    await mongoose.connection.close();

    systemLogger(LogLevels.INFO, 'MongoDB: Database connection closed on app termination.');
});

process.on("SIGTERM", async () => {
    await mongoose.connection.close();

    systemLogger(LogLevels.INFO, 'MongoDB: Database connection closed on app termination.');
});

export {
    connectToDatabase,
    getDatabaseConnection,
    checkDatabaseConnectionStatus
};

