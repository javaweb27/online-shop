import ProductModel from "../folders/products/ProductModel"

/**
 *
 * @param {any[]} orderedProducts
 * @returns Array of ordered products with quantity in each products
 */
const dbGetOrderedProducts = async orderedProducts => {
  const foundProducts = await ProductModel.find({
    _id: { $in: orderedProducts },
  })

  const findQuantity = id => {
    return orderedProducts.find(prod => prod._id.toString() === id.toString()).quantity
  }

  return foundProducts.map(item => {
    return {
      ...item._doc,
      quantity: findQuantity(item._id),
    }
  })
}

export default dbGetOrderedProducts
