import { config } from "dotenv"
config()

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/test-online-shop"
export const PORT = process.env.PORT || "3060"

/** used only for auth */
export const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY || "secret-key"

/** used only for email confirmation, not for auth */
export const JWT_CONFIRM_EMAIL_KEY =
  process.env.JWT_CONFIRM_EMAIL_KEY || "secret-email-key"

/** link base of the client in github pages (frontend) */
export const CORS_URL = process.env.CORS_URL || "http://localhost:5173"

export const MAILER_EMAIL = process.env.MAILER_EMAIL || "your@email.com"
export const MAILER_PASSWORD = process.env.MAILER_PASSWORD || "yourpassword"
