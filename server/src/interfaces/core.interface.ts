import { Types } from "mongoose";

export interface ISession {
    userId: Types.ObjectId;
    userEmail: string;
}
