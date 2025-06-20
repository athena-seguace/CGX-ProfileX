import userService from "../services/user.service";
import generateSimpleController from "./core.controller";
import { SuccessResponseCodesEnum } from "../types/index.types";
import { GroupedControllerParams } from "../interfaces/index.interface";


const userController = {
    update:
        generateSimpleController<GroupedControllerParams.User.Update>(
            {
                requiresSession: true,
                service: userService.update,
            },
            SuccessResponseCodesEnum.OK,
        ),
}

export default userController;
