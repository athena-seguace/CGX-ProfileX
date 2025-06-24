import useTheme from "../../hooks/useTheme.hook";
import { UXThemeEnum } from "../../types/domain.types";

const ToggleThemeComponent = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <div className="p-2 flex items-center gap-1.5">
                <p className="text-t-secondary text-sm">
                    {theme.charAt(0).toUpperCase() + theme.slice(1) + " Mode"}
                </p>
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle Theme"
                    className={
                        "relative w-8 h-4 bg-primary rounded-full px-0.5"
                    }
                >
                    <div
                        className={`absolute top-0.5 left-0.5.5 w-3 h-3 bg-base rounded-full transition-transform duration-300 ${
                            theme === UXThemeEnum.LIGHT
                                ? "translate-x-0"
                                : "translate-x-4"
                        }`}
                    />
                </button>
            </div>
        </>
    );
};

export default ToggleThemeComponent;
