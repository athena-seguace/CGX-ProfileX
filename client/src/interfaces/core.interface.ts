import type { IUser } from "./domain.interface";

interface IAuthContext {
    isLoading: boolean;
    user: IUser | null;
    refreshUser: () => void;
}

export type { IAuthContext }