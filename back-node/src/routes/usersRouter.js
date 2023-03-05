import { Router } from "express"
import mwGetUserBy from "../middlewares/mwGetUserBy"
import UserModel from "../models/UserModel"
import mwMustTheUserExist from "../middlewares/mwMustTheUserExist"
import mwDecodeAuthToken from "../middlewares/mwDecodeAuthToken"

const usersRouter = Router()

// Creating one new user
// auth register
usersRouter.post(
  "/",
  mwGetUserBy.bodyEmail,
  mwMustTheUserExist(false),
  async (cli, ser) => {
    console.log(`POST /users - create one new user`)

    try {
      const encryptedPassword = await UserModel.schema.methods.encryptPassword(
        cli.body.password
      )

      const user = await UserModel.create({
        email: cli.body.email,
        password: encryptedPassword,
        balance: 270,
        orders: [],
      })

      ser.status(201).json(user)
    } catch (error) {
      console.error("Cannot register user, fields are invalid, " + error.message)
      ser.status(400).json({ message: "Cannot register user, fields are invalid" })
    }
  }
)

// Updating profile data of a user, only password for now
usersRouter.put(
  "/",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true),
  async (cli, res) => {
    console.log(`PUT /users - updating a user`)
    const User = cli.mwUser

    if ((await User.comparePassword(cli.body.passCurrent)) === false) {
      return res.status(403).json({
        message: "Cannot update password because the current password is incorrect",
      })
    }

    try {
      User.password = await User.encryptPassword(cli.body.passNew)

      await User.save()

      User.createAuthToken((error, encodedToken) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "error to create auth token when login" })
        }

        console.log("a user has update password")
        res.status(201).json({ authToken: encodedToken })
      })
    } catch (error) {
      console.error("Cannot update password, " + error.message)
      res
        .status(400)
        .json({ message: "Cannot update password, it must be longer than 6 characters" })
    }
  }
)

// Deleting a user
usersRouter.delete(
  "/",
  mwDecodeAuthToken,
  mwGetUserBy.tokenPayload,
  mwMustTheUserExist(true),
  async (cli, res) => {
    console.log(`DELETE /users - deleting a user`)
    const User = cli.mwUser

    try {
      await UserModel.deleteOne({ email: User.email })

      res.json({ message: "a user has been deleted" })
    } catch (error) {
      console.error("error to delete user,", error.message)
      res.sendStatus(500)
    }
  }
)

export default usersRouter
