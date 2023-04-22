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

  try {
    const authToken = await User.createAuthToken()
    ser.json({ authToken })
  } catch (error) {
    console.log("\nerror 500 when creating auth token for logging in")
    ser.status(500).json({ message: "error when creating auth token for logging inn" })
  }
}
