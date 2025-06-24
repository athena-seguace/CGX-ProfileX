interface IResponseAffirmative<T = unknown> {
    action: true;
    statusCode: number;
    data: T;
}

interface IResponseNegative {
    action: false;
    statusCode: number;
    message: string;
}

interface IResponseFailure {
    action: null;
    statusCode: number;
}

export type IResponse<T = unknown> =
    | IResponseAffirmative<T>
    | IResponseNegative
    | IResponseFailure


export interface ICookieOptions {
    maxAge?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
}

export interface JWTPayload {
    id: string;
    email: string;
}
