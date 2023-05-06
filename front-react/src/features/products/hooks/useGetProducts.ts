import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../services/getProducts"

type UseGetProductsParams = {
  category: string
  page: number
}

export const useGetProducts = ({ category, page }: UseGetProductsParams) => {
  const productsQuery = useQuery({
    queryKey: ["products", { category, page }] as const,
    queryFn: ({ queryKey }) => {
      const { page, category } = queryKey[1]
      return getProducts(category, page)
    },
    refetchOnWindowFocus: false,
  })
  return productsQuery
}
