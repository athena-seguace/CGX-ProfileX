interface _NoProps {
    [key: string]: never;
}

export namespace ObDR {
    export namespace Misc {
        export interface Health {
            serverStatus: string;
            databaseStatus: string;
        };
    }

    export namespace Auth {
        export interface Me {
            id: string;
            name: string;
            email: string;
            bio: string;
        };

        export interface Login extends _NoProps { };
        export interface Logout extends _NoProps { };
        export interface Register extends _NoProps { };
        export interface ChangePassword extends _NoProps { };
    }

    export namespace User {
        export interface Update extends _NoProps { };
    }
}
