import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/auth.context";
import RouteHandler from "./routes/RoutesHandler";
import SignInAuthPage from "./pages/auth/signin.auth.page";
import SignUpAuthPage from "./pages/auth/signup.auth.page";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/profile/profile.page";
import EditBioPage from "./pages/profile/editBio.page";
import NotFoundPage from "./pages/notFound.page";
import LoadingPage from "./pages/loading.page";

const App = () => {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/profile" replace />}
                        />
                        <Route element={<RouteHandler />}>
                            <Route path="/auth">
                                <Route
                                    path="sign-in"
                                    element={<SignInAuthPage />}
                                />
                                <Route
                                    path="sign-up"
                                    element={<SignUpAuthPage />}
                                />
                            </Route>
                            <Route path="/profile">
                                <Route index element={<ProfilePage />} />
                                <Route
                                    path="edit-bio"
                                    element={<EditBioPage />}
                                />
                            </Route>
                        </Route>
                        <Route path="/loading" element={<LoadingPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
            <Toaster />
        </>
    );
};

export default App;
