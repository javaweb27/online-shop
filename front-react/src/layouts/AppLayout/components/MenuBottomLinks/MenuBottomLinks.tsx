import { NavLink } from "react-router-dom"
import { AiOutlineHome } from "react-icons/ai"
import { IoFastFoodOutline } from "react-icons/io5"
import { BsCart4 } from "react-icons/bs"
import { FaUserCircle } from "react-icons/fa"

export const MenuBottomLinks = () => {
  return (
    <ul className="grid grid-cols-4" data-testid="MenuBottomLinks">
      <MenuLink to={"/"} icon={<AiOutlineHome className="text-2xl" />}>
        Home
      </MenuLink>

      <MenuLink to={"/products"} icon={<IoFastFoodOutline className="text-2xl" />}>
        Products
      </MenuLink>

      <MenuLink to={"/cart"} icon={<BsCart4 className="text-2xl" />}>
        Cart
      </MenuLink>

      <MenuLink to={"/profile"} icon={<FaUserCircle className="text-2xl" />}>
        Profile
      </MenuLink>
    </ul>
  )
}

function MenuLink({
  to,
  children,
  icon,
}: {
  to: string
  children: string
  icon: React.ReactNode
}) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex flex-col pt-1 pb-0.5 items-center hover:bg-neutral-bg-alt-hover text-neutral-font-alt ${
            isActive ? "text-primary" : "active:text-neutral-font"
          }`
        }
      >
        {icon}
        {children}
      </NavLink>
    </li>
  )
}
