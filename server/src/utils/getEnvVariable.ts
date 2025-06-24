import dotenv from "dotenv";
import systemLogger, { LogLevels } from "./logger";


type GetEnvVariable = {
    (envVarName: string, fatalIfNotFound: true): string;
    (envVarName: string, fatalIfNotFound: false): string | undefined;
};

const getEnvVariable: GetEnvVariable = (envVarName, fatalIfNotFound): any => {
    envVarName = "NODEJS_SERVER_" + envVarName.trim().toUpperCase();

    const envVarValue = process.env[envVarName];

    if (!envVarValue && fatalIfNotFound) {
        systemLogger(LogLevels.FATAL, `FATAL ERROR: Environment variable "${envVarName}" is not set!`);
        systemLogger(LogLevels.FATAL, `*** EXITING PROCESS IMMEDIATELY ***`);

        process.exit(-1);
    }

    return envVarValue;
};


(() => {
    dotenv.config({ path: "./.env" });
})();


export default getEnvVariable;