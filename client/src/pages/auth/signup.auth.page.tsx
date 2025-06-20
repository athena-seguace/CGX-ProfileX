import DefaultPageLayout from "../../layouts/DefaultPage.layout.tsx";
import SignUpAuthComponent from "../../components/core/auth/SignUp.auth.component.tsx";

const SignUpAuthPage = () => {
    return (
        <DefaultPageLayout>
            <div className="w-full h-full flex items-center justify-center p-5">
                <SignUpAuthComponent />
            </div>
        </DefaultPageLayout>
    );
};

export default SignUpAuthPage;
