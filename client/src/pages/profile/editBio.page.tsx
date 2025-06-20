import DefaultPageLayout from "../../layouts/DefaultPage.layout.tsx";
import EditBioProfileComponent from "../../components/core/profile/EditBio.profile.component.tsx";

const EditBioPage = () => {
    return (
        <DefaultPageLayout>
            <div className="w-full h-full flex items-center justify-center p-5">
                <EditBioProfileComponent />
            </div>
        </DefaultPageLayout>
    );
};

export default EditBioPage;
