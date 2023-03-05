import { Link } from "react-router-dom"
import { useAppSelector } from "../../hooks/reduxHooks"
import { MenuBottomLinks } from "./components/MenuBottomLinks"
import { MenuTopLinks } from "./components/MenuTopLinks"
import { MenuTopUserFalse } from "./components/MenuTopUserFalse"
import { MenuTopUserTrue } from "./components/MenuTopUserTrue"

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const loggedIn = useAppSelector(s => s.auth.loggedIn)

  return (
    <>
      <header className="z-10 hidden sm:flex gap-6 justify-between items-center bg-primary text-white py-3 sticky top-0 px-4">
        <Link
          to={"/"}
          className="text-2xl py-1 hover:underline hover:text-gray-300 font-bold"
        >
          Online shop
        </Link>
        <MenuTopLinks />
        {loggedIn ? <MenuTopUserTrue /> : <MenuTopUserFalse />}
      </header>
      {children}
      <footer className="z-10 block sm:hidden sticky bottom-0 left-0 right-0 shadow-[0_0px_6px_-1px_rgba(0,0,0,0.3)] bg-neutral-bg-alt">
        <MenuBottomLinks />
      </footer>
    </>
  )
}
