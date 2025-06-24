import { useContext } from 'react';
import { AuthContext } from '../contexts/auth.context';
import type { IAuthContext } from '../interfaces/index.interface';


const useAuth = (): IAuthContext => {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AUTH CONTEXT UNDEFINED.");

    return authContext;
};

export default useAuth;
