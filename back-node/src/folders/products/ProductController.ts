import type { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import { PRODUCTS_CAT } from "./ProductModel.js"
import { paginateItems } from "../../helps/paginateItems.js"
import { ProductService } from "./ProductService.js"
import boom from "@hapi/boom"

const service = new ProductService()

export class ProductController {
  async create(cli: Request, ser: Response, next: NextFunction) {
    try {
      const createdProduct = await service.create({
        title: cli.body.title,
        category: cli.body.category,
        imgSrc: cli.body.imgSrc,
      })

      ser.json(createdProduct)
    } catch (error) {
      next(error)
    }
  }

  async getAll(cli: Request, ser: Response, next: NextFunction) {
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

    try {
      if (isNaN(parsedPageNum)) throw boom.badRequest()

      const products = await service.getAll(filterObj)

      ser.json({
        totalResults: products.length,
        ...paginateItems(parsedPageNum, products),
      })
    } catch (error) {
      next(error)
    }
  }
  async getById(cli: Request, ser: Response, next: NextFunction) {
    const isObjIdValid = mongoose.Types.ObjectId.isValid(cli.params.id)

    try {
      if (isObjIdValid === false) throw boom.notFound("product not found")

      const prod = await service.getById({ id: cli.params.id })

      ser.json(prod)
    } catch (error) {
      next(error)
    }
  }
}
