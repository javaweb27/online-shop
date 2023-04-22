import jwt from "jsonwebtoken"
import { JWT_TOKEN_KEY } from "../config"

export const jwtSigner = async <T extends Record<string, unknown>>(
  data: T
): Promise<string> => {
  return jwt.sign(
    { data },
    JWT_TOKEN_KEY
    // { expiresIn: "300s" }
  )
}
