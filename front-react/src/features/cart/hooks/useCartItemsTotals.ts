import { useMemo } from "react"
import { useAppSelector } from "../../../hooks/reduxHooks"

/**
 * calculates the total quantity of all cart products,
 * and the total price (price * quanity) of all cart products
 */
export const useCartItemsTotals = (): { totalPrice: number; totalQty: number } => {
  const cartItems = useAppSelector(s => s.cart.items)

  const { totalPrice, totalQty } = useMemo(() => {
    let totalPrice = 0
    let totalQty = 0

    for (const item of cartItems) {
      totalQty += item.qty
      totalPrice += item.qty * item.price
    }

    return { totalPrice, totalQty }
  }, [cartItems])

  return { totalPrice, totalQty }
}
