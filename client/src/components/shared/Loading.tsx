import { FaSpinner } from "react-icons/fa";

interface ILoadingComponentProps {
    msg?: string;
}

const LoadingComponent: React.FC<ILoadingComponentProps> = (props) => {
    return (
        <>
            <div className="flex flex-col items-center gap-3">
                <FaSpinner className="animate-spin text-5xl text-primary" />
                <p className="text-lg text-t-secondary">
                    {props.msg || "Loading..."}
                </p>
            </div>
        </>
    );
};

export default LoadingComponent;
