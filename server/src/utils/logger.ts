import { LogLevels } from "../types/index.types";

const systemLogger = (level: LogLevels, message: string, peek: object | null = null) => {
    const now = new Date();

    console.log(`[${now.toISOString()}]: ${message}`);

    if (peek) {
        console.log(JSON.stringify(peek, null, 4));
    }
}

export default systemLogger;
export { LogLevels };
