import { Router } from "express"
import mwGetUserBy from "../../middlewares/mwGetUserBy"
import mwDecodeAuthToken from "../../middlewares/mwDecodeAuthToken"
import mwMustTheUserExist from "../../middlewares/mwMustTheUserExist"
import * as ordersController from "./controllers"
import { newOrderRequestBodyMiddleware } from "./middlewares/newOrderRequestBody.middleware"
import { productsToBeOrderedMiddleware } from "./middlewares/productsToBeOrdered.middleware"

const ordersRouter = Router()

// Getting orders of a user
ordersRouter.get(
  "/",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true, 409),
  ordersController.getAll
)

// Getting one order of a user
ordersRouter.get(
  "/:orderId",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true, 409),
  ordersController.getOne
)

// Creating one new order for one user
ordersRouter.post(
  "/",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true, 409),
  ...newOrderRequestBodyMiddleware,
  productsToBeOrderedMiddleware,
  ordersController.createOne
)

export default ordersRouter
