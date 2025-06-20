import { Router } from "express";
import miscRouter from "./misc.route";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";

const API_PATH_URL = "/api/v1";

const centralRouter = Router();

centralRouter.use(`${API_PATH_URL}/misc`, miscRouter);
centralRouter.use(`${API_PATH_URL}/auth`, authRouter);
centralRouter.use(`${API_PATH_URL}/user`, userRouter);

export default centralRouter;

