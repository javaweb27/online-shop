import "./styles/index.css"
import "./styles/App.css"
import "./styles/tailwind.css"
import { RoutesConfig } from "./RoutesConfig"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { themeColors } from "./styles/themeColors"
import { Global as GlobalCss } from "@emotion/react"
import { ReduxSetup } from "./ReduxSetup"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { networkMode: "always" },
    mutations: { networkMode: "always" },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxSetup>
        <RoutesConfig />
        <ReactQueryDevtools />
        <GlobalCss styles={themeColors} />
      </ReduxSetup>
    </QueryClientProvider>
  )
}

export default App
