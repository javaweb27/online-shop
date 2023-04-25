import { fetchJs } from "../../../lib/fetchJs"
import { ProductApiRes } from "../../products/services/getProducts"

export interface OrdersOneApiRes {
  _id: string
  street: string
  createdAt: string
  products: OrderProductApiRes[]
}

interface OrderProductApiRes extends ProductApiRes {
  quantity: number
}

export const getOrder = async (orderId: string) => {
  //409 status means that the user does not exist
  const res = await fetchJs(`/orders/${orderId}`, {
    method: "GET",
    headers: { authorization: "jwt" },
  })

  const json = (await res.json()) as OrdersOneApiRes

  return {
    res,
    json,
  }
}
