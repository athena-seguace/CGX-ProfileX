import type { ReactNode } from "react";
import ToggleThemeComponent from "../components/shared/ToggleTheme";

interface LayoutProps {
    children: ReactNode;
}

const DefaultPageLayout: React.FC<LayoutProps> = (props) => {
    return (
        <>
            <div className="h-screen overflow-x-hidden overflow-y-auto bg-base">
                <ToggleThemeComponent />
                {props.children}
            </div>
        </>
    );
};

export default DefaultPageLayout;
