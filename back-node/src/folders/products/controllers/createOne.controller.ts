import { Request, Response } from "express"
import { PRODUCTS_CAT } from "../ProductModel"
import { ProductService } from "../ProductService"

const service = new ProductService()

export const createOne = async (cli: Request, ser: Response) => {
  console.log(`POST /products - create one new product`)

  // @ts-ignore
  if (!PRODUCTS_CAT[cli.body.category]) {
    return ser.status(400).json({ message: "this category does no exist" })
  }

  try {
    const createdProduct = await service.create({
      title: cli.body.title,
      category: cli.body.category,
      imgSrc: cli.body.imgSrc,
    })

    ser.json(createdProduct)
  } catch (error: any) {
    ser.status(400).json({ message: error.message })
  }
}
