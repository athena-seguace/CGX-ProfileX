import generateValidator from "./core.validator";
import { IbDR, IbD } from "../interfaces/index.interface";


const miscValidator = {
    health: generateValidator<IbDR.Misc.Health, IbD.Misc.Health>({}),
}

export default miscValidator;
