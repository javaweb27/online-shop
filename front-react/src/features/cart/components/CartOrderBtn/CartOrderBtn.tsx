import { useAppSelector } from "../../../../hooks/reduxHooks"
import { useCartOrderMutation } from "../../context-state/CartOrderMutationContext"

export const CartOrderBtn = () => {
  const cartItems = useAppSelector(s => s.cart.items)

  const orderMutation = useCartOrderMutation()

  const loggedIn = useAppSelector(s => s.auth.loggedIn)

  const isBtnDisabled = cartItems.length === 0 || !loggedIn

  return (
    <button
      onClick={() => {
        const listOfIdWithQty: { _id: string; qty: number }[] = cartItems.map(
          ({ _id, qty }) => ({ _id, qty })
        )
        orderMutation.mutate(listOfIdWithQty)
      }}
      className={"btn btn-primary " + (isBtnDisabled ? "cursor-not-allowed" : "")}
      disabled={isBtnDisabled}
    >
      Order now
    </button>
  )
}
