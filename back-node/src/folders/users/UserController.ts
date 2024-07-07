import type { NextFunction, Request, Response } from "express"
import UserModel from "./UserModel.js"
import boom from "@hapi/boom"

export class UserController {
  async changePassword(cli: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const User = cli.mwUser

    try {
      if ((await User.comparePassword(cli.body.passCurrent)) === false) {
        throw boom.forbidden(
          "Cannot update password because the current password is incorrect"
        )
      }

      if ((cli.body.passNew as string).length <= 6) {
        throw boom.badRequest(
          "Cannot update password, it must be longer than 6 characters"
        )
      }

      User.password = await User.encryptPassword(cli.body.passNew)

      await User.save()
      console.log("a user has update password")

      const authToken = await User.createAuthToken()

      res.status(201).json({ authToken }) // why a new token??
    } catch (error) {
      next(error)
      // return res.status(500).json({ message: "error when creating the auth token when changing the user password" })
    }
  }
  async deleteByEmail(cli: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const User = cli.mwUser

    try {
      await UserModel.deleteOne({ email: User.email })

      res.json({ message: "a user has been deleted" })
    } catch (error) {
      next(error)
    }
  }
}
