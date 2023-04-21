import { Request, Response } from "express"

export const changePassword = async (cli: Request, res: Response) => {
  console.log(`PUT /users - updating a user`)
  // @ts-ignore
  const User = cli.mwUser

  if ((await User.comparePassword(cli.body.passCurrent)) === false) {
    return res.status(403).json({
      message: "Cannot update password because the current password is incorrect",
    })
  }

  try {
    User.password = await User.encryptPassword(cli.body.passNew)

    await User.save()

    User.createAuthToken((error: Error | null, encodedToken: string | undefined) => {
      if (error) {
        return res.status(500).json({ message: "error to create auth token when login" })
      }

      console.log("a user has update password")
      res.status(201).json({ authToken: encodedToken })
    })
  } catch (error: any) {
    console.error("Cannot update password, " + error.message)
    res
      .status(400)
      .json({ message: "Cannot update password, it must be longer than 6 characters" })
  }
}
