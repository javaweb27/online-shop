import { Schema, Types } from "mongoose"

export interface IOrder {
  street: string
  createdAt: string
  productsObjIds: [
    {
      _id: Types.ObjectId
      quantity: number
    }
  ]
}

export const OrderSch = new Schema<IOrder>({
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
