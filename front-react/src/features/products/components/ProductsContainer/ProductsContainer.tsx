import { useQuery } from "@tanstack/react-query"
import { useAppSelector } from "../../../../hooks/reduxHooks"
import { getProducts } from "../../services/getProducts"
import { ProductsList } from "../ProductsList"
import { ProductsCatBtns } from "../ProductsCatBtns"
import { ProductsPageBtns } from "../ProductsPageBtns"

export const ProductsContainer = () => {
  const { category: currentCategory, page: currentPage } = useAppSelector(s => s.products)

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["products", { category: currentCategory, page: currentPage }] as const,
    queryFn: ({ queryKey }) => {
      const { page, category } = queryKey[1]
      return getProducts(category, page)
    },
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <div>Loading products</div>
  }

  if (isFetching) {
    console.log("re-loading")

    return <div>re-fetching</div>
  }

  if (isError) {
    return <div>something went wrong</div>
  }

  return (
    <>
      <div className="flex justify-end">
        <ProductsCatBtns />
      </div>
      <div className="flex justify-center">
        <ProductsPageBtns />
      </div>
      <ProductsList data={data.json.results} />
      <div className="flex justify-center">
        <ProductsPageBtns />
      </div>
    </>
  )
}
