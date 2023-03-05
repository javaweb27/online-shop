import jwt from "jsonwebtoken"
import { JWT_TOKEN_KEY } from "../config"

/**
 * Takes the auth token from cli.headers["authorization"]
 * and decode it to cli.decodedToken
 *
 * When auth token is valid runs the next function, otherwise responds a json with 401 status
 * @param {Request} cli
 * @param {Response} ser
 * @param {NextFunction} next
 */
const mwDecodeAuthToken = (cli, ser, next) => {
  const authToken = cli.headers.authorization?.split(" ")[1]

  jwt.verify(authToken, JWT_TOKEN_KEY, (error, decodedToken) => {
    if (error) {
      console.log(
        "mwDecodeAuthToken:",
        "Cannot continue, token has expired or is invalid, login is required"
      )
      return ser.status(401).json({
        message: "Cannot continue, token has expired or is invalid, login is required",
      })
    }

    console.log(
      "Auth token is valid,",
      "saving it in cli.decodedToken and running the next funcion"
    )

    cli.decodedToken = decodedToken.data

    next()
  })
}

export default mwDecodeAuthToken
