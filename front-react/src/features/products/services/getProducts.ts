import { fetchJs } from "../../../lib/fetchJs"

export interface ProductApiRes {
  _id: string
  title: string
  price: number
  imgSrc: string
  category: string
}

export interface ProductsPaginationApiRes {
  totalResults: number
  totalPages: number
  current: number
  next: number | null
  previous: number | null
  results: ProductApiRes[]
}

export type GetProductsReturnVal = { res: Response; json: ProductsPaginationApiRes }

export const getProducts = async (
  category: string,
  page: number
): Promise<GetProductsReturnVal> => {
  const res = await fetchJs(`/products?page=${page}&category=${category}`, {
    method: "GET",
  })

  const json = (await res.json()) as ProductsPaginationApiRes

  return { res, json }
}
