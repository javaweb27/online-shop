import { BiPlus, BiMinus } from "react-icons/bi"
import { IoClose } from "react-icons/io5"
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks"
import { cartActions } from "../../redux-store-slices/cart.slice"

export const CartList = () => {
  const dispatch = useAppDispatch()
  const cart = useAppSelector(s => s.cart)

  if (cart.items.length === 0) {
    return <p>You don't have any product in the cart</p>
  }

  return (
    <table className="sm-max:block">
      {/* data-testid="CartList" is in <CartContainer /> */}
      <thead className="sm-max:hidden">
        <tr>
          <th className="text-left p-3 pl-0">Image</th>
          <th className="text-left p-3">Product</th>
          <th className="text-left p-3">Quantity</th>
          <th className="text-left p-3">Price</th>
        </tr>
      </thead>
      <tbody className="sm-max:grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-7">
        {cart.items.map(item => {
          return (
            <tr key={item._id} className="sm-max:flex flex-col items-center">
              <td className="sm-max:block p-3 sm:pl-0">
                <img
                  className="sm-max:w-20 sm-max:h-20 w-16 h-16 object-cover max-w-none sm-max:rounded-full"
                  src={item.imgSrc}
                  alt={item.title}
                />
              </td>
              <td className="p-3 flex flex-col">
                <span>{item.title}</span>
                <span className="text-neutral-font-alt">{item.price} $</span>
              </td>
              <td className="sm-max:block p-3">{item.qty}x</td>
              <td className="sm-max:block p-3">{item.qty * item.price} $</td>
              <td className="sm-max:flex gap-5 p-3">
                <button
                  onClick={() => {
                    dispatch(cartActions.addQty(item))
                  }}
                >
                  <BiPlus data-testid="icon-inc-qty" className="btn text-4xl shadow-md" />
                </button>
                <button
                  onClick={() => {
                    dispatch(cartActions.decrementQty({ itemId: item._id }))
                  }}
                >
                  <BiMinus
                    data-testid="icon-dec-qty"
                    className="btn text-4xl shadow-md"
                  />
                </button>
                <button
                  onClick={() => {
                    dispatch(cartActions.remove({ itemId: item._id }))
                  }}
                >
                  <IoClose
                    data-testid="icon-remove"
                    className="btn text-4xl bg-red-600 text-white shadow-md"
                  />
                </button>
              </td>
              {/* <td className="sm-max:block p-3"></td>
              <td className="sm-max:block p-3"></td> */}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
