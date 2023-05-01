import { Request, Response } from "express"
// import dbGetProductsToBeOrdered from "../../../lib/dbGetProductsToBeOrdered"
import OrderModel from "../OrderModel"
// import { matchedData, validationResult } from "express-validator"
import { Types } from "mongoose"

export type OrdersCreateOneResponse = {
  locals: {
    /** validated data */
    requestOrder: {
      street: string
      productsObjIds: { _id: string; qty: number }[]
    }
    /** products to save in db (OrdersModel) */
    productsToBeOrdered: { _id: Types.ObjectId; quantity: number }[]
    orderTotalPrice: number
  }
}

/**
 * create one order for a user
 */
export const createOne = async (
  cli: Request,
  res: Response<any, OrdersCreateOneResponse["locals"]>
) => {
  console.log(`\nGET /orders - create one order for a user`)

  const { productsToBeOrdered, orderTotalPrice } = res.locals

  // res.json({ productsToBeOrdered, orderTotalPrice })

  // @ts-ignore
  const User = cli.mwUser

  if (User.balance < orderTotalPrice) {
    res.status(409).json({ message: "balance is not enough" })
    return
  }

  User.balance -= orderTotalPrice

  const newOrder = new OrderModel({
    // auto object _id for order
    // auto createdAt date for order
    productsObjIds: productsToBeOrdered,
    street: res.locals.requestOrder.street,
    userId: User._id,
  })

  try {
    await Promise.all([User.save(), newOrder.save()])

    res.status(201).json({ message: "order created at " + newOrder.createdAt })
  } catch (error: any) {
    console.log(error)

    res.status(500).json({
      message: "error when creating a new order",
    })
  }
}
