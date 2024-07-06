import { Router } from "express"
import { ProductController } from "./ProductController"

const productsRouter = Router()

const controller = new ProductController()

// Getting all products
productsRouter.get("/", controller.getAll)

// Getting one product
// todo: user can visit the page of one product
productsRouter.get("/:id", controller.getById)

// Creating one new product
productsRouter.post("/", controller.create)

export default productsRouter
