import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
}
