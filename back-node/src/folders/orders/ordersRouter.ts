import { Router } from "express"
import mwGetUserBy from "../../middlewares/mwGetUserBy.js"
import mwDecodeAuthToken from "../../middlewares/mwDecodeAuthToken.js"
import mwMustTheUserExist from "../../middlewares/mwMustTheUserExist.js"
import { newOrderRequestBodyMiddleware } from "./middlewares/newOrderRequestBody.middleware.js"
import { productsToBeOrderedMiddleware } from "./middlewares/productsToBeOrdered.middleware.js"
import { userEmailMustBeConfirmedMiddleware } from "./middlewares/userEmailMustBeConfirmed.middleware.js"
import { OrderController } from "./OrderController.js"

const ordersRouter = Router()

const controller = new OrderController()

// Getting orders of a user
ordersRouter.get(
  "/",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true, 409),
  controller.getAll
)

// Getting one order of a user
ordersRouter.get(
  "/:orderId",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true, 409),
  controller.getById
)

// Creating one new order for one user
ordersRouter.post(
  "/",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true, 401),
  userEmailMustBeConfirmedMiddleware,
  ...newOrderRequestBodyMiddleware,
  productsToBeOrderedMiddleware,
  controller.create
)

export default ordersRouter
