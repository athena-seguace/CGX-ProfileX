import authApis from "../../apis/auth.apis";
import toastActions from "../../utils/toast.utils";
import useAuth from "../useAuth.hook";
import { APIsSCsEnum } from "../../types/apis.types";


const useSignOut = () => {
    const { refreshUser } = useAuth();

    const signOut = async () => {
        let apiResponse = await authApis.signOut({});

        if (apiResponse.action === null) {
            toastActions.serverError();
        }
        else if (apiResponse.action === false) {
            switch (apiResponse.statusCode) {
                case APIsSCsEnum.UNAUTHORIZED:
                    toastActions.unauthorized();
                    break;
                default:
                    toastActions.error(apiResponse.message);
            }
        }
        else {
            toastActions.success("Signed out.");
            refreshUser();
        }
    }

    return {
        signOut,
    }
}

export default useSignOut;

