import { useMutation } from "@tanstack/react-query"
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks"
import { AuthActions } from "../../../auth/redux-store-slices/auth.slice"
import { createOrder } from "../../../orders/services/createOrder"
import { useCartItemsTotals } from "../../hooks/useCartItemsTotals"

export const CartTotals = () => {
  const cart = useAppSelector(s => s.cart)
  const loggedIn = useAppSelector(s => s.auth.loggedIn)
  const dispatch = useAppDispatch()

  const orderMutation = useMutation({ mutationKey: ["order"], mutationFn: createOrder })

  const { totalPrice, totalQty } = useCartItemsTotals()

  let isUnknownError = false
  let isBadRequestError = false
  let isBalanceRequiredError = false
  let isAuthError = !loggedIn

  if (orderMutation.error instanceof Response) {
    const { status } = orderMutation.error

    if (status === 401) {
      isAuthError = true
      dispatch(AuthActions.logOut())
    } else if (status === 400) {
      isBadRequestError = true
    } else if (status === 409) {
      isBalanceRequiredError = true
    }
    //  else if (status === 404) {
    // 404 = all selected products (_id's) to be ordered don't exist.
    // this app assumes that all products always exist.
    // }
    else {
      isUnknownError = true
    }
  }

  const isOrderCreated = orderMutation.data?.res.status === 201

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
      <div className="text-green-700">
        {isOrderCreated && <p>Your products were successfully ordered.</p>}
      </div>
    </div>
  )
}
