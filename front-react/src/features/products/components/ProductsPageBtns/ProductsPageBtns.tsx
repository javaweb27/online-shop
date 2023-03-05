import { useQueryClient } from "@tanstack/react-query"
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks"
import { productsActions } from "../../redux-store-slices/products.slice"
import { GetProductsReturnVal } from "../../services/getProducts"

export const ProductsPageBtns = () => {
  const dispatch = useAppDispatch()
  const currentCategory = useAppSelector(s => s.products.category)
  const currentPage = useAppSelector(s => s.products.page)
  const queryClient = useQueryClient()

  const data = queryClient.getQueryData<GetProductsReturnVal>([
    "products",
    { category: currentCategory, page: currentPage },
  ] as const)

  if (!data) {
    return <p>Loading buttons</p>
  }

  const maxResults = 3 // from backend
  const { totalResults } = data.json

  const qtyOfPages = Math.ceil(totalResults / maxResults)

  const numbers: JSX.Element[] = []

  for (let number = 1; number <= qtyOfPages; number++) {
    const isCurrent = currentPage === number

    numbers.push(
      <button
        key={number}
        disabled={isCurrent}
        onClick={() => {
          dispatch(productsActions.changePage(number))

          // adding current category was not necessary
          queryClient.invalidateQueries(["products", { page: currentPage }])
        }}
        className={`btn px-3 shadow-md disabled:bg-gray-700 disabled:text-white`}
      >
        {number}
      </button>
    )
  }

  return (
    <div data-testid="ProductsPageBtns" className="flex gap-3">
      {numbers}
    </div>
  )
}
