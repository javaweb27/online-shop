import { Model, Schema, model } from "mongoose"
import type { SignCallback } from "jsonwebtoken"
import { emailRegex } from "../../helps/regex.js"
import { jwtSigner } from "../../lib/jwtSigner.js"
import bcrypt from "bcrypt"

interface IUser {
  email: string
  password: string
  balance: number
  isEmailConfirmed: boolean
  confirmationToken: string
  sentConfirmationTokenDate: number
}

interface IUserMethods {
  createAuthToken(callbackfunc: SignCallback): void
  comparePassword(password: string): Promise<boolean>
  encryptPassword(password: string): Promise<string>
  isTimeToSendEmail(): boolean
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
  sentConfirmationTokenDate: {
    type: Number,
    required: true,
  },
})

UserSchema.methods.createAuthToken = async function () {
  return await jwtSigner({
    _id: this._id,
    email: this.email,
    password: this.password,
    balance: this.balance,
  })
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

UserSchema.methods.isTimeToSendEmail = function () {
  const lastDate = this.sentConfirmationTokenDate

  const difference = Date.now() - lastDate

  return difference / 1000 >= 60
}

export default model("users", UserSchema)
