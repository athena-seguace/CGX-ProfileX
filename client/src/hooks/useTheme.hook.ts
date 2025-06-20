import { useState, useEffect } from 'react';
import { UXThemeEnum } from '../types/domain.types';


const useTheme = () => {
    const [theme, setTheme] = useState<UXThemeEnum>(() => {
        return localStorage.getItem("theme") === UXThemeEnum.DARK
            ? UXThemeEnum.DARK
            : UXThemeEnum.LIGHT;
    });

    const toggleTheme = () => {
        setTheme((prev) => (
            prev === UXThemeEnum.LIGHT
                ? UXThemeEnum.DARK
                : UXThemeEnum.LIGHT
        ));
    };

    useEffect(() => {
        const root = document.documentElement;

        if (theme === UXThemeEnum.DARK) {
            root.classList.add(UXThemeEnum.DARK);
            root.classList.remove(UXThemeEnum.LIGHT);
        } else {
            root.classList.add(UXThemeEnum.LIGHT);
            root.classList.remove(UXThemeEnum.DARK);
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    return { theme, toggleTheme };
}

export default useTheme;
