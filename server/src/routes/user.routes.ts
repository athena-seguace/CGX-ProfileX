import { Router } from "express";
import generateValidateMiddleware from "../middlewares/validate.middleware";
import userValidator from "../validators/user.validator";
import userController from "../controllers/user.controller";


const userRouter = Router();

userRouter.patch(
    "/",
    generateValidateMiddleware(userValidator.update),
    userController.update,
);

export default userRouter;

