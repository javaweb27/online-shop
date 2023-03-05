import { Link } from "react-router-dom"

export const MenuTopUserFalse = () => {
  return (
    <ul className="flex gap-4 text-lg" data-testid="MenuTopUserFalse">
      <li>
        <Link
          to={"/login"}
          className="block py-1 text-lg hover:underline underline-offset-4 hover:opacity-70"
        >
          Log in
        </Link>
      </li>
      <li>
        <Link
          to={"/register"}
          className="block py-1 text-lg hover:underline underline-offset-4 hover:opacity-70"
        >
          Register
        </Link>
      </li>
    </ul>
  )
}
