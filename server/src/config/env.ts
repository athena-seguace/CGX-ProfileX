import getEnvVariable from "../utils/getEnvVariable";
import systemLogger, { LogLevels } from "../utils/logger";


(() => {
    systemLogger(LogLevels.INFO, "Verifying if all required environment variables are present.");

    getEnvVariable("ENV", true);
    getEnvVariable("MONGODB_URI", true);
    getEnvVariable("MONGODB_POOL_SIZE", true);
    getEnvVariable("SERVER_PORT", true);
    getEnvVariable("JWT_SECRET_KEY", true);

    systemLogger(LogLevels.INFO, "Found all required environment variables.");
})();

