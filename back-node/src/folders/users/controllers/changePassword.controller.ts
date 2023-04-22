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
    console.log("a user has update password")

    const authToken = await User.createAuthToken()

    res.status(201).json({ authToken }) // why a new token??
  } catch (error: any) {
    console.error("Cannot update password, " + error.message)
    res
      .status(400)
      .json({ message: "Cannot update password, it must be longer than 6 characters" })
    // return res.status(500).json({ message: "error when creating the auth token when changing the user password" })
  }
}
