import type { Request, Response } from "express"
import mongoose from "mongoose"
import { PRODUCTS_CAT } from "./ProductModel.js"
import { paginateItems } from "../../helps/paginateItems.js"
import { ProductService } from "./ProductService.js"

const service = new ProductService()

export class ProductController {
  async create(cli: Request, ser: Response) {
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

  async getAll(cli: Request, ser: Response) {
    // @ts-ignore
    const categoryToShow = cli.query.category?.toLowerCase()

    // when the category does not exist or it is "all" send all products
    const filterObj =
      // @ts-ignore
      categoryToShow !== "all" && PRODUCTS_CAT[categoryToShow]
        ? { category: categoryToShow as string }
        : ({} as Record<string, never>)

    // @ts-ignore
    const parsedPageNum = parseInt(cli.query.page)

    if (isNaN(parsedPageNum)) return ser.sendStatus(400)

    const products = await service.getAll(filterObj)

    if (products.length === 0) {
      ser.sendStatus(404)
      return
    }

    ser.json({
      totalResults: products.length,
      ...paginateItems(parsedPageNum, products),
    })
  }
  async getById(cli: Request, ser: Response) {
    const isObjIdValid = mongoose.Types.ObjectId.isValid(cli.params.id)

    if (isObjIdValid === false) return ser.sendStatus(404)

    const prod = await service.getById({ id: cli.params.id })
    //there is no exeption error if
    //connection to mongodb fails (mongoose or mongodb??)

    if (!prod) return ser.sendStatus(404)

    ser.json(prod)
  }
}
