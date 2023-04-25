import { useQuery } from "@tanstack/react-query"
import { useAppDispatch } from "../../../../hooks/reduxHooks"
import { AuthActions } from "../../../auth/redux-store-slices/auth.slice"
import { getOrders } from "../../services/getOrders"
import { OrdersList } from "../OrdersList"

export const OrdersContainer = () => {
  return (
    <>
      <h2>My orders</h2>
      <Content />
    </>
  )
}

function Content() {
  const dispatch = useAppDispatch()

  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  })

  if (ordersQuery.isLoading) {
    return <div>loading orders</div>
  }

  if (ordersQuery.error instanceof Response) {
    const { status } = ordersQuery.error

    if (status === 409) {
      dispatch(AuthActions.logOut())
      return null
    }
  }

  if (ordersQuery.isError) {
    return <div>something went wrong</div>
  }

  if (ordersQuery.data.json.orders.length === 0) {
    return <p>You don't have any order yet</p>
  }

  return <OrdersList orders={ordersQuery.data.json.orders} />
}
