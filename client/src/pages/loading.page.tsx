import DefaultPageLayout from "../layouts/DefaultPage.layout.tsx";
import LoadingComponent from "../components/shared/Loading.tsx";

const LoadingPage = () => {
    return (
        <DefaultPageLayout>
            <div className="w-full h-full flex items-center justify-center">
                <LoadingComponent msg="Loading Page." />
            </div>
        </DefaultPageLayout>
    );
};

export default LoadingPage;
