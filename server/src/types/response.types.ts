import { ICookieOptions } from "../interfaces/index.interface";

export enum SuccessResponseCodesEnum {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
}

export enum FailedResponseCodeEnum {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    TOO_MANY_REQUESTS = 429,
}

export enum FailureResponseCodesEnum {
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export enum DefaultResponseMessagesEnum {
    "OK." = 200,
    "Created." = 201,
    "Accepted." = 202,

    "Bad Request." = 400,
    "Unauthorized." = 401,
    "Forbidden." = 403,
    "Not Found." = 404,
    "Conflict." = 409,
    "Too Many Requests." = 429,
}

export const JWTokenCookieOptions: ICookieOptions = {
    maxAge: 2700000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
}
