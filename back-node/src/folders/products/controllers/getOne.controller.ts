import { Request, Response } from "express"
import mongoose from "mongoose"
import ProductModel from "../ProductModel"

export const getOne = async (cli: Request, ser: Response) => {
  console.log(`GET /products/${cli.params.id}`)

  const isObjIdValid = mongoose.Types.ObjectId.isValid(cli.params.id)

  if (isObjIdValid === false) return ser.sendStatus(404)

  const prod = await ProductModel.findById(cli.params.id)
  //there is no exeption error if
  //connection to mongodb fails (mongoose or mongodb??)

  if (!prod) return ser.sendStatus(404)

  ser.json(prod)
}
