import React, { createContext, useState, useEffect } from "react";
import type { IUser, IAuthContext } from "../interfaces/index.interface";
import authApis from "../apis/auth.apis";

const AuthContext = createContext<IAuthContext>({
    isLoading: false,
    user: null,
    refreshUser: () => {},
});

interface AuthContextProviderProps {
    children: React.ReactNode;
}

const AuthProvider = (props: AuthContextProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);

    const refreshUser = async () => {
        setIsLoading(() => true);

        let apiResponse = await authApis.me({});

        if (apiResponse.action === null) {
            setUser(null);
        } else if (apiResponse.action === false) {
            setUser(null);
            localStorage.removeItem("userData");
        } else {
            setUser(apiResponse.payload);
            localStorage.setItem(
                "userData",
                JSON.stringify(apiResponse.payload)
            );
        }

        setIsLoading(() => false);
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                user,
                refreshUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
