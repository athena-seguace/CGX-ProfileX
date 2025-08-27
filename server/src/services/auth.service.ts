import userRepository from "../database/repos/user.repo";
import signUpRequestRepository from "../database/repos/signUpRequest.repo";
import coreServices from "./core/core.service";
import {
    ServiceSignature,
    SECs,
    SECsEnum,
} from "../types/index.types";
import { SDIn, SDOut } from "../interfaces/index.interface";
import dataPolicyRules from "../config/dataPolicy";
import SystemError from "../utils/systemError";
import { sendOTPEmail } from "./core/email.service";


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

        const validCredentials = await coreServices.verifyHash(data.password, user.passwordHash);
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

    signUpRequest: ServiceSignature<
        SDIn.Auth.SignUpRequest,
        SDOut.Auth.SignUpRequest,
        SECs.Auth.SignUpRequest
    > = async (data) => {
        let prevUser = await userRepository.findByEmail(data.email);
        if (prevUser) {
            return {
                success: false,
                errorCode: SECsEnum.EMAIL_TAKEN,
                errorMessage: "Email already in use."
            }
        }

        let otp = coreServices.generateOTP();

        let passwordHash = await coreServices.hashString(data.password);
        let otpHash = await coreServices.hashString(otp);

        let signUpRequestDoc = {
            name: data.name,
            email: data.email,
            passwordHash,
            otpHash,
            expiresAt: new Date(
                Date.now() +
                dataPolicyRules.security.otp.expiresInSecs * 1000
            )
        };

        let prevAttempt = await signUpRequestRepository.findByEmail(data.email);
        if (prevAttempt) {
            await signUpRequestRepository.updateById(
                prevAttempt._id,
                signUpRequestDoc
            );
        }
        else {
            await signUpRequestRepository.insert(signUpRequestDoc);
        }

        sendOTPEmail(data.email, otp);

        return {
            success: true,
            data: {}
        }
    }

    resendOTP: ServiceSignature<
        SDIn.Auth.ResendOTP,
        SDOut.Auth.ResendOTP,
        SECs.Auth.ResendOTP
    > = async (data) => {
        let prevRequest = await signUpRequestRepository.findByEmail(data.email);
        if (!prevRequest) {
            return {
                success: false,
                errorCode: SECsEnum.SIGNUP_REQUEST_NOT_FOUND,
                errorMessage: "No signup request found."
            }
        }

        let resendBlockedTill =
            prevRequest.updatedAt.getTime() +
            dataPolicyRules.security.otp.blockResendForSecs * 1000;

        if (Date.now() < resendBlockedTill) {
            return {
                success: false,
                errorCode: SECsEnum.TOO_MANY_REQUESTS,
                errorMessage: "Cannot resend otp too quickly."
            }
        }

        let otp = coreServices.generateOTP();
        let otpHash = await coreServices.hashString(otp);

        sendOTPEmail(data.email, otp);

        await signUpRequestRepository.updateById(prevRequest._id, {
            otpHash,
            expiresAt: new Date(
                Date.now() +
                dataPolicyRules.security.otp.expiresInSecs * 1000
            )
        });

        return {
            success: true,
            data: {}
        }
    }

    register: ServiceSignature<
        SDIn.Auth.Register,
        SDOut.Auth.Register,
        SECs.Auth.Register
    > = async (data) => {
        let prevRequest = await signUpRequestRepository.findByEmail(data.email);
        if (!prevRequest) {
            return {
                success: false,
                errorCode: SECsEnum.SIGNUP_REQUEST_NOT_FOUND,
                errorMessage: "No signup request found."
            }
        }

        let validOTP = await coreServices.verifyHash(data.otp, prevRequest.otpHash);
        if (!validOTP) {
            return {
                success: false,
                errorCode: SECsEnum.INVALID_OTP,
                errorMessage: "Invalid OTP. Please try again."
            }
        }

        await userRepository.insert({
            name: prevRequest.name,
            email: prevRequest.email,
            passwordHash: prevRequest.passwordHash,
            bio: ""
        });

        await signUpRequestRepository.removeById(prevRequest._id);

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

        const validCredentials = await coreServices.verifyHash(data.password, user.passwordHash);
        if (!validCredentials) {
            return {
                success: false,
                errorCode: SECsEnum.INVALID_CREDENTIALS,
                errorMessage: "Invalid credentials."
            }
        }

        let passwordHash = await coreServices.hashString(data.newPassword);

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
