import jwt from "jsonwebtoken";
import SystemError from "../../utils/systemError";
import getEnvVariable from "../../utils/getEnvVariable";
import dataPolicyRules from "../../config/dataPolicy";
import { JWTPayload } from "../../interfaces/index.interface";


const generateJWToken = (
    payload: JWTPayload,
): string => {
    const SECRET_KEY = getEnvVariable("JWT_SECRET_KEY", true);

    try {
        return jwt.sign(
            payload, SECRET_KEY,
            {
                expiresIn: dataPolicyRules.security.jwt.expiresInSecs
            }
        );
    } catch (error) {
        throw new SystemError(
            "Failed to generate JWT token.",
            {
                origin: "src:services:core:jwt.core.service:generateJWToken()",
                payload,
                error
            }
        );
    }
};

const validateJWToken = (token: string): JWTPayload | null => {
    const SECRET_KEY = getEnvVariable("JWT_SECRET_KEY", true);

    try {
        return jwt.verify(token, SECRET_KEY) as JWTPayload;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return null;
        } else {
            throw new SystemError(
                "Failed to verify JWT token.",
                {
                    origin: "src:services:core:jwt.core.service:validateJWToken()",
                    token,
                    error
                }
            );
        }
    }
};

export { generateJWToken, validateJWToken };
