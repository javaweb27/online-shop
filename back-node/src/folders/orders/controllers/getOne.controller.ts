import { Types } from "mongoose"
import dbGetOrderedProducts from "../../../lib/dbGetOrderedProducts"
import { Request, Response } from "express"

/**
 * get one order of a user
 */
export const getOne = async (cli: Request, res: Response) => {
  console.log(`GET /orders/${cli.params.orderId} - one order of a user`)

  // @ts-ignore
  const User = cli.mwUser

  type Order = {
    street: string
    productsObjIds: { _id: Types.ObjectId; quantity: number }[]
    _id: Types.ObjectId
    createdAt: string
    orderedProducts: unknown
  }

  const orderFound = (User.orders as Order[]).find(
    ({ _id }) => _id.toString() === cli.params.orderId
  )

  if (!orderFound) return res.status(404).json({ message: "Cannot find order" })

  const orderedProducts = await dbGetOrderedProducts(orderFound.productsObjIds)

  orderFound.orderedProducts = orderedProducts
  const orderData = {
    _id: orderFound._id,
    street: orderFound.street,
    createdAt: orderFound.createdAt,
    products: orderedProducts,
  }

  res.json(orderData)
}
