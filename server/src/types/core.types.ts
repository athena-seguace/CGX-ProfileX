import { Request, Response } from "express";
import { SECsEnum } from "./service.types";
import { ISession } from "../interfaces/index.interface";

export enum LogLevels {
    FATAL,
    ERROR,
    WARN,
    INFO,
    DEBUG,
}

export type IValidatorResolve<T> =
    | {
        safe: true;
        data: T;
    }
    | {
        safe: false;
        errors: string[];
    }


export type ValidatorSignature<IbDR, IbD> = (data: IbDR) => IValidatorResolve<IbD>;

export type IServiceResolve<C extends SECsEnum, T> =
    | {
        success: true,
        data: T
    }
    | {
        success: false,
        errorCode: C;
        errorMessage?: string;
    }

export type ControllerSignature<IbD> = (
    req: Request<{}, {}, IbD>,
    res: Response,
) => Promise<void>;


export type ServiceSignature<
    SDIn,
    SDOut,
    SECs extends SECsEnum,
    RequireSession extends boolean = false
> = RequireSession extends true
    ? (data: SDIn, session: ISession) => Promise<IServiceResolve<SECs, SDOut>>
    : (data: SDIn) => Promise<IServiceResolve<SECs, SDOut>>;

