import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ProductApiRes } from "../../products/services/getProducts"

export interface CartProduct extends ProductApiRes {
  qty: number
}

interface AuthState {
  items: CartProduct[]
}

const initialState: AuthState = {
  items: [],
  // price: 0,
}

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addQty(state, { payload }: PayloadAction<ProductApiRes>) {
      const foundItem = state.items.find(item => item._id === payload._id)

      if (!foundItem) {
        // is new in the cart
        state.items.push({ ...payload, qty: 1 })
      } else {
        foundItem.qty += 1
      }
    },
    decrementQty(state, { payload }: PayloadAction<{ itemId: string }>) {
      const foundItem = state.items.find(item => item._id === payload.itemId)

      if (!foundItem) return

      foundItem.qty -= 1

      if (foundItem.qty <= 0) {
        state.items = state.items.filter(item => item._id !== foundItem._id)
      }
    },
    remove(state, { payload }: PayloadAction<{ itemId: string }>) {
      state.items = state.items.filter(item => item._id !== payload.itemId)
    },
  },
})

export const cartActions = cart.actions
export default cart.reducer
