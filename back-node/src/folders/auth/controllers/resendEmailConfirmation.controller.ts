import type { Request, Response } from "express"
import UserModel from "../../users/UserModel.js"
import { jwtConfirmEmailSigner } from "../../../lib/jwtConfirmEmailSigner.js"
import { mailerSendConfimationLink } from "../../../mailer.js"

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
export const resendEmailConfirmation = async (cli: Request, res: Response) => {
  console.log("\n\n\nPOST /auth/resend-email-confirmation")

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
