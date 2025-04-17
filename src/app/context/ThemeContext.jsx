"use client"
import { useState, useEffect, createContext } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(null); // ← importante: null inizialmente

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "ligth";
        setTheme(savedTheme);
        document.body.classList.add(savedTheme);
    }, []);

    useEffect(() => {
        if (theme) {
            document.body.classList.remove("ligth", "dark");
            document.body.classList.add(theme);
            localStorage.setItem("theme", theme);
        }
    }, [theme]);

    if (theme === null) return null; // ← blocca il render finché non hai letto il tema

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
