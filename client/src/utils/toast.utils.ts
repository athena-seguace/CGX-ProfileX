import toast from "react-hot-toast";

const toastSuccess = (message: string) => {
    toast.success(message, { duration: 3000, position: "top-right" });
}

const toastError = (message: string) => {
    toast.error(message, { duration: 4000, position: "top-center" });
}

const toastActions = {
    success: toastSuccess,
    error: toastError,
    unauthorized: () => toastError("Session Invalid! Please sign in."),
    forbidden: () => toastError("You are not allowed to perform this action."),
    serverError: () => toastError("Server Error."),
    dismiss: toast.dismiss,
};

export default toastActions;
