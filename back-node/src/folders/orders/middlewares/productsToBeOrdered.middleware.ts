import { NextFunction, Request, Response } from "express"
import ProductModel from "../../products/ProductModel"

import { OrdersCreateOneResponse } from "../controllers/createOne.controller"

/**
 * used in "ordersRouter" for creating a new order for a user
 *
 * it must be used after the newOrderRequestBody middleware
 * to use the request validated data
 *
 */

export const productsToBeOrderedMiddleware = async (
  cli: Request,
  res: Response<any, OrdersCreateOneResponse["locals"]>,
  next: NextFunction
) => {
  const { productsObjIdsMap, ids } = transformProductsToMapAndListOfIds(
    res.locals.requestOrder.productsObjIds
  )

  let orderTotalPrice = 0

  try {
    const foundProducts = await ProductModel.find({ _id: { $in: ids } })

    // end the request when
    // there is no product
    // with the ids that user sent
    if (foundProducts.length === 0) {
      res.status(404).json({ message: "all products of this order don't exist" })
      return
    }

    /*
    "res.locals.productsToBeOrdered" is an
    array of objects that have _id(objecid) with its quanity

    this array is meant to be saved in the Orders collection
    for a user (userId) and the street

    this array could contain less items that the user request sent
    if some products doesn't exist
     */
    res.locals.productsToBeOrdered = foundProducts.map(product => {
      const quantity = productsObjIdsMap.get(product._id.toString())!

      orderTotalPrice += product.price * quantity

      return {
        _id: product._id,
        quantity,
      }
    })
    res.locals.orderTotalPrice = orderTotalPrice

    next()
  } catch (error) {
    res.status(500).json({ message: "error when finding the products to be ordered" })
  }
}

function transformProductsToMapAndListOfIds(
  productsObjIds: OrdersCreateOneResponse["locals"]["requestOrder"]["productsObjIds"]
) {
  const productsObjIdsMap = new Map<string, number>()
  const ids: string[] = []

  for (const { _id, qty } of productsObjIds) {
    ids.push(_id)

    productsObjIdsMap.set(_id, qty)
  }

  return {
    /**
     * key = id of a product(it could not exist in db)
     *
     * value = the quantity to order of the product
     */
    productsObjIdsMap,
    /** arrays of ids (some ids could not exist) */
    ids,
  }
}
