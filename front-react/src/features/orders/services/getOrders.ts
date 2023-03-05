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
  const res = await fetchJs("/orders", {
    method: "GET",
    headers: { authorization: "jwt" },
  })

  if (!res.ok) {
    //409 status means that the user does not exist
    throw { res }
  }

  const json = (await res.json()) as OrdersApiRes

  return {
    res,
    json,
  }
}
