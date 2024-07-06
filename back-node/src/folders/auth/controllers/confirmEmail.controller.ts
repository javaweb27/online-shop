import type { Request, Response } from "express"
import UserModel from "../../users/UserModel.js"
import { jwtConfirmEmailVerifier } from "../../../lib/jwtConfirmEmailVerifier.js"

/**
 * response code:
 *
 * 204: user email confirmed successfully, or it was already confirmed
 *
 * 401: invalid or expired token | user ID doesn't exist | the token is different
 *
 * 500: server/db error
 */
export const confirmEmail = async (cli: Request, res: Response) => {
  console.log("\n\n\nPOST /auth/confirm-email")

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
