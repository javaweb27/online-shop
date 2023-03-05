import { OrdersApiRes } from "../services/getOrders"

const orders: OrdersApiRes["orders"] = []

export const ordersApiDataMock: OrdersApiRes = {
  _id: "userid", // not used
  email: "useremail", // not used
  orders,
}

for (let count = 1; count <= 4; count++) {
  const productsObjIds: OrdersApiRes["orders"][number]["productsObjIds"] = []

  for (let id = 1; id <= 6; id++) {
    productsObjIds.push({
      _id: "id--" + id,
      quantity: id,
    })
  }

  orders.push({
    _id: "order-id" + count,
    street: "street name-" + count,
    createdAt: "date--" + count,
    productsObjIds,
  })
}
