import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ProductsState {
  category: string
  page: number
}

const initialState: ProductsState = {
  category: "all",
  page: 1,
}

const products = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changeCategory(state, { payload }: PayloadAction<string>) {
      state.category = payload
    },
    changePage(state, { payload }: PayloadAction<number>) {
      state.page = payload
    },
  },
})

export const productsActions = products.actions
export default products.reducer
