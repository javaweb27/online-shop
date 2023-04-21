import { Request, Response } from "express"
import ProductModel, { PRODUCTS_CAT } from "../ProductModel"

export const createOne = async (cli: Request, ser: Response) => {
  console.log(`POST /products - create one new product`)

  // @ts-ignore
  if (!PRODUCTS_CAT[cli.body.category]) {
    return ser.status(400).json({ message: "this category does no exist" })
  }

  try {
    const prod = await ProductModel.create({
      title: cli.body.title,
      price: Math.trunc(Math.random() * 100) + 1,
      category: cli.body.category,
      imgSrc: cli.body.imgSrc,
    })

    ser.json(prod)
  } catch (error: any) {
    ser.status(400).json({ message: error.message })
  }
}
