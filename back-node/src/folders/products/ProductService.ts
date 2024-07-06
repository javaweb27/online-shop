import ProductModel, { PRODUCTS_CAT } from "./ProductModel.js"
import boom from "@hapi/boom"

export class ProductService {
  async create(product: { title: string; category: string; imgSrc: string }) {
    // @ts-ignore
    if (!PRODUCTS_CAT[product.category]) {
      throw boom.badRequest("this category does not exist")
    }

    const createdProduct = await ProductModel.create({
      title: product.title,
      price: Math.trunc(Math.random() * 100) + 1,
      category: product.category,
      imgSrc: product.imgSrc,
    })

    return createdProduct
  }
  async getAll(filters: { category: string } | Record<string, never>) {
    const products = await ProductModel.find(filters)

    if (0 == products.length) {
      throw boom.notFound("products not found")
    }

    return products
  }
  async getById(filters: { id: string }) {
    const product = await ProductModel.findById(filters.id)

    if (!product) {
      throw boom.notFound("product not found")
    }

    return product
  }
}
