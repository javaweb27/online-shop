import { OrdersOneApiRes } from "../../services/getOrder"

interface OrderedProductsListProps {
  products: OrdersOneApiRes["products"]
}

export const OrderProductsList = ({ products }: OrderedProductsListProps) => {
  const orderTotals = {
    price: 0,
    qty: 0,
  }

  return (
    <table data-testid="OrderProductsList" className="mb-4 sm-max:flex flex-col gap-7">
      <thead className="md-max:hidden">
        <tr>
          <th className="py-1 px-4 text-left">Image</th>
          <th className="py-1 px-4 text-left">Product</th>
          <th className="py-1 px-4 text-left">Quantity</th>
          <th className="py-1 px-4 text-left">Total price</th>
        </tr>
      </thead>
      <tbody className="sm-max:grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-7">
        {products.map(item => {
          const priceByQuanity = item.price * item.quantity

          orderTotals.price += priceByQuanity
          orderTotals.qty += item.quantity
          return (
            <tr key={item._id} className="sm-max:flex flex-col items-center">
              <td className="p-4">
                <img
                  className="w-16 h-16 sm-max:w-20 sm-max:h-20 object-cover max-w-none sm-max:rounded-full"
                  src={item.imgSrc}
                  alt={item.title}
                />
              </td>
              <td className="py-1 px-4">{item.title}</td>
              <td className="py-1 px-4">{item.quantity}x</td>
              <td className="py-1 px-4">{priceByQuanity} $</td>
            </tr>
          )
        })}
      </tbody>
      <tfoot className="sm-max:flex">
        <tr className="sm-max:flex flex-col gap-4">
          <td className="py-1 px-4 sm-max:hidden">{null}</td>
          <td className="py-1 px-4 sm-max:hidden">{null}</td>
          <td className="py-1 px-4">
            Quantity: <strong>{orderTotals.qty}</strong> in total
          </td>
          <td className="py-1 px-4">
            Total price: <strong>{orderTotals.price} $</strong> in total
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
