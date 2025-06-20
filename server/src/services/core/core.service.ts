import { generateJWToken, validateJWToken } from "./jwt.core.service";
import { hashPassword, verifyPassword } from "./hash.core.service";


const coreServices = {
    generateJWToken,
    validateJWToken,
    hashPassword,
    verifyPassword
}

export default coreServices;

