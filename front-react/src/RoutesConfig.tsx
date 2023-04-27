import { HashRouter } from "react-router-dom"
import { AppLayout } from "./layouts/AppLayout"
import RoutesPages from "./RoutesPages"

export const RoutesConfig = () => {
  return (
    <HashRouter>
      <AppLayout>
        <main>
          <RoutesPages />
        </main>
      </AppLayout>
    </HashRouter>
  )
}
