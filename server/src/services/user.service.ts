import userRepository from "../database/repos/user.repo";
import {
    ServiceSignature,
    SECs,
    SECsEnum,
} from "../types/index.types";
import { SDIn, SDOut } from "../interfaces/index.interface";


class UserService {
    constructor() { }

    update: ServiceSignature<
        SDIn.User.Update,
        SDOut.User.Update,
        SECs.User.Update,
        true
    > = async (data, session) => {
        let user = await userRepository.findById(session.userId);
        if (!user) {
            return {
                success: false,
                errorCode: SECsEnum.USER_NOT_FOUND,
                errorMessage: "User not found."
            }
        }

        await userRepository.updateById(user._id, {
            name: data.name,
            bio: data.bio,
        });

        return {
            success: true,
            data: {}
        }
    }
}

const userService = new UserService();


export default userService;

