import { FC } from "react"
import { useAppDispatch } from "../../../../hooks/reduxHooks"
import { cartActions } from "../../../cart/redux-store-slices/cart.slice"
import { ProductApiRes } from "../../services/getProducts"

interface ProductProps {
  data: ProductApiRes
}

export const Product: FC<ProductProps> = ({ data }) => {
  const dispatch = useAppDispatch()
  return (
    <article>
      <img
        className="object-cover h-60 w-full rounded-xl bg-gray-500"
        src={data.imgSrc}
        alt={data.title}
      />
      <div className="p-1">
        <h3 className="text-lg mb-1">{data.title}</h3>
        <div className="text-neutral-font-alt flex justify-between">
          <span>{data.price} $</span>
          <span>in stock</span>
        </div>
        <button
          className="w-full btn btn-primary"
          onClick={() => {
            dispatch(cartActions.addQty(data))
          }}
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}
