import { HashRouter } from "react-router-dom"
import { AppLayout } from "./layouts/AppLayout"
import RoutesPages from "./RoutesPages"

export const RoutesConfig = () => {
  return (
    <HashRouter>
      <AppLayout>
        <main className="max-w-7xl p-4 flex-grow justify-center">
          <RoutesPages />
        </main>
      </AppLayout>
    </HashRouter>
  )
}
