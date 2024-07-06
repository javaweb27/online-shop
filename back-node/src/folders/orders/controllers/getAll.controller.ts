import type { Request, Response } from "express"
import OrderModel from "../OrderModel.js"

/**
 * get all orders of a user
 */
export const getAll = async (cli: Request, res: Response) => {
  console.log(`GET /orders - orders of a user`)

  // @ts-ignore
  const { _id, email } = cli.mwUser

  try {
    const orders = await OrderModel.find({ userId: _id }, { userId: 0 })
    res.json({ _id, email, orders })
  } catch (error) {
    res.status(500).json({ message: "error when getting all orders of a user" })
  }
}
