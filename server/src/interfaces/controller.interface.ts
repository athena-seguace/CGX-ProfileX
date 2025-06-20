import { IbD } from "./inboundData.interface";
import { ObDR } from "./outboundDataRaw.interface";
import { SDIn, SDOut } from "./service.interface";
import { SECs } from "../types/service.types";


export namespace GroupedControllerParams {
    export namespace Misc {
        export interface Health {
            IbD: IbD.Misc.Health;
            SDIn: SDIn.Misc.Health;
            SDOut: SDOut.Misc.Health;
            SECs: SECs.Misc.Health;
            ObDR: ObDR.Misc.Health;
        }
    }

    export namespace Auth {
        export interface Me {
            IbD: IbD.Auth.Me;
            SDIn: SDIn.Auth.Me;
            SDOut: SDOut.Auth.Me;
            SECs: SECs.Auth.Me;
            ObDR: ObDR.Auth.Me;
        }

        export interface Login {
            IbD: IbD.Auth.Login;
            SDIn: SDIn.Auth.Login;
            SDOut: SDOut.Auth.Login;
            SECs: SECs.Auth.Login;
            ObDR: ObDR.Auth.Login;
        }

        export interface Logout {
            IbD: IbD.Auth.Logout;
            SDIn: SDIn.Auth.Logout;
            SDOut: SDOut.Auth.Logout;
            SECs: SECs.Auth.Logout;
            ObDR: ObDR.Auth.Logout;
        }

        export interface Register {
            IbD: IbD.Auth.Register;
            SDIn: SDIn.Auth.Register;
            SDOut: SDOut.Auth.Register;
            SECs: SECs.Auth.Register;
            ObDR: ObDR.Auth.Register;
        }

        export interface ChangePassword {
            IbD: IbD.Auth.ChangePassword;
            SDIn: SDIn.Auth.ChangePassword;
            SDOut: SDOut.Auth.ChangePassword;
            SECs: SECs.Auth.ChangePassword;
            ObDR: ObDR.Auth.ChangePassword;
        }
    }

    export namespace User {
        export interface Update {
            IbD: IbD.User.Update;
            SDIn: SDIn.User.Update;
            SDOut: SDOut.User.Update;
            SECs: SECs.User.Update;
            ObDR: ObDR.User.Update;
        }
    }
}

