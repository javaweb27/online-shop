import { useMutation } from "@tanstack/react-query"
import { useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks"
import { AuthActions } from "../../../auth/redux-store-slices/auth.slice"
import { createOrder } from "../../../orders/services/createOrder"

export const CartTotals = () => {
  const cart = useAppSelector(s => s.cart)
  const loggedIn = useAppSelector(s => s.auth.loggedIn)
  const dispatch = useAppDispatch()

  const orderMutation = useMutation({ mutationKey: ["order"], mutationFn: createOrder })

  const { totalPrice, totalQty } = useMemo(() => {
    let totalPrice = 0
    let totalQty = 0

    for (const item of cart.items) {
      totalQty += item.qty
      totalPrice += item.qty * item.price
    }

    return { totalPrice, totalQty }
  }, [cart.items])

  let isUnknownError = false
  let isBadRequestError = false
  let isBalanceRequiredError = false
  let isAuthError = !loggedIn

  if (orderMutation.isError) {
    const { status } = (orderMutation.error as any).res

    if (status === 409 || status === 401 || !loggedIn) {
      isAuthError = true
      dispatch(AuthActions.logOut())
    } else if (status === 400) {
      isBadRequestError = true
    } else if (status === 403) {
      isBalanceRequiredError = true
    } else {
      isUnknownError = true
    }
  }

  const isBtnDisabled = cart.items.length === 0 || !loggedIn

  return (
    <div data-testid="CartTotals">
      <div className="flex flex-col">
        <span>Total price: {totalPrice}</span>
        <span>Total quantity: {totalQty}</span>
        <button
          onClick={() => {
            const idsWithQtys = cart.items.map(({ _id, qty }) => {
              return { _id, qty }
            })

            orderMutation.mutate(idsWithQtys)
          }}
          className={"btn btn-primary " + (isBtnDisabled ? "cursor-not-allowed" : "")}
          disabled={isBtnDisabled}
        >
          Order now
        </button>
      </div>
      <div className="text-red-500">
        {isUnknownError && <p>Something went wrong</p>}
        {isBadRequestError && <p>Cart must contain at least 1 product</p>}
        {isBalanceRequiredError && <p>You don't have enough balance</p>}
        {isAuthError && <p>Log in to order</p>}
      </div>
    </div>
  )
}
