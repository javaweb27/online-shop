import { Router } from "express"
import mwGetUserBy from "../middlewares/mwGetUserBy"
import mwMustTheUserExist from "../middlewares/mwMustTheUserExist"

const authRouter = Router()
// auth - log in
authRouter.post(
  "/",
  mwGetUserBy.bodyEmail,
  mwMustTheUserExist(true),
  async (cli, ser) => {
    console.log("POST /auth - login user by email")

    const User = cli.mwUser

    if ((await User.comparePassword(cli.body.password)) === false) {
      return ser.status(403).json({
        message: "Cannot login because the current is incorrect",
      })
    }

    User.createAuthToken((error, encodedToken) => {
      if (error) {
        console.log("route /auth:", "error 500 to create auth token when login")
        return ser.status(500).json({ message: "error to create auth token when login" })
      }

      ser.json({ authToken: encodedToken })
    })
  }
)

export default authRouter
