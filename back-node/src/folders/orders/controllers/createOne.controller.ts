import { Request, Response } from "express"
import dbGetProductsToBeOrdered from "../../../lib/dbGetProductsToBeOrdered"
import OrderModel from "../OrderModel"

/**
 * create one order for a user
 */
export const createOne = async (cli: Request, res: Response) => {
  console.log(`GET /orders - create one order for a user`)

  // @ts-ignore
  const User = cli.mwUser

  // "productsObjIds" must be exist and it must have 1 or more IDs
  if (!(cli.body.productsObjIds?.length > 0)) {
    return res
      .status(400)
      .json({ message: "Cannot order prodcuts, 1 or more items are required" })
  }

  const { productsToBeOrdered, totalPrice } = await dbGetProductsToBeOrdered(
    cli.body.productsObjIds
  )

  User.balance -= totalPrice

  const newOrder = new OrderModel({
    // auto object _id for order
    // auto createdAt date for order
    productsObjIds: productsToBeOrdered,
    street: cli.body.street,
    userId: User._id,
  })

  try {
    // error may come from balance, less than 0
    await User.save()
    await newOrder.save()

    res.status(201).json({ message: "order created at " + newOrder.createdAt })
  } catch (error: any) {
    console.log(error)

    res.status(403).json({
      message: error.message,
    })
  }
}
