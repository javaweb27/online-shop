import { useAppSelector } from "../../../../hooks/reduxHooks"
import { useCartOrderMutation } from "../../context-state/CartOrderMutationContext"

const ERROR_MESSAGES = {
  auth: "Log in to order",
  unknown: "Something went wrong",
  balanceIsRequired: "You don't have enough balance",
}

export const CartOrderMessages = () => {
  const isLoggedIn = useAppSelector(s => s.auth.loggedIn)

  const { isSuccess, isError, error } = useCartOrderMutation()

  if (isLoggedIn === false) {
    return <p data-testid={CartOrderMessages.name}>Log in to order</p>
  }

  return (
    <p
      data-testid={CartOrderMessages.name}
      className={isSuccess ? "text-green-600" : "text-red-500"}
    >
      {isSuccess && "Your products were successfully ordered"}

      {error instanceof Response &&
        // response.ok is false, status isn't 200-299
        (error.status === 409
          ? ERROR_MESSAGES.balanceIsRequired
          : error.status === 401
          ? ERROR_MESSAGES.auth
          : ERROR_MESSAGES.unknown)}

      {!(error instanceof Response) && isError && ERROR_MESSAGES.unknown}
    </p>
  )

  //"status === 400" means that the client
  // sent the data in an incorrect format.
  // TODO: add a feature to order a maximum of 10 products only
  // (add it before the server sends more than 10 products)
  //
  //this app assumes that the client always sends the data correctly.

  //"status === 404" means that all
  // sent cart products (_id's) don't exist in the database.
  //
  //this app assumes that all products always exist.
}
