import { Provider } from "react-redux"
import { setupStore } from "./state/store"

const store = setupStore() // preloadedState is always undefined for App

export const ReduxSetup = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>
}
