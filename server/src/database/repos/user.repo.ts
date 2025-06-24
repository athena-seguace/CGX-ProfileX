import { ClientSession } from "mongoose";
import GenericRepository from "./generic.repo";
import UserModel from "../models/user.model";
import { IUser } from "../../interfaces/index.interface";
import SystemError from "../../utils/systemError";


class UserRepository extends GenericRepository<
    IUser,
    Pick<IUser, "name" | "email" | "passwordHash" | "bio">,
    Pick<IUser, "name" | "bio">
> {
    constructor() {
        super(UserModel);
    }

    async findByEmail(email: string, session?: ClientSession): Promise<IUser | null> {
        try {
            return await this.model.findOne({ email }).session(session || null).lean<IUser>().exec();
        } catch (error) {
            throw new SystemError('Failed to create document', {
                origin: __filename + 'src:database:db:repos:user.repo:UserRepository.create()',
                email,
                error
            });
        }
    }
}

const userRepository = new UserRepository();

export default userRepository;

