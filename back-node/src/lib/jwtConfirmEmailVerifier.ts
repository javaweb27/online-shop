import jwt from "jsonwebtoken"
import { JWT_CONFIRM_EMAIL_KEY } from "../config.js"

type Payload = {
  id: string
  exp: number
  iat: number
}

export const jwtConfirmEmailVerifier = async (token: string): Promise<Payload> => {
  const decodedToken = jwt.verify(token, JWT_CONFIRM_EMAIL_KEY)

  return decodedToken as Payload
}
