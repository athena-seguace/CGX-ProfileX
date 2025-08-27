import { Router } from "express";
import generateValidateMiddleware from "../middlewares/validate.middleware";
import authValidator from "../validators/auth.validator";
import authController from "../controllers/auth.controller";


const authRouter = Router();

authRouter.get(
    "/me",
    generateValidateMiddleware(authValidator.me),
    authController.me
);
authRouter.post(
    "/login",
    generateValidateMiddleware(authValidator.login),
    authController.login
);
authRouter.post(
    "/logout",
    generateValidateMiddleware(authValidator.logout),
    authController.logout
);
authRouter.post(
    "/signup-request",
    generateValidateMiddleware(authValidator.signUpRequest),
    authController.signUpRequest
);
authRouter.post(
    "/resend-verification-otp",
    generateValidateMiddleware(authValidator.resendOTP),
    authController.resendOTP
);
authRouter.post(
    "/register",
    generateValidateMiddleware(authValidator.register),
    authController.register
);
authRouter.patch(
    "/change-password",
    generateValidateMiddleware(authValidator.changePassword),
    authController.changePassword
);


export default authRouter;

