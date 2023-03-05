import { FaCaretDown, FaUserCircle } from "react-icons/fa"
import { Link } from "react-router-dom"
import { AuthActions } from "../../../../features/auth/redux-store-slices/auth.slice"
import { useAppDispatch } from "../../../../hooks/reduxHooks"

export const MenuTopUserTrue = () => {
  const dispatch = useAppDispatch()

  return (
    <div className="relative group" data-testid="MenuTopUserTrue">
      <div className="flex items-center group-hover:text-neutral-700">
        <FaUserCircle data-testid="icon-user" className="text-4xl" />
        <FaCaretDown data-testid="icon-caretdown" />
      </div>
      <ul className="hidden absolute top-full right-0 group-hover:flex flex-col bg-neutral-bg-alt text-neutral-font shadow-xl rounded-t-[7px] rounded-b-[7px] overflow-hidden whitespace-nowrap">
        <li>
          <Link
            to={"/profile"}
            className="block py-2 px-3 hover:bg-neutral-bg-alt-hover hover:text-neutral-font-alt"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to={"/orders"}
            className="block py-2 px-3 hover:bg-neutral-bg-alt-hover hover:text-neutral-font-alt"
          >
            My orders
          </Link>
        </li>
        <li>
          <button
            className="block py-2 px-3 hover:bg-neutral-bg-alt-hover hover:text-neutral-font-alt w-full text-left"
            onClick={() => {
              dispatch(AuthActions.logOut())
            }}
          >
            Log out
          </button>
        </li>
      </ul>
    </div>
  )
}
