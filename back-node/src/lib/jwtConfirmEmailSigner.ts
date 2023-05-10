import jwt from "jsonwebtoken"
import { JWT_CONFIRM_EMAIL_KEY } from "../config"

export const jwtConfirmEmailSigner = async (id: string): Promise<string> => {
  return jwt.sign({ id }, JWT_CONFIRM_EMAIL_KEY)
}
