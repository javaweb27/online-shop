import jwt from "jsonwebtoken"
import { JWT_TOKEN_KEY } from "../config"

const createJwtToken = (data, callbackfunc) => {
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
