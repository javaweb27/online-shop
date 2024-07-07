import { Router } from "express"
import mwGetUserBy from "../../middlewares/mwGetUserBy.js"
import mwMustTheUserExist from "../../middlewares/mwMustTheUserExist.js"
import { AuthController } from "./AuthController.js"

const authRouter = Router()

const controller = new AuthController()

// auth - log in
authRouter.post(
  "/login",
  mwGetUserBy.bodyEmail,
  mwMustTheUserExist(true),
  controller.logIn
)

// auth - register (create new user)
authRouter.post(
  "/register",
  mwGetUserBy.bodyEmail,
  mwMustTheUserExist(false),
  controller.register
)

// auth - confirm email of a user
authRouter.post("/confirm-email", controller.confirmEmail)

// auth - resend-email-confirmation for a user
authRouter.post("/resend-email-confirmation", controller.resendEmailConfirmation)

export default authRouter
