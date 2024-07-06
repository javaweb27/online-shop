import ProductModel from "./ProductModel.js"

export class ProductService {
  async create(product: { title: string; category: string; imgSrc: string }) {
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

    return products
  }
  async getById(filters: { id: string }) {
    return await ProductModel.findById(filters.id)
  }
}
