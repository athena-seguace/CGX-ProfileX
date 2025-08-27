import { useEffect, useState } from "react";
import authApis from "../../apis/auth.apis";
import toastActions from "../../utils/toast.utils";
import { useNavigate } from "react-router-dom";
import { APIsSCsEnum } from "../../types/index.types";

enum SignUpState {
    SIGNUP_REQUEST,
    OTP_VERIFICATION
}

enum FORM_ERROR_MESSAGES {
    BAD_REQUEST = "Bad Request. Invalid Format.",
    SIGNUP_REQUEST_NOT_FOUND = "Signup request not found."
}

enum EMAIL_ERROR_MESSAGES {
    EMAIL_ALREADY_TAKEN = "Email is already in use."
}

enum OTP_ERROR_MESSAGES {
    INVALID_OTP = "Invalid OTP.",
    TOO_MANY_RESEND = "Cannot send multiple OTPs in a short span."
}

const useSignUp = () => {
    const [signUpState, setSignUpState] = useState<SignUpState>(SignUpState.SIGNUP_REQUEST);

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [otp, setOtp] = useState<string>("");

    const [isPasswordWeak, setIsPasswordWeak] = useState<boolean>(true);

    const [errorMessages, setErrorMessages] = useState<{
        form: FORM_ERROR_MESSAGES | null,
        email: EMAIL_ERROR_MESSAGES | null;
        otp: OTP_ERROR_MESSAGES | null;
    }>({
        form: null,
        email: null,
        otp: null,
    });

    const navigate = useNavigate();

    const handleSignUpRequest = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isPasswordWeak === true) {
            toastActions.error("Weak Password! Please choose strong password.");
            return;
        }

        setErrorMessages(() => {
            return {
                form: null,
                email: null,
                otp: null
            }
        });

        let apiResponse = await authApis.signUpRequest({ name, email, password });
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
            setSignUpState(SignUpState.OTP_VERIFICATION);
        }
    }

    const handleSignUpResendOTP = async () => {
        let apiResponse = await authApis.resendOTP({ email });
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
                case APIsSCsEnum.NOT_FOUND:
                    setErrorMessages((prev) => {
                        return {
                            ...prev,
                            form: FORM_ERROR_MESSAGES.SIGNUP_REQUEST_NOT_FOUND
                        };
                    });
                    break;
                case APIsSCsEnum.TOO_MANY_REQUESTS:
                    setErrorMessages((prev) => {
                        return {
                            ...prev,
                            otp: OTP_ERROR_MESSAGES.TOO_MANY_RESEND
                        };
                    });
                    break;
                default:
                    toastActions.error(apiResponse.message);
            }

            setName(() => "");
            setEmail(() => "");
            setPassword(() => "");
            setIsPasswordWeak(() => false);
        }
        else {
            toastActions.success("OTP resent.");
        }
    }

    const handleSignUpOTPVerification = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorMessages(() => {
            return {
                form: null,
                email: null,
                otp: null
            }
        });

        let apiResponse = await authApis.signUp({ email, otp });
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
                case APIsSCsEnum.NOT_FOUND:
                    setErrorMessages((prev) => {
                        return {
                            ...prev,
                            form: FORM_ERROR_MESSAGES.SIGNUP_REQUEST_NOT_FOUND
                        };
                    });
                    break;
                case APIsSCsEnum.UNAUTHORIZED:
                    setErrorMessages((prev) => {
                        return {
                            ...prev,
                            otp: OTP_ERROR_MESSAGES.INVALID_OTP
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

            setName(() => "");
            setEmail(() => "");
            setPassword(() => "");
            setIsPasswordWeak(() => false);
        }

        setOtp(() => "");
    }

    const checkPasswordStrength = () => {
        const minLength = 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#_$%^&*(),.?":{}|<>]/.test(password);

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
            password,
            otp,
        },
        setField: {
            name: (value: string) => setName(() => value),
            email: (value: string) => setEmail(() => value),
            password: (value: string) => setPassword(() => value),
            otp: (value: string) => setOtp(() => value),
        },
        signUpState,
        isPasswordWeak,
        errorMessages,
        handleSignUpRequest,
        handleSignUpOTPVerification,
        handleSignUpResendOTP,
    }
}

export default useSignUp;
export { SignUpState }
