import { useState } from "react";
import authApis from "../../apis/auth.apis";
import toastActions from "../../utils/toast.utils";
import useAuth from "../useAuth.hook";
import { APIsSCsEnum } from "../../types/apis.types";

enum FORM_ERROR_MESSAGES {
    BAD_REQUEST = "Bad Request. Invalid Format.",
    UNAUTHORIZED = "Invalid credentials.",
}

enum EMAIL_ERROR_MESSAGES {
    NOT_FOUND = "Couldn't find your account.",
}

const useSignIn = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [errorMessages, setErrorMessages] = useState<{
        form: FORM_ERROR_MESSAGES | null,
        email: EMAIL_ERROR_MESSAGES | null;
    }>({
        form: null,
        email: null,
    });

    const { refreshUser } = useAuth();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let apiResponse = await authApis.signIn({ email, password });

        setErrorMessages(() => {
            return {
                form: null,
                email: null,
            }
        });

        if (apiResponse.action === null) {
            toastActions.serverError();
        }
        else if (apiResponse.action === false) {
            switch (apiResponse.statusCode) {
                case APIsSCsEnum.BAD_REQUEST:
                    toastActions.error(apiResponse.message);
                    setErrorMessages((prev) => {
                        return {
                            ...prev,
                            form: FORM_ERROR_MESSAGES.BAD_REQUEST
                        };
                    });
                    break;
                case APIsSCsEnum.NOT_FOUND:
                    setErrorMessages((prev) => {
                        return {
                            ...prev,
                            email: EMAIL_ERROR_MESSAGES.NOT_FOUND
                        };
                    });
                    break;
                case APIsSCsEnum.UNAUTHORIZED:
                    setErrorMessages((prev) => {
                        return {
                            ...prev,
                            form: FORM_ERROR_MESSAGES.UNAUTHORIZED
                        };
                    });
                    break;
                case APIsSCsEnum.TOO_MANY_REQUESTS:
                    toastActions.error("Too many requests!");
                    break;
                default:
                    toastActions.error(apiResponse.message);
            }
        }
        else {
            toastActions.success("Signed in.");
            refreshUser();
        }

        setEmail(() => "");
        setPassword(() => "");
    }

    return {
        fields: {
            email,
            password
        },
        setField: {
            email: (value: string) => setEmail(() => value),
            password: (value: string) => setPassword(() => value),
        },
        errorMessages,
        handleSignIn
    }
}

export default useSignIn;
