import { Request, Response } from "express"
import ProductModel, { PRODUCTS_CAT } from "../ProductModel"
import { paginateItems } from "../../../helps/paginateItems"

export const getAll = async (cli: Request, ser: Response) => {
  console.log(`GET /products - page ${cli.query.page} - category ${cli.query.category}`)

  // @ts-ignore
  const categoryToShow = cli.query.category?.toLowerCase()

  // when the category does not exist or it is "all" send all products
  const filterObj =
    // @ts-ignore
    categoryToShow !== "all" && PRODUCTS_CAT[categoryToShow]
      ? { category: categoryToShow }
      : {}

  const products = await ProductModel.find(filterObj)

  // @ts-ignore
  const parsedPageNum = parseInt(cli.query.page)

  if (isNaN(parsedPageNum)) return ser.sendStatus(400)

  if (products.length === 0) {
    ser.sendStatus(404)
    return
  }

  ser.json({
    totalResults: products.length,
    ...paginateItems(parsedPageNum, products),
  })
}
