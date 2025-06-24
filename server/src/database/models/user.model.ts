import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../../interfaces/index.interface";

const UserSchema = new Schema<IUser>(
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
        bio: {
            type: Schema.Types.String,
            required: false,
        }
    },
    {
        timestamps: true
    }
);

const UserModel: Model<IUser> = mongoose.model<IUser>(
    "users",
    UserSchema
);

export default UserModel;

