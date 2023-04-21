import { NextFunction, Request, Response } from "express"
import UserModel from "../folders/users/UserModel"
import { Types } from "mongoose"

const mwGetUserBy: Record<
  string,
  (cli: Request, ser: Response, next: NextFunction) => void
> = {
  async paramUserId(cli, ser, next) {
    const isObjIdValid = Types.ObjectId.isValid(cli.params.userId)

    try {
      const userFound = isObjIdValid ? await UserModel.findById(cli.params.userId) : null

      // @ts-ignore
      cli.mwUser = userFound
      next()
    } catch (error: any) {
      console.error("mwGetUserBy.paramUserId: error to find user", error.message)
      ser.sendStatus(500)
    }
  },
  async bodyEmail(cli, ser, next) {
    try {
      const userFound = await UserModel.findOne({
        $or: [{ email: cli.body.email }],
      })

      // @ts-ignore
      cli.mwUser = userFound
      next()
    } catch (error: any) {
      console.error("mwGetUserBy.bodyEmail: error to find user", error.message)
      ser.sendStatus(500)
    }
  },
  async tokenPayload(cli, ser, next) {
    try {
      const userFound = await UserModel.findOne({
        // @ts-ignore
        $or: [{ email: cli.decodedToken.email }],
      })

      // @ts-ignore
      cli.mwUser = userFound
      next()
    } catch (error: any) {
      console.error("mwGetUserBy.tokenPayload: error to find user", error.message)
      ser.sendStatus(500)
    }
  },
}

export default mwGetUserBy
