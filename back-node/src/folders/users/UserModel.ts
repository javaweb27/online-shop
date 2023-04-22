import { Model, Schema, model } from "mongoose"
import { SignCallback } from "jsonwebtoken"
import { emailRegex } from "../../helps/regex"
import createJwtToken from "../../lib/createJwtToken"
import bcrypt from "bcrypt"

interface IUser {
  email: string
  password: string
  balance: number
  isEmailConfirmed: boolean
  confirmationToken: string
}

interface IUserMethods {
  createAuthToken(callbackfunc: SignCallback): void
  comparePassword(password: string): Promise<boolean>
  encryptPassword(password: string): Promise<string>
}

type UserModel = Model<IUser, Record<string, never>, IUserMethods>

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: (v: string) => Boolean(emailRegex.exec(v)) === true,
      message: () => "it has not a valid format to register",
    },
  },
  password: {
    type: String,
    required: true,
    // minLength: 7, // it is validated in controller
  },
  balance: {
    type: Number,
    min: 0,
    max: 27000,
    required: true,
  },
  isEmailConfirmed: {
    type: Boolean,
    required: true,
  },
  confirmationToken: {
    type: String,
    required: true,
  },
})

UserSchema.methods.createAuthToken = function (callbackfunc: SignCallback) {
  createJwtToken(
    {
      _id: this._id,
      email: this.email,
      password: this.password,
      balance: this.balance,
    },
    callbackfunc
  )
}

UserSchema.methods.comparePassword = async function (password: string) {
  if (!password) return false

  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.encryptPassword = async function (password: string) {
  if (!password || password.length <= 6) {
    throw new Error("password must be longer than 6 characters")
  }

  return await bcrypt.hash(password, 10)
}

export default model("users", UserSchema)
