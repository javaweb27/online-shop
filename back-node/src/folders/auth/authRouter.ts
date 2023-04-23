import { Router } from "express"
import mwGetUserBy from "../../middlewares/mwGetUserBy"
import mwMustTheUserExist from "../../middlewares/mwMustTheUserExist"
import * as authController from "./controllers"

const authRouter = Router()
// auth - log in
authRouter.post(
  "/login",
  mwGetUserBy.bodyEmail,
  mwMustTheUserExist(true),
  authController.logIn
)

// auth - register (create new user)
authRouter.post(
  "/register",
  mwGetUserBy.bodyEmail,
  mwMustTheUserExist(false),
  authController.register
)

export default authRouter
