import { useEffect, useState } from "react";
import authApis from "../../apis/auth.apis";
import toastActions from "../../utils/toast.utils";
import { useNavigate } from "react-router-dom";
import { APIsSCsEnum } from "../../types/index.types";

enum FORM_ERROR_MESSAGES {
    BAD_REQUEST = "Bad Request. Invalid Format.",
}

enum EMAIL_ERROR_MESSAGES {
    EMAIL_ALREADY_TAKEN = "Email is already in use."
}

const useSignUp = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isPasswordWeak, setIsPasswordWeak] = useState<boolean>(true);

    const [errorMessages, setErrorMessages] = useState<{
        form: FORM_ERROR_MESSAGES | null,
        email: EMAIL_ERROR_MESSAGES | null;
    }>({
        form: null,
        email: null,
    });

    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isPasswordWeak === true) {
            toastActions.error("Weak Password! Please choose strong password.");
            return;
        }

        setErrorMessages(() => {
            return {
                form: null,
                email: null,
            }
        });

        let apiResponse = await authApis.signUp({ name, email, password });
        if (apiResponse.action === null) {
            toastActions.serverError();
        }
        else if (apiResponse.action === false) {
            switch (apiResponse.statusCode) {
                case APIsSCsEnum.BAD_REQUEST:
                    setErrorMessages((prev) => {
                        return {
                            ...prev,
                            form: FORM_ERROR_MESSAGES.BAD_REQUEST
                        };
                    });
                    break;
                case APIsSCsEnum.CONFLICT:
                    setErrorMessages((prev) => {
                        return {
                            ...prev,
                            email: EMAIL_ERROR_MESSAGES.EMAIL_ALREADY_TAKEN
                        };
                    });
                    break;
                default:
                    toastActions.error(apiResponse.message);
            }
        }
        else {
            toastActions.success("Registration successful");
            setTimeout(() => {
                toastActions.success("Redirecting to Sign In");
                navigate("/auth/sign-in");
            }, 500);
        }

        setName(() => "");
        setEmail(() => "");
        setPassword(() => "");
        setIsPasswordWeak(() => false);
    }

    const checkPasswordStrength = () => {
        const minLength = 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        const isWeak = !(
            password.length >= minLength &&
            hasUpper &&
            hasLower &&
            hasNumber &&
            hasSpecial
        );

        setIsPasswordWeak(() => isWeak);
    }

    useEffect(() => {
        checkPasswordStrength();
    }, [password]);

    return {
        fields: {
            name,
            email,
            password
        },
        setField: {
            name: (value: string) => setName(() => value),
            email: (value: string) => setEmail(() => value),
            password: (value: string) => setPassword(() => value),
        },
        isPasswordWeak,
        errorMessages,
        handleSignUp
    }
}

export default useSignUp;
