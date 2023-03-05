import { Link } from "react-router-dom"
import { OrdersApiRes } from "../../services/getOrders"

interface OrdersListProps {
  orders: OrdersApiRes["orders"]
}
export const OrdersList = ({ orders }: OrdersListProps) => {
  return (
    <ul data-testid="OrdersList">
      {orders.map(order => {
        return (
          <li key={order._id}>
            <Link
              to={"/orders/" + order._id}
              className="block py-1 hover:bg-neutral-bg-alt-hover"
            >
              <div>
                {order.productsObjIds.length} product(s) ordered - {order.street}
              </div>

              <div className="text-neutral-font-alt">{order.createdAt}</div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
