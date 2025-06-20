import miscService from "../services/misc.service";
import generateSimpleController from "./core.controller";
import { SuccessResponseCodesEnum } from "../types/index.types";
import { GroupedControllerParams } from "../interfaces/index.interface";


const miscController = {
    health:
        generateSimpleController<GroupedControllerParams.Misc.Health>(
            {
                requiresSession: false,
                service: miscService.health,
            },
            SuccessResponseCodesEnum.OK,
        ),
}

export default miscController;
