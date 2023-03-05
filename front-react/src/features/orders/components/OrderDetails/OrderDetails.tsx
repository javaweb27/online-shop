import { OrdersOneApiRes } from "../../services/getOrder"

interface OrderDetailsProps {
  details: Omit<OrdersOneApiRes, "products">
}

export const OrderDetails = ({ details }: OrderDetailsProps) => {
  return (
    <table data-testid="OrderDetails" className="mb-4 sm-max:block">
      <thead className="sm-max:hidden">
        <tr>
          <th className="py-1 px-2 text-left">Order ID</th>
          <th className="py-1 px-2 text-left">Street</th>
          <th className="py-1 px-2 text-left">Ordered at</th>
        </tr>
      </thead>
      <tbody className="sm-max:block">
        <tr className="sm-max:grid grid-rows-3">
          <td className="py-1 px-2">
            <span className="sm:hidden">Order ID: </span>
            <span>{details._id}</span>
          </td>
          <td className="py-1 px-2">
            <span className="sm:hidden">Street: </span>
            <span>{details.street}</span>
          </td>
          <td className="py-1 px-2">
            <span className="sm:hidden">Ordered at: </span>
            <span>{details.createdAt}</span>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
