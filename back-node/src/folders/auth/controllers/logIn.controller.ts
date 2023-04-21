import { Request, Response } from "express"

export const logIn = async (cli: Request, ser: Response) => {
  console.log("POST /auth - login user by email")

  // @ts-ignore
  const User = cli.mwUser

  if ((await User.comparePassword(cli.body.password)) === false) {
    return ser.status(403).json({
      message: "Cannot login because the current is incorrect",
    })
  }

  User.createAuthToken((error: Error | null, encodedToken: string | undefined) => {
    if (error) {
      console.log("route /auth:", "error 500 to create auth token when login")
      return ser.status(500).json({ message: "error to create auth token when login" })
    }

    ser.json({ authToken: encodedToken })
  })
}
