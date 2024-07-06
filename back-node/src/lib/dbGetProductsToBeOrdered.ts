import ProductModel from "../folders/products/ProductModel.js"
// import { Types } from "mongoose"

const dbGetProductsToBeOrdered = async (
  productsToOrder: { _id: string; qty: number }[]
) => {
  const ids = productsToOrder.map(prod => prod._id)

  const foundProducts = await ProductModel.find(
    {
      _id: { $in: ids },
    },
    { price: 1 }
  )

  const findQuantity = (id: string) => productsToOrder.find(({ _id }) => _id === id)!.qty

  // client must send an array of {_id,qty} so findQuanity is not undefined
  // const findQuantity = id => productsToOrder.find(({ _id }) => _id === id)?.qty ?? 1

  const withQuantity = foundProducts.map(prod => ({
    _id: prod._id,
    price: prod.price,
    quantity: findQuantity(prod._id.toString()),
  }))

  let totalPrice = 0

  for (const { price, quantity } of withQuantity) {
    totalPrice += price * quantity
  }

  return {
    productsToBeOrdered: withQuantity,
    totalPrice,
  }
}

export default dbGetProductsToBeOrdered
