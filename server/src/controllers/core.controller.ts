import ResponseHandler from "../utils/responseHandler";
import SystemError from "../utils/systemError";
import {
    SECsEnum,
    SuccessResponseCodesEnum,
    FailedResponseCodeEnum,
    ServiceSignature,
    ControllerSignature,
    IServiceResolve,
    JWTokenCookieOptionsProduction,
    JWTokenCookieOptionsDev,
} from "../types/index.types";
import { ICookieOptions } from "../interfaces/response.interface";
import getEnvVariable from "../utils/getEnvVariable";


type ServiceWithSession<SDIn, SDOut, SECs extends SECsEnum> = {
    requiresSession: true;
    service: ServiceSignature<SDIn, SDOut, SECs, true>;
};

type ServiceWithoutSession<SDIn, SDOut, SECs extends SECsEnum> = {
    requiresSession: false;
    service: ServiceSignature<SDIn, SDOut, SECs, false>;
};

type AnyServiceDefinition<SDIn, SDOut, SECs extends SECsEnum> =
    | ServiceWithSession<SDIn, SDOut, SECs>
    | ServiceWithoutSession<SDIn, SDOut, SECs>;


const _generateSimpleController = <
    IbD,
    SDIn,
    SDOut,
    SECs extends SECsEnum,
    ObDR extends object,
>(
    serviceConfig: AnyServiceDefinition<SDIn, SDOut, SECs>,
    successResponseCode: SuccessResponseCodesEnum,
    {
        transformIbDToSDIn,
        transformSDOutToObDR,
        cookieSetter,
    }: {
        transformIbDToSDIn: (ibD: IbD) => SDIn;
        transformSDOutToObDR: (sDOut: SDOut) => ObDR;
        cookieSetter: (sDOut: SDOut) => {
            name: string;
            value: string;
            option: ICookieOptions;
        }[];
    },
): ControllerSignature<IbD> => {
    return async (req, res) => {
        let session = req.session;
        let serviceResponse: IServiceResolve<SECs, SDOut>;

        if (serviceConfig.requiresSession) {
            if (!session) {
                return new ResponseHandler<ObDR>(res).sendFailed(FailedResponseCodeEnum.UNAUTHORIZED);
            }
            else {
                serviceResponse = await serviceConfig.service(transformIbDToSDIn(req.body), session);
            }
        }
        else {
            serviceResponse = await serviceConfig.service(transformIbDToSDIn(req.body));
        }

        if (serviceResponse.success === false) {
            return ServiceErrorCodeHandler(
                new ResponseHandler<ObDR>(res),
                serviceResponse.errorCode,
                serviceResponse.errorMessage
            );
        }

        let responseHandler = new ResponseHandler<ObDR>(res);

        if (cookieSetter) {
            let cookies = cookieSetter(serviceResponse.data);

            cookies.forEach((cookie) =>
                responseHandler.setCookie(
                    cookie.name,
                    cookie.value,
                    cookie.option
                )
            );
        }

        return responseHandler.sendSuccess(
            successResponseCode,
            transformSDOutToObDR(serviceResponse.data)
        );
    }
}

const generateSimpleController = <
    T extends {
        IbD: unknown,
        SDIn: unknown,
        SDOut: unknown,
        SECs: SECsEnum,
        ObDR: object,
    }
>(
    serviceConfig: AnyServiceDefinition<T["SDIn"], T["SDOut"], T["SECs"]>,
    successCode: SuccessResponseCodesEnum,
    {
        transformIbDToSDIn = (ibD => ibD as unknown as T["SDIn"]),
        transformSDOutToObDR = (sDOut => sDOut as unknown as T["ObDR"]),
        cookieSetter = (_ => []),
    }: {
        transformIbDToSDIn?: (ibD: T["IbD"]) => T["SDIn"];
        transformSDOutToObDR?: (sDOut: T["SDOut"]) => T["ObDR"];
        cookieSetter?: (sDOut: T["SDOut"]) => {
            name: string;
            value: string;
            option: ICookieOptions;
        }[];
    } = {},
) => {
    return _generateSimpleController<
        T['IbD'],
        T['SDIn'],
        T['SDOut'],
        T['SECs'],
        T['ObDR']
    >(
        serviceConfig,
        successCode,
        {
            transformIbDToSDIn,
            transformSDOutToObDR,
            cookieSetter,
        },
    );
}

const ServiceErrorCodeHandler = <T extends object>(
    responseHandler: ResponseHandler<T>,
    errorCode: SECsEnum,
    errorMessage?: string,
): void => {
    switch (errorCode) {
        case SECsEnum.USER_NOT_FOUND:
            return responseHandler.sendFailed(FailedResponseCodeEnum.NOT_FOUND, errorMessage);

        case SECsEnum.INVALID_CREDENTIALS:
        case SECsEnum.INVALID_JWT:
            return responseHandler.sendFailed(FailedResponseCodeEnum.UNAUTHORIZED, errorMessage);

        case SECsEnum.EMAIL_TAKEN:
            return responseHandler.sendFailed(FailedResponseCodeEnum.CONFLICT, errorMessage);

        case SECsEnum.FORBIDDEN:
            return responseHandler.sendFailed(FailedResponseCodeEnum.FORBIDDEN, errorMessage);


        default:
            throw new SystemError("Unexpected error code returned by service.", { errorCode });
    }
}

const getJWTCookieOptions = () => {
    const env = getEnvVariable("ENV", true);

    if (env === "production") {
        return JWTokenCookieOptionsProduction;
    }
    else {
        return JWTokenCookieOptionsDev;
    }
}

export default generateSimpleController;
export { getJWTCookieOptions };
