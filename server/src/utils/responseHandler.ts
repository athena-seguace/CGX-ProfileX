import { Response } from "express";
import { ICookieOptions } from "../interfaces/index.interface";
import {
    SuccessResponseCodesEnum,
    FailedResponseCodeEnum,
    FailureResponseCodesEnum,
    DefaultResponseMessagesEnum,
} from "../types/index.types";


class ResponseHandler<T extends object> {
    private res: Response;

    private action: boolean | null;
    private statusCode:
        | SuccessResponseCodesEnum
        | FailedResponseCodeEnum
        | FailureResponseCodesEnum;
    private message: string | undefined;
    private data: T | undefined;


    constructor(res: Response) {
        this.res = res;

        this.action = null;
        this.statusCode = FailureResponseCodesEnum.INTERNAL_SERVER_ERROR;
        this.message = "Internal Server Error!";
        this.data = undefined;
    }

    public sendSuccess(
        statusCode: SuccessResponseCodesEnum,
        data: T
    ) {
        this.action = true;
        this.statusCode = statusCode;
        this.data = data;

        this.send();
    }

    public sendFailed(statusCode: FailedResponseCodeEnum, message: string | undefined = undefined) {
        this.action = false;
        this.statusCode = statusCode;
        this.data = undefined;

        if (message === undefined) {
            if (Object.values(FailedResponseCodeEnum).includes(statusCode)) {
                this.message = DefaultResponseMessagesEnum[statusCode];
            }
            else {
                this.message = "Client Error!";
            }
        }
        else {
            this.message = message.trim();
        }

        this.send();
    }

    public sendFailure(statusCode: FailureResponseCodesEnum) {
        this.action = null;
        this.statusCode = statusCode;
        this.message = undefined;
        this.data = undefined;

        this.send();
    }

    public setCookie(
        name: string,
        value: string,
        options: ICookieOptions
    ) {
        this.res.cookie(name, value, options);
        return this;
    }

    private send() {
        if (this.action === null) {
            this.res.status(this.statusCode).json({
                action: null,
            });
        }
        else if (this.action === false) {
            this.res.status(this.statusCode).json({
                action: false,
                message: this.message,
            });
        }
        else {
            this.res.status(this.statusCode).json({
                action: true,
                ...(
                    this.data && Object.keys(this.data).length > 0
                        ? { payload: this.data }
                        : {}
                )
            });
        }

        return;
    }

}


export default ResponseHandler;

