import { Router } from "express"
import mwGetUserBy from "../../middlewares/mwGetUserBy.js"
import mwDecodeAuthToken from "../../middlewares/mwDecodeAuthToken.js"
import mwMustTheUserExist from "../../middlewares/mwMustTheUserExist.js"
import * as ordersController from "./controllers/index.js"
import { newOrderRequestBodyMiddleware } from "./middlewares/newOrderRequestBody.middleware.js"
import { productsToBeOrderedMiddleware } from "./middlewares/productsToBeOrdered.middleware.js"
import { userEmailMustBeConfirmedMiddleware } from "./middlewares/userEmailMustBeConfirmed.middleware.js"

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
  mwMustTheUserExist(true, 401),
  userEmailMustBeConfirmedMiddleware,
  ...newOrderRequestBodyMiddleware,
  productsToBeOrderedMiddleware,
  ordersController.createOne
)

export default ordersRouter
