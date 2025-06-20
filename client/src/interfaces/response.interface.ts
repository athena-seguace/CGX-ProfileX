interface IResponseAffirmative<T, APIsSCs> {
    action: true;
    statusCode: APIsSCs;
    payload: T;
}

interface IResponseNegative<APIsSCs> {
    action: false;
    statusCode: APIsSCs;
    message: string;
}

interface IResponseFailure<APIsSCs> {
    action: null;
    statusCode: APIsSCs;
}

export type IResponse<T, APIsSCs> =
    | IResponseAffirmative<T, APIsSCs>
    | IResponseNegative<APIsSCs>
    | IResponseFailure<APIsSCs>

