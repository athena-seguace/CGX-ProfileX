import { Request, Response, NextFunction } from "express";
import ResponseHandler from "../utils/responseHandler";
import SystemError from "../utils/systemError";
import systemLogger from "../utils/logger";
import { FailedResponseCodeEnum, FailureResponseCodesEnum, LogLevels } from "../types/index.types";

const errorHandlerMiddleware = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const stackTrace = error?.stack || 'No stack trace available';
    console.log("stack trace:\n", stackTrace);

    if (error instanceof SyntaxError) {
        return new ResponseHandler(res).sendFailed(
            FailedResponseCodeEnum.BAD_REQUEST,
            "Invalid JSON format."
        );
    }

    if (error instanceof SystemError)
        systemLogger(LogLevels.ERROR, "SystemError", { error });

    else if (error instanceof Error)
        systemLogger(LogLevels.ERROR, "Generic Error", { error });

    else
        systemLogger(LogLevels.FATAL, "UncaughtErrorOrException", { error });

    return new ResponseHandler(res).sendFailure(
        FailureResponseCodesEnum.INTERNAL_SERVER_ERROR
    );
};

export default errorHandlerMiddleware;
