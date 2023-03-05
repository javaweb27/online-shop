import "./styles/index.css"
import "./styles/App.css"
import "./styles/tailwind.css"
import { RoutesConfig } from "./RoutesConfig"
import { Provider } from "react-redux"
import { setupStore } from "./state/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { themeColors } from "./styles/themeColors"
import { Global as GlobalCss } from "@emotion/react"

const store = setupStore() // preloadedState is always undefined for App

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { networkMode: "always" },
    mutations: { networkMode: "always" },
  },
})

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RoutesConfig />
        <ReactQueryDevtools />
        <GlobalCss styles={themeColors} />
      </QueryClientProvider>
    </Provider>
  )
}

export default App
