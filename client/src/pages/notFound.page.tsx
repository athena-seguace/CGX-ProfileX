import { useNavigate } from "react-router-dom";
import DefaultPageLayout from "../layouts/DefaultPage.layout.tsx";
import { MdErrorOutline } from "react-icons/md";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <DefaultPageLayout>
            <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col gap-5 items-center">
                    <MdErrorOutline size={64} className="text-accent-red" />
                    <h1 className="text-xl font-light">Resource not found!</h1>
                    <button
                        name="go-to-home"
                        className="h-10 w-50 bg-primary rounded-md text-t-onAccent hover:bg-primaryS hover:cursor-pointer"
                        onClick={() => navigate("/profile")}
                    >
                        Go to Profile
                    </button>
                </div>
            </div>
        </DefaultPageLayout>
    );
};

export default NotFoundPage;
