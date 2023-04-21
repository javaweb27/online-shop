import { Request, Response } from "express"
import dbGetProductsToBeOrdered from "../../../lib/dbGetProductsToBeOrdered"

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

  User.orders.push({
    // auto object _id for order
    // auto createdAt date for order
    productsObjIds: productsToBeOrdered,
    street: cli.body.street,
  })

  try {
    // error may come from balance, less than 0
    await User.save()

    User.createAuthToken((error: any, encodedToken: any) => {
      if (error) {
        console.log("route /auth:", "error 500 to create auth token when login")
        return res.status(500).json({ message: "error to create auth token when login" })
      }

      res.status(201).json({ authToken: encodedToken })
    })
  } catch (error: any) {
    console.log(error)

    res.status(403).json({
      message: error.message,
    })
  }
}
