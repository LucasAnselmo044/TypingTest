import { useEffect, useState } from "react";

const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme) {
            setTheme(savedTheme as 'light' | 'dark');
            document.documentElement.classList.add(savedTheme);
        } else {
            const prefersDark = window.matchMedia('prefers-color-scheme: dark').matches;
            setTheme(prefersDark ? 'dark' : 'light');
            document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return { theme, toggleTheme };
};

    export default useTheme;