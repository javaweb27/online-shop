import { fetchJs } from "../../../lib/fetchJs"

interface OrdersApiCli {
  productsObjIds: {
    _id: string
    qty: number
  }[]
  street: string
}

export const createOrder = async (idsWithQtys: OrdersApiCli["productsObjIds"]) => {
  const dataToSend = {
    productsObjIds: idsWithQtys,
    street: "avenue always alive",
  } satisfies OrdersApiCli

  /*
  401 status means that:
  - the auth token wasn't sent, or it was invalid or expired
  - the user doesn't exist
   */
  const res = await fetchJs("/orders", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: { authorization: "jwt" },
  })

  return res
}
