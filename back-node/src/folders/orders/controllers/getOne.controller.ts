import type { Request, Response } from "express"
import OrderModel from "../OrderModel.js"
import ProductModel from "../../products/ProductModel.js"

/**
 * get one order of a user (including order's products)
 */
export const getOne = async (cli: Request, res: Response) => {
  console.log(`GET /orders/${cli.params.orderId} - one order of a user`)

  // @ts-ignore
  const User = cli.mwUser

  try {
    const orderFound = await OrderModel.findOne({
      _id: cli.params.orderId,
      userId: User._id,
    })

    if (!orderFound) return res.status(404).json({ message: "Cannot find order" })

    const orderedProducts = await ProductModel.find(
      {
        _id: { $in: orderFound.productsObjIds },
      },
      { __v: 0 }
    )

    const orderedProductsWithQuantity = orderedProducts.map(item => {
      const { quantity } = orderFound.productsObjIds.find(
        orderItem => item._id.toString() === orderItem._id.toString()
      )!

      return { ...item.toObject(), quantity }
    })

    const orderData = {
      _id: orderFound._id,
      street: orderFound.street,
      createdAt: orderFound.createdAt,
      products: orderedProductsWithQuantity,
    }

    res.json(orderData)
  } catch (error) {
    res
      .status(500)
      .json({ message: "error when getting a order or the ordered products of a order" })
  }
}
