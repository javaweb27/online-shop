import { Request, Response } from "express"
import createJwtToken from "../../../lib/createJwtToken"
import UserModel from "../UserModel"
import { mailerSendConfimationLink } from "../../../mailer"

export const register = async (cli: Request, ser: Response) => {
  console.log(`POST /users - create one new user`)
  createJwtToken({ email: cli.body.email }, async (err, token) => {
    if (err) {
      ser.sendStatus(500)
      return
    }
    try {
      const encryptedPassword = await UserModel.schema.methods.encryptPassword(
        cli.body.password
      )

      const userConfirmationToken = token

      const user = await UserModel.create({
        email: cli.body.email,
        password: encryptedPassword,
        balance: 270,
        orders: [],
        isEmailConfirmed: false,
        confirmationToken: userConfirmationToken,
      })

      mailerSendConfimationLink({ userConfirmationToken, userEmail: user.email })

      ser.status(201).json(user)
    } catch (error: any) {
      console.error("Cannot register user, fields are invalid, " + error.message)
      ser.status(400).json({ message: "Cannot register user, fields are invalid" })
    }
  })
}
