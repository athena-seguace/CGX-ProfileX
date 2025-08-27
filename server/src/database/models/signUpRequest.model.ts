import mongoose, { Schema, Model } from "mongoose";
import { ISignUpRequest } from "../../interfaces/index.interface";

const SignUpRequestSchema = new Schema<ISignUpRequest>(
    {
        name: {
            type: Schema.Types.String,
            required: true
        },
        email: {
            type: Schema.Types.String,
            required: true,
            unique: true
        },
        passwordHash: {
            type: Schema.Types.String,
            required: true
        },
        otpHash: {
            type: Schema.Types.String,
            required: true
        },
        expiresAt: {
            type: Schema.Types.Date,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

SignUpRequestSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const SignUpRequestModel: Model<ISignUpRequest> = mongoose.model<ISignUpRequest>(
    "signup-requests",
    SignUpRequestSchema
);

export default SignUpRequestModel;

