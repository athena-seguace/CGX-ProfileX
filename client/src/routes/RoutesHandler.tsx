import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.hook";
import LoadingPage from "../pages/loading.page";

export const RouteHandler = () => {
    const { isLoading, user } = useAuth();
    const location = useLocation();
    const isAuthPage = !!location.pathname.includes("/auth");

    if (isLoading) {
        return (
            <>
                <LoadingPage />
            </>
        );
    }

    if (user === null) {
        return isAuthPage ? <Outlet /> : <Navigate to="/auth/sign-in" />;
    }

    return !isAuthPage ? <Outlet /> : <Navigate to="/profile" />;
};

export default RouteHandler;
