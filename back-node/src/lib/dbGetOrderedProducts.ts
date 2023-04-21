import { Types } from "mongoose"
import ProductModel from "../folders/products/ProductModel"

type productsObjIds = { _id: Types.ObjectId; quantity: number }[]

/**
 *
 * @param {any[]} orderedProducts
 * @returns Array of ordered products with quantity in each products
 */
const dbGetOrderedProducts = async (orderedProducts: productsObjIds) => {
  const foundProducts = await ProductModel.find({
    _id: { $in: orderedProducts },
  })

  const findQuantity = (id: Types.ObjectId) => {
    return orderedProducts.find(prod => prod._id.toString() === id.toString())!.quantity
  }

  return foundProducts.map(item => {
    return {
      // @ts-ignore
      ...item._doc,
      quantity: findQuantity(item._id),
    }
  })
}

export default dbGetOrderedProducts
