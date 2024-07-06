import { Request, Response } from "express"
import mongoose from "mongoose"
import { ProductService } from "../ProductService"

const service = new ProductService()

export const getOne = async (cli: Request, ser: Response) => {
  console.log(`GET /products/${cli.params.id}`)

  const isObjIdValid = mongoose.Types.ObjectId.isValid(cli.params.id)

  if (isObjIdValid === false) return ser.sendStatus(404)

  const prod = await service.getById({ id: cli.params.id })
  //there is no exeption error if
  //connection to mongodb fails (mongoose or mongodb??)

  if (!prod) return ser.sendStatus(404)

  ser.json(prod)
}
