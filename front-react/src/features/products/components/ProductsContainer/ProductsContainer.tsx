import { useAppSelector } from "../../../../hooks/reduxHooks"
import { ProductsList } from "../ProductsList"
import { ProductsCatBtns } from "../ProductsCatBtns"
import { ProductsPageBtns } from "../ProductsPageBtns"
import { useGetProducts } from "../../hooks/useGetProducts"

export const ProductsContainer = () => {
  const { category: currentCategory, page: currentPage } = useAppSelector(s => s.products)

  const { data, isLoading, isError, isFetching } = useGetProducts({
    category: currentCategory,
    page: currentPage,
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
