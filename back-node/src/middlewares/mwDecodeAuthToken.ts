import { NextFunction, Request, Response } from "express"
import { jwtVerifier } from "../lib/jwtVerifier"

/**
 * Takes the auth token from cli.headers["authorization"]
 * and decode it to cli.decodedToken
 *
 * When auth token is valid runs the next function, otherwise responds a json with 401 status

 */
const mwDecodeAuthToken = async (cli: Request, ser: Response, next: NextFunction) => {
  const authToken = cli.headers.authorization?.split(" ")[1]

  try {
    const decodedToken = await jwtVerifier(authToken!)

    console.log(
      "\nAuth token is valid,",
      "saving it in cli.decodedToken and running the next funcion"
    )

    // @ts-ignore
    cli.decodedToken = decodedToken.data

    next()
  } catch (error) {
    console.log(
      "\nmwDecodeAuthToken:",
      "Cannot continue, token has expired or is invalid, login is required"
    )
    console.error("error:", error)

    return ser.status(401).json({
      message: "Cannot continue, token has expired or is invalid, login is required",
    })
  }
}

export default mwDecodeAuthToken
