import { Schema, model } from "mongoose"
// categories can be stored in database?
export const PRODUCTS_CAT = Object.freeze({
  all: "all",
  hamburger: "hamburger",
  pizza: "pizza",
})

const ProductSchema = new Schema({
  // code: {
  //   type: String,
  //   required: true,
  // },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
})

export default model("products", ProductSchema)
