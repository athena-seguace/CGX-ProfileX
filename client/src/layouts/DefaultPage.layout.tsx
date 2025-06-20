import type { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const DefaultPageLayout: React.FC<LayoutProps> = (props) => {
    return (
        <>
            <div className="h-screen overflow-hidden bg-base">
                {props.children}
            </div>
        </>
    );
};

export default DefaultPageLayout;
