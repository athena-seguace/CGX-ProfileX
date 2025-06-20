import authService from "../services/auth.service";
import generateSimpleController from "./core.controller";
import { JWTokenCookieOptions, SuccessResponseCodesEnum } from "../types/index.types";
import { GroupedControllerParams } from "../interfaces/index.interface";


const authController = {
    me:
        generateSimpleController<GroupedControllerParams.Auth.Me>(
            {
                requiresSession: true,
                service: authService.me,
            },
            SuccessResponseCodesEnum.OK,
            {
                transformSDOutToObDR: sDOut => {
                    return {
                        ...sDOut,
                        id: sDOut.id.toHexString(),
                    }
                }
            }
        ),
    login:
        generateSimpleController<GroupedControllerParams.Auth.Login>(
            {
                requiresSession: false,
                service: authService.login,
            },
            SuccessResponseCodesEnum.OK,
            {
                transformSDOutToObDR: _ => ({}),
                cookieSetter: sDOut => {
                    return [
                        {
                            name: "token",
                            value: sDOut.token,
                            option: JWTokenCookieOptions
                        }
                    ]
                },
            },
        ),
    logout:
        generateSimpleController<GroupedControllerParams.Auth.Logout>(
            {
                requiresSession: true,
                service: authService.logout,
            },
            SuccessResponseCodesEnum.OK,
            {
                transformSDOutToObDR: _ => ({}),
                cookieSetter: sDOut => {
                    return [
                        {
                            name: "token",
                            value: sDOut.token,
                            option: JWTokenCookieOptions
                        }
                    ]
                }
            }
        ),
    register:
        generateSimpleController<GroupedControllerParams.Auth.Register>(
            {
                requiresSession: false,
                service: authService.register,
            },
            SuccessResponseCodesEnum.CREATED,
        ),
    changePassword:
        generateSimpleController<GroupedControllerParams.Auth.ChangePassword>(
            {
                requiresSession: true,
                service: authService.changePassword,
            },
            SuccessResponseCodesEnum.OK,
        ),
}

export default authController;
