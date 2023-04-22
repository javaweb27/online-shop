import { Schema, Types, model } from "mongoose"

export interface IOrder {
  userId: Types.ObjectId
  street: string
  createdAt: string
  productsObjIds: Types.Array<{
    _id: Types.ObjectId
    quantity: number
  }>
}

const OrderSchema = new Schema<IOrder>({
  // automatic _id for each order
  userId: { type: Schema.Types.ObjectId, required: true },
  street: { type: String, required: true },
  createdAt: {
    type: String,
    immutable: true,
    default: () => new Date().toISOString().slice(0, 10),
  },
  productsObjIds: [
    {
      _id: {
        type: Schema.Types.ObjectId,
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

export default model("orders", OrderSchema)
