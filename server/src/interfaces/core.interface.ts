import { Types } from "mongoose";

export interface ISession {
    userId: Types.ObjectId;
    userEmail: string;
}

export interface ISendEmail {
    to: string;
    subject: string;
    text: string;
    html: string;
}
