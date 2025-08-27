interface _NoProps {
    [key: string]: never;
}

export namespace IbDR {
    export namespace Misc {
        export interface Health extends _NoProps { }
    }

    export namespace Auth {
        export interface Me extends _NoProps { }

        export interface Login {
            email: string;
            password: string;
        }

        export interface Logout extends _NoProps { }

        export interface SignUpRequest {
            name: string;
            email: string;
            password: string;
        }

        export interface ResendOTP {
            email: string;
        }

        export interface Register {
            email: string;
            otp: string;
        }

        export interface ChangePassword {
            password: string;
            newPassword: string;
        }
    }

    export namespace User {
        export interface Update {
            name?: string;
            bio?: string;
        }
    }
}

