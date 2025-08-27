import { ClientSession } from "mongoose";
import GenericRepository from "./generic.repo";
import SignUpRequestModel from "../models/signUpRequest.model";
import { ISignUpRequest } from "../../interfaces/index.interface";
import SystemError from "../../utils/systemError";


class SignUpRequestRepository extends GenericRepository<
    ISignUpRequest,
    Pick<ISignUpRequest, "name" | "email" | "passwordHash" | "otpHash" | "expiresAt">,
    Pick<ISignUpRequest, "name" | "passwordHash" | "otpHash" | "expiresAt">
> {
    constructor() {
        super(SignUpRequestModel);
    }

    async findByEmail(email: string, session?: ClientSession): Promise<ISignUpRequest | null> {
        try {
            return await this.model.findOne({ email }).session(session || null).lean<ISignUpRequest>().exec();
        } catch (error) {
            throw new SystemError('Failed to find document.', {
                origin: __filename + 'src:database:db:repos:signUpRequest.repo:SignUpRequest.findByEmail()',
                email,
                error
            });
        }
    }
}

const signUpRequestRepository = new SignUpRequestRepository();

export default signUpRequestRepository;

