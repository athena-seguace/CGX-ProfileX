import bcrypt from "bcryptjs";
import SystemError from "../../utils/systemError";


const hashString = async (password: string) => {
    const saltRounds = 10;

    try {
        return await bcrypt.hash(password, await bcrypt.genSalt(saltRounds));
    } catch (error) {
        throw new SystemError(
            "Could not generate password hash.",
            {
                origin: "src:services:core:hash.core.service:hashPassword()",
                password,
                error
            }
        );
    }
};


const verifyHash = async (
    enteredPassword: string,
    storedHashedPassword: string
) => {
    try {
        return await bcrypt.compare(enteredPassword, storedHashedPassword);
    } catch (error) {
        throw new SystemError(
            "Could not verify password with its hash.",
            {
                origin: "src:services:core:hash.core.service:verifyPassword()",
                enteredPassword,
                storedHashedPassword,
                error
            }
        );
    }
};


export { hashString, verifyHash };
