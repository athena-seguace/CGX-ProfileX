import { useState } from "react"
import userApis from "../../apis/user.apis";
import toastActions from "../../utils/toast.utils";
import { APIsSCsEnum } from "../../types/apis.types";
import useAuth from "../useAuth.hook";
import { useNavigate } from "react-router-dom";


enum FORM_ERROR_MESSAGES {
    BAD_REQUEST = "Bad Request. Invalid Format.",
}

const useEditBio = () => {
    const [bio, setBio] = useState<string>("");

    const [errorMessages, setErrorMessages] = useState<{
        form: FORM_ERROR_MESSAGES | null,
    }>({
        form: null,
    });

    const { refreshUser } = useAuth();
    const navigate = useNavigate();

    const isBioEmpty = () => {
        if (!bio || bio.trim().length === 0 || bio.trim() === "") {
            return true;
        }
        else {
            return false;
        }
    }

    const handleUpdateBio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isBioEmpty() === true) {
            toastActions.error("Bio cannot be empty or white spaces.");
            return;
        }

        let apiResponse = await userApis.update({ bio });

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
                case APIsSCsEnum.FORBIDDEN:
                    toastActions.forbidden();
                    break;
                case APIsSCsEnum.UNAUTHORIZED:
                    toastActions.unauthorized();
                    refreshUser();
                    break;
                default:
                    toastActions.error(apiResponse.message);
            }
        }
        else {
            toastActions.success("Profile updated.");
            refreshUser();
            navigate("/profile");
        }
    }

    return {
        bio,
        setBio: (value: string) => setBio(() => value),
        errorMessages,
        handleUpdateBio,
    }
}

export default useEditBio;
