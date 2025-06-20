import DefaultPageLayout from "../../layouts/DefaultPage.layout.tsx";
import SignInAuthComponent from "../../components/core/auth/SignIn.auth.component.tsx";

const SignInAuthPage = () => {
    return (
        <DefaultPageLayout>
            <div className="w-full h-full flex items-center justify-center p-5">
                <SignInAuthComponent />
            </div>
        </DefaultPageLayout>
    );
};

export default SignInAuthPage;
