import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../../../hooks/reduxHooks"
import { AuthActions } from "../../../auth/redux-store-slices/auth.slice"
import { getOrder } from "../../services/getOrder"
import { OrderDetails } from "../OrderDetails/OrderDetails"
import { OrderProductsList } from "../OrderProductsList"

export const OrdersOneContainer = () => {
  const dispatch = useAppDispatch()
  const params = useParams<{ id: string }>()

  const orderQuery = useQuery({
    queryKey: ["orders", params.id],
    queryFn: async () => getOrder(params.id!),
  })

  if (orderQuery.isLoading) {
    return <p>Loading Order</p>
  }

  if (orderQuery.isError) {
    const {
      res: { status },
    } = orderQuery.error as any

    if (status === 409) {
      // user does not exist
      dispatch(AuthActions.logOut())
      return null
    } else if (status === 404) {
      return <p>This order does not exist</p>
    } else {
      return <p>Something went wrong</p>
    }
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
