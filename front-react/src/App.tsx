import "./styles/index.css"
import "./styles/App.css"
import "./styles/tailwind.css"
import { RoutesConfig } from "./RoutesConfig"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { themeColors } from "./styles/themeColors"
import { Global as GlobalCss } from "@emotion/react"
import { ReduxSetup } from "./ReduxSetup"
import { ReactQuerySetup } from "./ReactQuerySetup"

function App() {
  return (
    <ReactQuerySetup>
      <ReduxSetup>
        <RoutesConfig />
        <ReactQueryDevtools />
        <GlobalCss styles={themeColors} />
      </ReduxSetup>
    </ReactQuerySetup>
  )
}

export default App
