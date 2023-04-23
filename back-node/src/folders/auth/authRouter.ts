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

export default authRouter
