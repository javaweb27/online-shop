import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks"
import { AuthActions } from "../../../auth/redux-store-slices/auth.slice"
import { useCartItemsTotals } from "../../hooks/useCartItemsTotals"
import { useCreateOrder } from "../../../orders/hooks/useCreateOrder"

export const CartTotals = () => {
  const cart = useAppSelector(s => s.cart)
  const loggedIn = useAppSelector(s => s.auth.loggedIn)
  const dispatch = useAppDispatch()

  const { totalPrice, totalQty } = useCartItemsTotals()

  const { isOrderCreated, errors, mutate } = useCreateOrder()

  if (errors.isAuthError) {
    dispatch(AuthActions.logOut())
  }

  const isBtnDisabled = cart.items.length === 0 || !loggedIn

  return (
    <div data-testid="CartTotals">
      <div className="flex flex-col">
        <span>Total price: {totalPrice}</span>
        <span>Total quantity: {totalQty}</span>
        <button
          onClick={() => {
            mutate(cart.items)
          }}
          className={"btn btn-primary " + (isBtnDisabled ? "cursor-not-allowed" : "")}
          disabled={isBtnDisabled}
        >
          Order now
        </button>
      </div>
      <div className="text-red-500">
        {errors.isUnknownError && <p>Something went wrong</p>}
        {errors.isBadRequestError && <p>Cart must contain at least 1 product</p>}
        {errors.isBalanceRequiredError && <p>You don't have enough balance</p>}
        {errors.isAuthError && <p>Log in to order</p>}
      </div>
      <div className="text-green-700">
        {isOrderCreated && <p>Your products were successfully ordered.</p>}
      </div>
    </div>
  )
}
