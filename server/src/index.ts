import "./config/env";

import { startServer, shutDownServer } from "./server";
import { connectToDatabase, closeDatabaseConnection } from "./database/db";
import systemLogger, { LogLevels } from "./utils/logger";

(async () => {
    await connectToDatabase();

    await startServer();

    process.on("SIGINT", async () => {
        systemLogger(LogLevels.INFO, 'Received SIGINT. Terminating process');

        await closeDatabaseConnection();

        await shutDownServer();
    });

    process.on("SIGTERM", async () => {
        systemLogger(LogLevels.INFO, 'Received SIGTERM. Terminating process');

        await closeDatabaseConnection();

        await shutDownServer();
    });

    process.on("unhandledRejection", (reason) => {
        systemLogger(LogLevels.FATAL, "Unhandled Rejection", {
            reason,
        });

        process.exit(-1);
    });

    process.on("uncaughtException", (error) => {
        systemLogger(LogLevels.FATAL, "Unhandled Exception", {
            error,
        });

        process.exit(-1);
    });
})();

