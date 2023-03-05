import { ProductApiRes } from "../../services/getProducts"
import { Product } from "../Product"

interface ProductsListProps {
  data: ProductApiRes[]
}

export const ProductsList = ({ data }: ProductsListProps) => {
  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fill,minmax(290px,1fr))] py-4">
      {data.map(data => {
        return <Product key={data._id} data={data} />
      })}
    </div>
  )
}
