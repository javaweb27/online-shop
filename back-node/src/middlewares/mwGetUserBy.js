import UserModel from "../models/UserModel"
import { Types } from "mongoose"

const mwGetUserBy = {
  async paramUserId(cli, ser, next) {
    const isObjIdValid = Types.ObjectId.isValid(cli.params.userId)

    try {
      const userFound = isObjIdValid ? await UserModel.findById(cli.params.userId) : null

      cli.mwUser = userFound
      next()
    } catch (error) {
      console.error("mwGetUserBy.paramUserId: error to find user", error.message)
      ser.sendStatus(500)
    }
  },
  async bodyEmail(cli, ser, next) {
    try {
      const userFound = await UserModel.findOne({
        $or: [{ email: cli.body.email }],
      })

      cli.mwUser = userFound
      next()
    } catch (error) {
      console.error("mwGetUserBy.bodyEmail: error to find user", error.message)
      ser.sendStatus(500)
    }
  },
  async tokenPayload(cli, ser, next) {
    try {
      const userFound = await UserModel.findOne({
        $or: [{ email: cli.decodedToken.email }],
      })

      cli.mwUser = userFound
      next()
    } catch (error) {
      console.error("mwGetUserBy.tokenPayload: error to find user", error.message)
      ser.sendStatus(500)
    }
  },
}

export default mwGetUserBy
