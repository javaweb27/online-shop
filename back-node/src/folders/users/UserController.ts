import type { NextFunction, Request, Response } from "express"
import { UserService } from "./UserService.js"

const service = new UserService()

export class UserController {
  async changePassword(cli: Request, res: Response, next: NextFunction) {
    try {
      const authToken = await service.changePassword({
        email: (cli as unknown as any).decodedToken.email,
        currentPassword: cli.body.passCurrent,
        newPassword: cli.body.passNew,
      })
      res.status(201).json({ authToken })
    } catch (error) {
      next(error)
    }
  }
  async deleteByEmail(cli: Request, res: Response, next: NextFunction) {
    try {
      await service.deleteByEmail({ email: (cli as unknown as any).decodedToken.email })

      res.json({ message: "a user has been deleted" })
    } catch (error) {
      next(error)
    }
  }
}
