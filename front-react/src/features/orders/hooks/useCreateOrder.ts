import { useMutation } from "@tanstack/react-query"
import { createOrder } from "../services/createOrder"
import { CartProduct } from "../../cart/redux-store-slices/cart.slice"

export const useCreateOrder = () => {
  const orderMutation = useMutation({ mutationKey: ["order"], mutationFn: createOrder })

  let isUnknownError = false
  let isBadRequestError = false
  let isBalanceRequiredError = false
  let isAuthError = false

  if (orderMutation.error instanceof Response) {
    const { status } = orderMutation.error

    switch (status) {
      case 401:
        isAuthError = true
        break

      case 400:
        isBadRequestError = true
        break

      case 409:
        isBalanceRequiredError = true
        break

      //"status === 404" means that all
      // sent cart products (_id's) don't exist in the database.
      //
      //this app assumes that all products always exist.
    }
  }

  if (orderMutation.isError || !orderMutation.data) {
    isUnknownError = true
  }

  return {
    errors: { isUnknownError, isBadRequestError, isBalanceRequiredError, isAuthError },

    mutate: (cartItems: CartProduct[]) => {
      const idsWithQtys = cartItems.map(({ _id, qty }) => {
        return { _id, qty }
      })
      orderMutation.mutate(idsWithQtys)
    },
    isOrderCreated: true, // orderMutation.data.res.status === 201
  }
}
