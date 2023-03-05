import { BsArrowRightShort } from "react-icons/bs"
import { FaUserAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { changeTheme } from "../../../../helps/changeTheme"
import { useAppSelector } from "../../../../hooks/reduxHooks"

export const AuthProfile = () => {
  const userData = useAppSelector(s => s.auth.user)

  return (
    <div className="flex flex-col sm:flex-row gap-16 justify-center">
      <section className="flex flex-col gap-2 items-center font-bold">
        <FaUserAlt className="text-4xl" />
        {userData.email}
      </section>
      <div className="self-center">
        <section className="grid grid-cols-[auto_1fr] gap-1 items-center mb-4">
          <span></span>
          <span>Your balance: {userData.balance} $</span>
          {/* <div> */}
          <BsArrowRightShort className="text-2xl" />
          <Link to="/orders" className="hover:underline">
            See my orders
          </Link>
          {/* </div> */}
        </section>
        <section>
          <div className="flex flex-col">
            <span>Set theme color</span>

            <div className="flex gap-3">
              <button onClick={() => changeTheme()} className="btn shadow-md">
                Detect
              </button>
              <button onClick={() => changeTheme(false)} className="btn shadow-md">
                Light
              </button>
              <button onClick={() => changeTheme(true)} className="btn shadow-md">
                Dark
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
