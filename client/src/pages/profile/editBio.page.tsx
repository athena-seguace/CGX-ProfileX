import DefaultPageLayout from "../../layouts/DefaultPage.layout.tsx";
import EditBioProfileComponent from "../../components/core/profile/EditBio.profile.component.tsx";

const EditBioPage = () => {
    return (
        <DefaultPageLayout>
            <div className="w-full min-h-[calc(100%-2.5rem)] flex items-center justify-center p-5">
                <EditBioProfileComponent />
            </div>
        </DefaultPageLayout>
    );
};

export default EditBioPage;
