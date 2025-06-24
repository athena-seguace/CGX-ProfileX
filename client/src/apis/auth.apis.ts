import apiCallWrapper from "./axios.apis";
import type { IbDR, ObDR } from "../interfaces/index.interface";
import type { APIsSCs } from "../types/index.types";


const authApis = {
    me: apiCallWrapper<ObDR.Auth.Me, IbDR.Auth.Me, APIsSCs.Auth.Me>(
        "GET", "/auth/me"
    ),
    signIn: apiCallWrapper<ObDR.Auth.Login, IbDR.Auth.Login, APIsSCs.Auth.SignIn>(
        "POST", "/auth/login"
    ),
    signOut: apiCallWrapper<ObDR.Auth.Logout, IbDR.Auth.Logout, APIsSCs.Auth.SignOut>(
        "POST", "/auth/logout"
    ),
    signUp: apiCallWrapper<ObDR.Auth.Register, IbDR.Auth.Register, APIsSCs.Auth.SignUp>(
        "POST", "/auth/register"
    ),
    changePassword: apiCallWrapper<ObDR.Auth.ChangePassword, IbDR.Auth.ChangePassword, APIsSCs.Auth.ChangePassword>(
        "PATCH", "/auth/change-password"
    ),
};

export default authApis;
