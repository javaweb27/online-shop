import { Request, Response } from "express"
import UserModel from "../UserModel"

/**
 * deletes a user (own decision of the user)
 */
export const deleteOne = async (cli: Request, res: Response) => {
  console.log(`DELETE /users - deleting a user`)
  // @ts-ignore
  const User = cli.mwUser

  try {
    await UserModel.deleteOne({ email: User.email })

    res.json({ message: "a user has been deleted" })
  } catch (error: any) {
    console.error("error to delete user,", error.message)
    res.sendStatus(500)
  }
}
