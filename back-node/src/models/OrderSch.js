import { Schema, SchemaTypes } from "mongoose"

export const OrderSch = new Schema({
  // automatic _id for each order
  street: { type: String, required: true },
  createdAt: {
    type: String,
    immutable: true,
    default: () => new Date().toISOString().slice(0, 10),
  },
  productsObjIds: [
    {
      _id: {
        type: SchemaTypes.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
})
