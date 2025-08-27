import { generateJWToken, validateJWToken } from "./jwt.core.service";
import { hashString, verifyHash } from "./hash.core.service";
import { generateOTP } from "./otp.core.service";
import { sendOTPEmail } from "./email.service";

const coreServices = {
    generateJWToken,
    validateJWToken,
    hashString,
    verifyHash,
    generateOTP,
    sendOTPEmail
}

export default coreServices;

