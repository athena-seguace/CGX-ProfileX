import { Router } from "express";
import generateValidateMiddleware from "../middlewares/validate.middleware";
import miscValidator from "../validators/misc.validator";
import miscController from "../controllers/misc.controller";

const miscRouter = Router();

miscRouter.get(
    "/health",
    generateValidateMiddleware(miscValidator.health),
    miscController.health
);


export default miscRouter;
