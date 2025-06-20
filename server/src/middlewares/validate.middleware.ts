import { Request, Response, NextFunction } from "express";
import { FailedResponseCodeEnum, ValidatorSignature } from "../types/index.types";
import ResponseHandler from "../utils/responseHandler";


const generateValidateMiddleware = (validator: ValidatorSignature<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = validator(req.body);

        if (!result.safe) {
            return new ResponseHandler(res)
                .sendFailed(FailedResponseCodeEnum.BAD_REQUEST, result.errors.join(" "));
        }

        req.body = result.data;
        next();
    };
}

export default generateValidateMiddleware;

