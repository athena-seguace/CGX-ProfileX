import { Types } from "mongoose";
import { ISession } from "./core.interface";

interface _NoProps {
    [key: string]: never;
}

export namespace SDIn {
    export namespace Misc {
        export interface Health extends _NoProps { };
    }

    export namespace Auth {
        export interface Me extends _NoProps { };

        export interface Login {
            email: string;
            password: string;
        }

        export interface Logout extends _NoProps { };

        export interface Register {
            name: string;
            email: string;
            password: string;
        }

        export interface ChangePassword {
            password: string;
            newPassword: string;
        }

        export interface ExtractSession {
            token: string;
        }
    }

    export namespace User {
        export interface Update {
            name?: string;
            bio?: string;
        }
    }
}

export namespace SDOut {
    export namespace Misc {
        export interface Health {
            serverStatus: string,
            databaseStatus: string,
        }
    }

    export namespace Auth {
        export interface Me {
            id: Types.ObjectId;
            name: string;
            email: string;
            bio: string;
        };

        export interface Login {
            token: string;
        }

        export interface Logout {
            token: string;
        };

        export interface Register { }
        export interface ChangePassword { }

        export interface ExtractSession {
            session: ISession;
        }
    }

    export namespace User {
        export interface Update { }
    }
}

