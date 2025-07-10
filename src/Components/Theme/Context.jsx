import React, { createContext, useState } from "react";


export let ThemeContext = createContext(null);


export const ThemeContextProvider = (props) => {

    //! check if theme is already set in localStorage, if not, set it to "light" by default, if it is set, use that value
    const themeFromLS = localStorage.theme ? JSON.parse(localStorage.getItem("theme")) : "light";

    //! useState to manage the theme state
    let [theme, setTheme] = useState(themeFromLS);


    //! useEffect to set the theme in localStorage and apply it to the body class
    React.useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme));
        document.body.className = theme
    }, [theme]);


    //! Function to toggle the theme, If the theme is "dark", set it to "light"
    function handleToggleTheme() {
        setTheme((prevTheme) => {
            let newTheme = prevTheme === "dark" ? "light" : "dark";
            return newTheme;
        })
    }


    //! Provide the theme and the toggle function to the context
    return (
        <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}