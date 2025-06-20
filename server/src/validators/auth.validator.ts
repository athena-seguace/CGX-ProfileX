import generateValidator, { fieldSchemaParticular } from "./core.validator";
import { IbDR, IbD } from "../interfaces/index.interface";


const authValidator = {
    me: generateValidator<IbDR.Auth.Me, IbD.Auth.Me>({}),
    login: generateValidator<IbDR.Auth.Login, IbD.Auth.Login>({
        email: fieldSchemaParticular.user.email,
        password: fieldSchemaParticular.user.passwordAny,
    }),
    logout: generateValidator<IbDR.Auth.Logout, IbD.Auth.Logout>({}),
    register: generateValidator<IbDR.Auth.Register, IbD.Auth.Register>({
        name: fieldSchemaParticular.user.name,
        email: fieldSchemaParticular.user.email,
        password: fieldSchemaParticular.user.passwordStrong,
    }),
    changePassword: generateValidator<IbDR.Auth.ChangePassword, IbD.Auth.ChangePassword>({
        password: fieldSchemaParticular.user.passwordAny,
        newPassword: fieldSchemaParticular.user.passwordStrong,
    }),
}

export default authValidator;
