import { useContext } from "react"
import { ThemeContext, ThemeContextProvider } from "./Context";
import "./ToggleTheme.css"
export const ToggleTheme = () => {

    let { theme, handleToggleTheme } = useContext(ThemeContext);


    return (
        <>

            <div className={`toggler toggler-${theme}`} onClick={handleToggleTheme}  >
                <div className="toggle-button">
                    <div className="dot"></div>
                    <div className="lines">
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>
            </div>

        </>
    )
}