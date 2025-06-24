import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";

const authenticationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.session = null;

    let serviceResponse = await authService.extractSession({
        token: req.cookies.token ?? ""
    });

    if (serviceResponse.success === true) {
        req.session = serviceResponse.data.session;
    }

    next();
};

export default authenticationMiddleware;
