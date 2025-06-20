import DefaultPageLayout from "../../layouts/DefaultPage.layout.tsx";
import ViewProfileComponent from "../../components/core/profile/View.profile.component.tsx";

const ProfilePage = () => {
    return (
        <DefaultPageLayout>
            <div className="w-full h-full flex items-center justify-center p-5">
                <ViewProfileComponent />
            </div>
        </DefaultPageLayout>
    );
};

export default ProfilePage;
