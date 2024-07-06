import { Router } from "express"
import mwGetUserBy from "../../middlewares/mwGetUserBy.js"
import mwMustTheUserExist from "../../middlewares/mwMustTheUserExist.js"
import mwDecodeAuthToken from "../../middlewares/mwDecodeAuthToken.js"
import * as usersController from "./controllers/index.js"

const usersRouter = Router()

/*
  create new user (register)
  is in authRouter
 */

// Updating profile data of a user, only password for now
usersRouter.put(
  "/",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true),
  usersController.changePassword
)

// Deleting a user (a user decided to delete his account)
usersRouter.delete(
  "/",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true),
  usersController.deleteOne
)

export default usersRouter
