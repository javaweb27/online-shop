import { JWT_CONFIRM_EMAIL_KEY, JWT_TOKEN_KEY } from "./config.js"

/**
 * call this function before starting to listen the server
 *
 * throws an Error if the jwt key of CONFIRM_EMAIL
 * and TOKEN are the same
 *
 * users should not pass the auth filter (mwDecodeAuthToken.ts)
 * with the token to confirm the email
 */
export const checkJwtValues = () => {
  if (JWT_CONFIRM_EMAIL_KEY === JWT_TOKEN_KEY) {
    throw new Error(
      `JWT_CONFIRM_EMAIL_KEY and JWT_TOKEN_KEY must NOT be the same, change the secret key`
    )
  }
}
