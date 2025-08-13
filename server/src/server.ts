import { Server } from "http";
import express from "express";
import cookieParser from "cookie-parser";
import authenticationMiddleware from "./middlewares/auth.middleware";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import centralRouter from "./routes/router";
import systemLogger, { LogLevels } from "./utils/logger";
import getEnvVariable from "./utils/getEnvVariable";


const app = express();

app.disable('x-powered-by');

app.use(cookieParser());
app.use(express.json());

app.use(authenticationMiddleware);
app.use("/", centralRouter);
app.use(errorHandlerMiddleware);


let server: Server | null = null;

const startServer = async (): Promise<void> => {
    const PORT = Number(getEnvVariable("SERVER_PORT", false) || "5500");

    try {
        server = app.listen(PORT, () => {
            systemLogger(LogLevels.INFO, `Server running on http://localhost:${PORT}.`);
        });
    } catch (error) {
        systemLogger(LogLevels.FATAL, "FATAL ERROR: Failed to start server.");
        systemLogger(LogLevels.FATAL, "Error details.", { error });
        systemLogger(LogLevels.FATAL, "*** EXITING PROCESS IMMEDIATELY ***");

        process.exit(1);
    }
};

const shutDownServer = async (): Promise<void> => {
    try {
        if (server) {
            server.close(() => {
                systemLogger(LogLevels.INFO, 'Server terminated successfully.');
            });
        }
        else {
            systemLogger(LogLevels.WARN, 'Server is no server, cannot shutdown an a not server.');
        }
    }
    catch (error) {
        systemLogger(LogLevels.ERROR, "Error while trying to shutdown server.", { error });
    }
}

export { startServer, shutDownServer };

