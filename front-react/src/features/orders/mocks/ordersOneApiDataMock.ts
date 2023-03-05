import { OrdersOneApiRes } from "../services/getOrder"

const products: OrdersOneApiRes["products"] = []

export const ordersOneApiDataMock: OrdersOneApiRes = {
  _id: "order-id-" + Math.floor(Math.random() * 10),
  createdAt: "order-date-" + String(Date.now()),
  street: "order-street-123",
  products,
}

for (let count = 1; count <= 4; count++) {
  products.push({
    _id: "product-id-" + count,
    category: "product-cat-" + count,
    imgSrc: "img-src-" + count,
    price: count,
    title: "product-title-" + count,
    quantity: count,
  })
}
