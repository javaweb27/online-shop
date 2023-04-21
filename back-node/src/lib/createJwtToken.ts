import jwt, { SignCallback } from "jsonwebtoken"
import { JWT_TOKEN_KEY } from "../config"

const createJwtToken = (data: Record<string, any>, callbackfunc: SignCallback) => {
  jwt.sign(
    { data },
    JWT_TOKEN_KEY,
    // { expiresIn: "300s" },
    callbackfunc
    // (error, token) => {
    //   res.json({ token })
    // }
  )
}

export default createJwtToken
