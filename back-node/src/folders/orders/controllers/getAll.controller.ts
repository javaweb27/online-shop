import { Request, Response } from "express"

/**
 * get all orders of a user
 */
export const getAll = async (cli: Request, res: Response) => {
  console.log(`GET /orders - orders of a user`)

  // @ts-ignore
  const { _id, email, orders } = cli.mwUser

  res.json({ _id, email, orders })
}
