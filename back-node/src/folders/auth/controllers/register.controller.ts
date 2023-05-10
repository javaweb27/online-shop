import { Request, Response } from "express"
import UserModel from "../../users/UserModel"
import { mailerSendConfimationLink } from "../../../mailer"
import { jwtConfirmEmailSigner } from "../../../lib/jwtConfirmEmailSigner"

export const register = async (cli: Request, res: Response) => {
  console.log(`POST /users - create one new user`)

  let confirmationToken: string

  try {
    const encryptedPassword = await UserModel.schema.methods.encryptPassword(
      cli.body.password
    )

    const user = new UserModel({
      email: cli.body.email,
      password: encryptedPassword,
      balance: 270,
      orders: [],
      isEmailConfirmed: false,
      confirmationToken: "replace-before-saving",
    })

    try {
      confirmationToken = await jwtConfirmEmailSigner(user._id.toString())
    } catch (error) {
      res
        .status(500)
        .json({ message: "error when create the token to confirm user email" })
      return
    }

    user.confirmationToken = confirmationToken

    await user.save()

    mailerSendConfimationLink({
      userConfirmationToken: confirmationToken,
      userEmail: user.email,
    })

    res.status(201).json({ message: "user registered" })
  } catch (error: any) {
    console.error("Cannot register user, fields are invalid, " + error.message)
    res.status(400).json({ message: "Cannot register user, fields are invalid" })
  }
}
