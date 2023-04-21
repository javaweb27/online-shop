/**
 * A middleware to indicate if the user from cli.mwUser must exist or not
 * to continue to the next function after obtain it with mwGetUserBy middleware
 * @param {boolean} mustItExist
 * @param {number} statusOnExist
 */

import { NextFunction, Request, Response } from "express"

const mwMustTheUserExist = (mustItExist: boolean, statusOnExist = 404) => {
  return (cli: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (Boolean(cli.mwUser) === mustItExist) {
      return next()
    }

    if (mustItExist === true) {
      console.error("mwMustTheUserExist:", "Cannot find the user")
      return res.status(statusOnExist).json({ message: "Cannot find the user" })
    } else {
      console.error("mwMustTheUserExist:", "Cannot continue, this user already exists")
      return res.status(403).json({ message: "This user already exists" })
    }
  }
}

export default mwMustTheUserExist
