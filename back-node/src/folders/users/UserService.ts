import UserModel from "./UserModel.js"
import boom from "@hapi/boom"
import bcrypt from "bcrypt"
import { jwtSigner } from "../../lib/jwtSigner.js"

export class UserService {
  async getById(filters: { id: string }) {
    const user = await UserModel.findOne({ _id: filters.id })

    if (!user) {
      throw boom.notFound("user not found")
    }

    return user
  }
  async getByEmail(filters: { email: string }) {
    const user = await UserModel.findOne({ email: filters.email })

    if (!user) {
      throw boom.notFound("user not found")
    }

    return user
  }

  async changePassword(filters: {
    email: string
    currentPassword: string
    newPassword: string
  }): Promise<string> {
    const user = await this.getByEmail({ email: filters.email })

    const isCurrentPasswordCorrect = await bcrypt.compare(
      filters.currentPassword,
      user.password
    )

    if (false == isCurrentPasswordCorrect) {
      throw boom.forbidden(
        "Cannot update password because the current password is not correct"
      )
    }

    const newPassword = filters.newPassword.trim()

    if (newPassword.length <= 6) {
      throw boom.badRequest("Cannot update password, it must be longer than 6 characters")
    }

    user.password = await bcrypt.hash(newPassword, 12)

    await user.save()

    // why a new token?? log in again?? invalidate the current token to use the new token??
    const authToken = await jwtSigner({
      _id: user._id,
      email: user.email,
      password: user.password, // password should not be here
      balance: user.balance,
    })

    return authToken
  }

  async deleteByEmail(filters: { email: string }) {
    //to check if this user exists or not
    await this.getByEmail({ email: filters.email })

    await UserModel.deleteOne({ email: filters.email })
  }
}
