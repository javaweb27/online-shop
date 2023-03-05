import { Schema, model } from "mongoose"
import { emailRegex } from "../helps/regex"
import createJwtToken from "../lib/createJwtToken"
import bcrypt from "bcrypt"
import { OrderSch } from "./OrderSch"

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: v => Boolean(emailRegex.exec(v)) === true,
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
  orders: [OrderSch],
})

UserSchema.methods.createAuthToken = function (callbackfunc) {
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

UserSchema.methods.comparePassword = async function (password) {
  if (!password) return false

  return await bcrypt.compare(password, this.password)
}

UserSchema.methods.encryptPassword = async function (password) {
  if (!password || password.length <= 6) {
    throw new Error("password must be longer than 6 characters")
  }

  return await bcrypt.hash(password, 10)
}

export default model("users", UserSchema)
