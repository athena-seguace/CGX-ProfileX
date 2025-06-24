import userRepository from "../database/repos/user.repo";
import coreServices from "./core/core.service";
import {
    ServiceSignature,
    SECs,
    SECsEnum,
} from "../types/index.types";
import { SDIn, SDOut } from "../interfaces/index.interface";
import dataPolicyRules from "../config/dataPolicy";
import SystemError from "../utils/systemError";


class AuthService {
    constructor() { }

    me: ServiceSignature<
        SDIn.Auth.Me,
        SDOut.Auth.Me,
        SECs.Auth.Me,
        true
    > = async (_, session) => {
        let user = await userRepository.findById(session.userId);
        if (!user) {
            throw new SystemError(
                "Authentication middleware passed a user which can't be found.",
                {
                    origin: __filename + ":UserService.me()",
                    session
                }
            );
        }

        return {
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
            }
        }
    }

    login: ServiceSignature<
        SDIn.Auth.Login,
        SDOut.Auth.Login,
        SECs.Auth.Login
    > = async (data) => {
        let user = await userRepository.findByEmail(data.email);
        if (!user) {
            return {
                success: false,
                errorCode: SECsEnum.USER_NOT_FOUND,
                errorMessage: "User not found."
            };
        }

        const validCredentials = await coreServices.verifyPassword(data.password, user.passwordHash);
        if (!validCredentials) {
            return {
                success: false,
                errorCode: SECsEnum.INVALID_CREDENTIALS
            }
        }

        const token = coreServices.generateJWToken({
            id: user._id.toString(),
            email: user.email
        });

        return {
            success: true,
            data: {
                token
            }
        }
    }

    logout: ServiceSignature<
        SDIn.Auth.Logout,
        SDOut.Auth.Logout,
        SECs.Auth.Logout,
        true
    > = async (_) => {
        return {
            success: true,
            data: {
                token: "_invalid_json_web_token_"
            }
        }
    }

    register: ServiceSignature<
        SDIn.Auth.Register,
        SDOut.Auth.Register,
        SECs.Auth.Register
    > = async (data) => {
        let prevUser = await userRepository.findByEmail(data.email);
        if (prevUser) {
            return {
                success: false,
                errorCode: SECsEnum.EMAIL_TAKEN,
                errorMessage: "Email already in use."
            }
        }

        let passwordHash = await coreServices.hashPassword(data.password);

        await userRepository.insert({
            name: data.name,
            email: data.email,
            passwordHash,
            bio: "",
        });

        return {
            success: true,
            data: {}
        }
    }

    changePassword: ServiceSignature<
        SDIn.Auth.ChangePassword,
        SDOut.Auth.ChangePassword,
        SECs.Auth.ChangePassword,
        true
    > = async (data, session) => {
        let user = await userRepository.findById(session.userId);
        if (!user) {
            throw new SystemError(
                "Authentication middleware passed a user which can't be found.",
                {
                    origin: __filename + ":UserService.changePassword()",
                    session
                }
            );
        }

        const validCredentials = await coreServices.verifyPassword(data.password, user.passwordHash);
        if (!validCredentials) {
            return {
                success: false,
                errorCode: SECsEnum.INVALID_CREDENTIALS,
                errorMessage: "Invalid credentials."
            }
        }

        let passwordHash = await coreServices.hashPassword(data.newPassword);

        await userRepository.updateById(session.userId, {
            passwordHash
        });

        return {
            success: true,
            data: {}
        }
    }

    extractSession: ServiceSignature<
        SDIn.Auth.ExtractSession,
        SDOut.Auth.ExtractSession,
        SECs.Auth.ExtractSession
    > = async (data) => {
        if (!(new RegExp(dataPolicyRules.security.jwt.regex).test(data.token))) {
            return {
                success: false,
                errorCode: SECsEnum.INVALID_JWT,
            };
        }

        let payload = coreServices.validateJWToken(data.token);
        if (payload === null) {
            return {
                success: false,
                errorCode: SECsEnum.INVALID_JWT,
            };
        }

        let user = await userRepository.findByEmail(payload.email);
        if (!user) {
            return {
                success: false,
                errorCode: SECsEnum.INVALID_JWT,
            };
        }

        return {
            success: true,
            data: {
                session: {
                    userId: user._id,
                    userEmail: user.email,
                }
            }
        }

    }
}

const authService = new AuthService();

export default authService;
