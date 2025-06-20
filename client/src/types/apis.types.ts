export enum APIsSCsEnum {
    OK = 200,
    CREATED = 201,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,

    TOO_MANY_REQUESTS = 429,

    SERVER_ERROR = 500,
}

export namespace APIsSCs {
    export namespace Misc {
        export type Health =
            | APIsSCsEnum.OK

            | APIsSCsEnum.SERVER_ERROR;
    }

    export namespace Auth {
        export type Me =
            | APIsSCsEnum.OK

            | APIsSCsEnum.UNAUTHORIZED

            | APIsSCsEnum.SERVER_ERROR;

        export type SignIn =
            | APIsSCsEnum.OK

            | APIsSCsEnum.NOT_FOUND
            | APIsSCsEnum.BAD_REQUEST
            | APIsSCsEnum.UNAUTHORIZED
            | APIsSCsEnum.TOO_MANY_REQUESTS

            | APIsSCsEnum.SERVER_ERROR;

        export type SignOut =
            | APIsSCsEnum.OK

            | APIsSCsEnum.UNAUTHORIZED

            | APIsSCsEnum.SERVER_ERROR;

        export type SignUp =
            | APIsSCsEnum.CREATED

            | APIsSCsEnum.BAD_REQUEST
            | APIsSCsEnum.CONFLICT

            | APIsSCsEnum.SERVER_ERROR;

        export type ChangePassword =
            | APIsSCsEnum.OK

            | APIsSCsEnum.BAD_REQUEST
            | APIsSCsEnum.UNAUTHORIZED
            | APIsSCsEnum.FORBIDDEN
            | APIsSCsEnum.TOO_MANY_REQUESTS

            | APIsSCsEnum.SERVER_ERROR;
    }

    export namespace User {
        export type Update =
            | APIsSCsEnum.OK

            | APIsSCsEnum.BAD_REQUEST
            | APIsSCsEnum.UNAUTHORIZED
            | APIsSCsEnum.FORBIDDEN

            | APIsSCsEnum.SERVER_ERROR;
    }
}