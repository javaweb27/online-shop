import type { NextFunction, Request, Response } from "express"

// cli.mwUser
export const userEmailMustBeConfirmedMiddleware: (
  cli: Request,
  res: Response,
  next: NextFunction
) => void = (cli, res, next) => {
  //@ts-ignore
  const User = cli.mwUser

  if (User.isEmailConfirmed) {
    next()
  } else {
    res
      .status(403)
      .json({ message: "Your email must be confirmed before ordering products" })
  }
}
