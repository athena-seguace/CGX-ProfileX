import DefaultPageLayout from "../../layouts/DefaultPage.layout.tsx";
import SignUpAuthComponent from "../../components/core/auth/SignUp.auth.component.tsx";

const SignUpAuthPage = () => {
    return (
        <DefaultPageLayout>
            <div className="w-full min-h-[calc(100%-2.5rem)] flex items-center justify-center p-5">
                <SignUpAuthComponent />
            </div>
        </DefaultPageLayout>
    );
};

export default SignUpAuthPage;
