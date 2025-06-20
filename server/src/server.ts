import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authenticationMiddleware from "./middlewares/auth.middleware";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import centralRouter from "./routes/router";
import systemLogger, { LogLevels } from "./utils/logger";
import getEnvVariable from "./utils/getEnvVariable";


const app = express();

app.disable('x-powered-by');

const URL_WHITELIST = [getEnvVariable("CLIENT_URL", true)];
app.use(cors({
    origin: URL_WHITELIST,
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use(authenticationMiddleware);
app.use("/", centralRouter);
app.use(errorHandlerMiddleware);


const startServer = async (): Promise<void> => {
    const PORT = Number(getEnvVariable("SERVER_PORT", false) || "5500");

    try {
        const server = app.listen(PORT, () => {
            systemLogger(LogLevels.INFO, `Server running on http://localhost:${PORT}.`);
        });

        process.on("SIGTERM", () => {
            systemLogger(LogLevels.INFO, 'Server: Received SIGINT. Terminating Server Forcefully.');
            server.close(() => {
                systemLogger(LogLevels.INFO, 'Server: Server terminated successfully.');

                process.exit(0);
            });
        });

        process.on("SIGTERM", () => {
            systemLogger(LogLevels.INFO, 'Server: Received SIGTERM. Terminating Server Gracefully.');
            server.close(() => {
                systemLogger(LogLevels.INFO, 'Server: Server terminated successfully.');

                process.exit(0);
            });
        });
    } catch (error) {
        systemLogger(LogLevels.FATAL, "FATAL ERROR: Failed to start server.");
        systemLogger(LogLevels.FATAL, "Error details.", { error });
        systemLogger(LogLevels.FATAL, "*** EXITING PROCESS IMMEDIATELY ***");

        process.exit(1);
    }
};

process.on("unhandledRejection", (reason) => {
    systemLogger(LogLevels.FATAL, "Unhandled Rejection", {
        reason,
    });
});

process.on("uncaughtException", (error) => {
    systemLogger(LogLevels.FATAL, "Unhandled Exception", {
        error,
    });
});

export { startServer };

