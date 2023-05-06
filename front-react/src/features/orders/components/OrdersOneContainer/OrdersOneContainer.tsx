import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../../../hooks/reduxHooks"
import { AuthActions } from "../../../auth/redux-store-slices/auth.slice"
import { OrderDetails } from "../OrderDetails/OrderDetails"
import { OrderProductsList } from "../OrderProductsList"
import { useGetOrder } from "../../hooks/useGetOrder"

export const OrdersOneContainer = () => {
  const dispatch = useAppDispatch()
  const params = useParams<{ id: string }>()

  const orderQuery = useGetOrder({ orderId: params.id! })

  if (orderQuery.isLoading) {
    return <p>Loading Order</p>
  }

  if (orderQuery.error instanceof Response) {
    const { status } = orderQuery.error

    if (status === 409) {
      // user does not exist
      dispatch(AuthActions.logOut())
      return null
    } else if (status === 404) {
      return <p>This order does not exist</p>
    }
  }

  if (orderQuery.isError) {
    return <p>Something went wrong</p>
  }

  return (
    <>
      <section>
        <h2 className="text-2xl mb-4">Order details</h2>
        <OrderDetails details={orderQuery.data.json} />
      </section>
      <section>
        <h2 className="text-2xl mb-4">Ordered products</h2>
        <OrderProductsList products={orderQuery.data.json.products} />
      </section>
    </>
  )
}
