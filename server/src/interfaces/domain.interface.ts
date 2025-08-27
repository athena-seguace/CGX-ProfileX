import { Types } from "mongoose";

export interface ISignUpRequest {
    _id: Types.ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    otpHash: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
    passwordHash: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
}
