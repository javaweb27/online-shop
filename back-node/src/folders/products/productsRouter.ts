import { Router } from "express"
import mongoose from "mongoose"
// import { paginateItems } from "../helps/paginateItems"
import { paginateItems } from "../../helps/paginateItems"
import ProductModel, { PRODUCTS_CAT } from "./ProductModel"

const productsRouter = Router()

// Getting all products
productsRouter.get("/", async (cli, ser) => {
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
})

// Getting one product
// todo: user can visit the page of one product
productsRouter.get("/:id", async (cli, ser) => {
  console.log(`GET /products/${cli.params.id}`)

  const isObjIdValid = mongoose.Types.ObjectId.isValid(cli.params.id)

  if (isObjIdValid === false) return ser.sendStatus(404)

  const prod = await ProductModel.findById(cli.params.id)
  //there is no exeption error if
  //connection to mongodb fails (mongoose or mongodb??)

  if (!prod) return ser.sendStatus(404)

  ser.json(prod)
})

// Creating one new product
productsRouter.post("/", async (cli, ser) => {
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
})

export default productsRouter
