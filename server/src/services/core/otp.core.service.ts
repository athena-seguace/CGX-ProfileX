import otpGenerator from "otp-generator";
import SystemError from "../../utils/systemError";
import dataPolicyRules from "../../config/dataPolicy";


const generateOTP = (): string => {
    try {
        return otpGenerator.generate(
            dataPolicyRules.security.otp.length,
            {
                specialChars: false
            }
        );
    } catch (error) {
        throw new SystemError(
            "Failed to generate OTP.",
            {
                origin: "src:services:core:otp.core.service:generateOTP()",
                error
            }
        );
    }
};

export { generateOTP };
