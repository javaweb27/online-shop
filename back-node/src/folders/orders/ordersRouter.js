import { Router } from "express"
import dbGetProductsToBeOrdered from "../../lib/dbGetProductsToBeOrdered"
import mwGetUserBy from "../../middlewares/mwGetUserBy"
import mwDecodeAuthToken from "../../middlewares/mwDecodeAuthToken"
import mwMustTheUserExist from "../../middlewares/mwMustTheUserExist"
import dbGetOrderedProducts from "../../lib/dbGetOrderedProducts"

const ordersRouter = Router()

// Getting orders of a user
ordersRouter.get(
  "/",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true, 409),
  async (cli, res) => {
    console.log(`GET /orders - orders of a user`)

    const { _id, email, orders } = cli.mwUser

    res.json({ _id, email, orders })
  }
)

// Getting one order of a user
ordersRouter.get(
  "/:orderId",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true, 409),
  async (cli, res) => {
    console.log(`GET /orders/${cli.params.orderId} - one order of a user`)

    const User = cli.mwUser

    const orderFound = User.orders.find(
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
)

// Creating one new order for one user
ordersRouter.post(
  "/",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true, 409),
  async (cli, res) => {
    console.log(`GET /orders - create one order for a user`)

    const User = cli.mwUser

    // "productsObjIds" must be exist and it must have 1 or more IDs
    if (!cli.body.productsObjIds?.length > 0) {
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

      User.createAuthToken((error, encodedToken) => {
        if (error) {
          console.log("route /auth:", "error 500 to create auth token when login")
          return res
            .status(500)
            .json({ message: "error to create auth token when login" })
        }

        res.status(201).json({ authToken: encodedToken })
      })
    } catch (error) {
      console.log(error)

      res.status(403).json({
        message: error.message,
      })
    }
  }
)

export default ordersRouter
