import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authJwtManager } from "../helps/authJwtManager"

export interface AuthState {
  user: { balance: number; email: string; password: string; _id: string }
  loggedIn: boolean
}

function isLoggedIn() {
  try {
    return {
      user: authJwtManager.decode(),
      loggedIn: true,
    }
  } catch (_error) {
    /* empty */
  }
}

const initialState: AuthState = {
  user: {
    balance: 0,
    email: "",
    password: "",
    _id: "",
  },
  loggedIn: false,
}

const auth = createSlice({
  name: "cart",
  initialState: isLoggedIn() ?? initialState,
  reducers: {
    logIn(state, { payload }: PayloadAction<string>) {
      authJwtManager.save(payload)
      state.user = authJwtManager.decode()
      state.loggedIn = true
    },
    logOut() {
      console.log("updating state")

      authJwtManager.delete()
      return initialState
    },
  },
})

export const AuthActions = auth.actions
export default auth.reducer
