import { Router } from "express"
import mwGetUserBy from "../../middlewares/mwGetUserBy"
import mwMustTheUserExist from "../../middlewares/mwMustTheUserExist"
import mwDecodeAuthToken from "../../middlewares/mwDecodeAuthToken"
import * as usersController from "./controllers"

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
