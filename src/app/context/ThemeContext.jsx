"use client"
import { useState, useEffect, createContext, Children } from 'react';

export const ThemeContext = createContext()
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("ligth")
    
    useEffect(() => {
        setTheme(localStorage.getItem("theme") || "ligth")        
    },[])

    useEffect(() => {
        localStorage.setItem("theme", theme)
        const body = document.getElementsByTagName('body')[0]
        if (body.classList.contains('ligth')) {
            body.classList.add('dark')
            body.classList.remove('ligth')
            setTheme('dark')
        } else {
            body.classList.add('ligth')
            body.classList.remove('dark')
            setTheme('ligth')
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
