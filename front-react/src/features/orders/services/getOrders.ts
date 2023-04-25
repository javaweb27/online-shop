import { fetchJs } from "../../../lib/fetchJs"

interface Order {
  _id: string
  street: string
  createdAt: string
  productsObjIds: {
    _id: string
    quantity: number
  }[]
}

export interface OrdersApiRes {
  _id: string
  email: string
  orders: Order[]
}

export const getOrders = async () => {
  //409 status means that the user does not exist
  const res = await fetchJs("/orders", {
    method: "GET",
    headers: { authorization: "jwt" },
  })

  const json = (await res.json()) as OrdersApiRes

  return {
    res,
    json,
  }
}
