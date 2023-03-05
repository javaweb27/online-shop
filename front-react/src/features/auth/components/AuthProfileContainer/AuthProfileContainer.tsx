import { Link } from "react-router-dom"
import { useAppSelector } from "../../../../hooks/reduxHooks"

import { AuthProfile } from "../AuthProfile/AuthProfile"

export const AuthProfileContainer = () => {
  const loggedIn = useAppSelector(s => s.auth.loggedIn)

  if (!loggedIn) {
    return (
      <section className="flex justify-center">
        <div className="flex flex-col gap-4 text-center min-w-[9rem]">
          <Link className="btn btn-primary" to="/login">
            Log in
          </Link>

          <Link className="btn btn-primary" to="/register">
            Register
          </Link>
        </div>
      </section>
    )
  }

  return <AuthProfile />
}
