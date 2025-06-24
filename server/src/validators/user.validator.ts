import generateValidator, { fieldSchemaParticular } from "./core.validator";
import { IbDR, IbD } from "../interfaces/index.interface";


const userValidator = {
    update: generateValidator<IbDR.User.Update, IbD.User.Update>({
        name: fieldSchemaParticular.user.name.optional(),
        bio: fieldSchemaParticular.user.bio.optional(),
    }),
};

export default userValidator;

