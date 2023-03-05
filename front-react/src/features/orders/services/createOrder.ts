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

  const res = await fetchJs("/orders", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: { authorization: "jwt" },
  })

  if (!res.ok) {
    //409 status means that the user does not exist
    throw { res }
  }

  // authToken is not being used
  // const json = (await res.json()) as { authToken: string }
  // console.log("order created")
  // console.log("json", json)

  return {
    res,
    // json,
  }
}
