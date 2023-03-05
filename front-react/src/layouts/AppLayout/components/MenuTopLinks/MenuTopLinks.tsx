import { useMemo } from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../../../hooks/reduxHooks"

export const MenuTopLinks = () => {
  const cartItems = useAppSelector(s => s.cart.items)

  const cartQty = useMemo(() => {
    return cartItems.reduce((cv, item) => cv + item.qty, 0)
  }, [cartItems])

  return (
    <ul className="flex gap-4 text-lg" data-testid="MenuTopLinks">
      <li>
        <Link
          to={"/products"}
          className="block py-1 hover:underline underline-offset-4 hover:opacity-70"
        >
          Products
        </Link>
      </li>
      <li className="relative">
        <Link
          to={"/cart"}
          className="block py-1 hover:underline underline-offset-4 hover:opacity-70"
        >
          Cart
        </Link>
        <span className="inline-block rounded-md px-1.5 absolute -top-3 -right-6 bg-slate-800/60 text-center text-white">
          {cartQty}
        </span>
      </li>
    </ul>
  )
}
