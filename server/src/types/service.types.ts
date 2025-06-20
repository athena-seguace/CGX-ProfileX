export enum SECsEnum {
    USER_NOT_FOUND,

    INVALID_CREDENTIALS,
    INVALID_JWT,

    EMAIL_TAKEN,

    FORBIDDEN,
}

export namespace SECs {
    export namespace Misc {
        export type Health = never;
    }

    export namespace Auth {
        export type Me = never;

        export type Login =
            | SECsEnum.USER_NOT_FOUND
            | SECsEnum.INVALID_CREDENTIALS;

        export type Logout = never;

        export type Register =
            | SECsEnum.EMAIL_TAKEN;

        export type ChangePassword =
            | SECsEnum.INVALID_CREDENTIALS;

        export type ExtractSession =
            | SECsEnum.INVALID_JWT;
    }

    export namespace User {
        export type Update =
            | SECsEnum.USER_NOT_FOUND;

        export type SetTheme =
            | SECsEnum.USER_NOT_FOUND;
    }
}

