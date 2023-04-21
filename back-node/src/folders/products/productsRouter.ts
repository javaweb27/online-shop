import { Router } from "express"
import * as productsController from "./controllers/index.controller"

const productsRouter = Router()

// Getting all products
productsRouter.get("/", productsController.getAll)

// Getting one product
// todo: user can visit the page of one product
productsRouter.get("/:id", productsController.getOne)

// Creating one new product
productsRouter.post("/", productsController.createOne)

export default productsRouter
