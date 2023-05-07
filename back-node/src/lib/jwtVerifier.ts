import jwt from "jsonwebtoken"
import { JWT_TOKEN_KEY } from "../config"

export const jwtVerifier = async <T extends Record<string, unknown>>(
  token: string
): Promise<T> => {
  const decodedToken = jwt.verify(token, JWT_TOKEN_KEY)

  return decodedToken as T
}
