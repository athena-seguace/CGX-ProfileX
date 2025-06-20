import { Request } from "express";
import { ISession } from "../interfaces/index.interface";

declare global {
    namespace Express {
        interface Request {
            requestId: string | null;
            session: ISession | null;
        }
    }
}

