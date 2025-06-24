class SystemError extends Error {
    message: string;
    peek: object;

    constructor(message: string, peek: object = {}) {
        super(message);

        this.message = message;
        this.peek = peek;

        Error.captureStackTrace(this, SystemError);
    }
}

export default SystemError;
