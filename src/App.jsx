import { Ecomm } from "./Components/Ecomm/Ecomm"
import { ThemeContextProvider } from "./Components/Theme/Context"


function App() {

  return (
    <>
      <ThemeContextProvider>
        <Ecomm />
      </ThemeContextProvider>
    </>
  )
}

export default App
