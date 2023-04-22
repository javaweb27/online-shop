import { Request, Response } from "express"
import { jwtSigner } from "../../../lib/jwtSigner"
import UserModel from "../UserModel"
import { mailerSendConfimationLink } from "../../../mailer"

export const register = async (cli: Request, ser: Response) => {
  console.log(`POST /users - create one new user`)

  let confirmationToken: string

  try {
    confirmationToken = await jwtSigner({ email: cli.body.email })
  } catch (error) {
    ser.status(500).json({ message: "error when create the token to confirm user email" })
    return
  }

  try {
    const encryptedPassword = await UserModel.schema.methods.encryptPassword(
      cli.body.password
    )

    const user = await UserModel.create({
      email: cli.body.email,
      password: encryptedPassword,
      balance: 270,
      orders: [],
      isEmailConfirmed: false,
      confirmationToken,
    })

    mailerSendConfimationLink({
      userConfirmationToken: confirmationToken,
      userEmail: user.email,
    })

    ser.status(201).json(user)
  } catch (error: any) {
    console.error("Cannot register user, fields are invalid, " + error.message)
    ser.status(400).json({ message: "Cannot register user, fields are invalid" })
  }
}
