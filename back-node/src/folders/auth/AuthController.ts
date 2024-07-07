import type { Request, Response } from "express"
import { jwtConfirmEmailVerifier } from "../../lib/jwtConfirmEmailVerifier.js"
import UserModel from "../users/UserModel.js"
import { mailerSendConfimationLink } from "../../mailer.js"
import { jwtConfirmEmailSigner } from "../../lib/jwtConfirmEmailSigner.js"

export class AuthController {
  /**
   * response code:
   *
   * 204: user email confirmed successfully, or it was already confirmed
   *
   * 401: invalid or expired token | user ID doesn't exist | the token is different
   *
   * 500: server/db error
   */
  async confirmEmail(cli: Request, res: Response) {
    const { token } = cli.body

    let decodedToken: Awaited<ReturnType<typeof jwtConfirmEmailVerifier>>

    try {
      decodedToken = await jwtConfirmEmailVerifier(token!)
      console.log("verifying the confirmation token...")
    } catch (error) {
      console.log("confirmEmail controller:", "\nCannot confirm email, token is invalid")

      console.log("\nerror:", (error as Error).message)

      return res.status(401).json({
        message: "\nCannot confirm email, token is invalid",
      })
    }

    // token is valid
    console.log("\nToken is valid, finding user by id...")

    let User

    try {
      User = await UserModel.findById(decodedToken.id)
    } catch (error) {
      console.error("\nerror when finding an user to confirm the email")
      console.error(error)

      res.status(500).json({ message: "error, something went wrong" })
    }

    if (!User) {
      console.log("Couldn't confirm email, userId doesn't exist")

      res.status(401).json({ message: "invalid token" })
      return
    }

    if (User.isEmailConfirmed) {
      console.log("This email is already confirmed")

      res.sendStatus(204)
      return
    }

    if (User.confirmationToken !== token) {
      console.log("Couldn't confirm email, the token is different")

      res.status(401).json({ message: "invalid token" })
      return
    }

    console.log("user found, updating user...")

    User.isEmailConfirmed = true
    User.confirmationToken = "true"

    try {
      await User.save()

      console.log("updated, email confirmed successfully")
      res.sendStatus(204)
    } catch (error) {
      console.error("\nerror when saving an user to confirm the email")
      console.error(error)

      res.status(500).json({ message: "error, something went wrong" })
    }
  }

  /**
   * response code:
   *
   * 200: email was already confirmed
   *
   * 201: re-sending an email with a new confirmation token
   *
   * 401: there is no account with the email
   *
   * 409: email can be sent only every 60 seconds
   *
   * 500: server/db error
   */
  async resendEmailConfirmation(cli: Request, res: Response) {
    const { email } = cli.body

    try {
      const User = await UserModel.findOne({ email })

      if (!User) {
        console.log(
          "Couldn't re-send the email confirmation, the email doesn't exist in DB"
        )
        res.status(401).json({ message: "There is no user with this email" })
        return
      }

      if (User.isEmailConfirmed) {
        console.log("This email is already confirmed")

        res.status(200).json({ message: "This email is alread confirmed" })
        return
      }

      if (false === User.isTimeToSendEmail()) {
        console.log("Couldn't re-send email, email can be sent only every 60 seconds")

        res.status(409).json({ message: "email can be sent only every 60 seconds" })
        return
      }

      const confirmationToken = await jwtConfirmEmailSigner(User._id.toString())

      console.log("updating confirmationToken...")

      User.confirmationToken = confirmationToken
      User.sentConfirmationTokenDate = Date.now()

      await User.save()

      console.log("updated with a new confirmationToken")
      mailerSendConfimationLink({
        userConfirmationToken: confirmationToken,
        userEmail: User.email,
      })

      res.status(201).json({ message: "check your email" })
    } catch (error) {
      console.error(
        "\nerror when finding or updating user for re-sending the email confirmation"
      )
      console.error(error)

      res.status(500).json({ message: "error, something went wrong" })
    }
  }

  async logIn(cli: Request, ser: Response) {
    // @ts-ignore
    const User = cli.mwUser

    if ((await User.comparePassword(cli.body.password)) === false) {
      return ser.status(403).json({
        message: "Cannot login because the current is incorrect",
      })
    }

    try {
      const authToken = await User.createAuthToken()
      ser.json({ authToken })
    } catch (error) {
      console.log("\nerror 500 when creating auth token for logging in")
      ser.status(500).json({ message: "error when creating auth token for logging inn" })
    }
  }

  async register(cli: Request, res: Response) {
    let confirmationToken: string

    try {
      const encryptedPassword = await UserModel.schema.methods.encryptPassword(
        cli.body.password
      )

      const SECONDS_60 = 1000 * 60

      const user = new UserModel({
        email: cli.body.email,
        password: encryptedPassword,
        balance: 270,
        orders: [],
        isEmailConfirmed: false,
        confirmationToken: "replace-before-saving",
        sentConfirmationTokenDate: Date.now() - SECONDS_60,
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
}
