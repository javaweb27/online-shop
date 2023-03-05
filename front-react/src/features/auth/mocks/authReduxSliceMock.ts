import { AuthState } from "../redux-store-slices/auth.slice"

const user = {
  balance: Math.random() * 100 + 1,
  email: "user@email.123",
  password: "password" + Date.now(),
  _id: "user-id--mongodb-123",
}

export const authReduxSliceMock = {
  onTrue: generateState(true),
  onFalse: generateState(false),
}

function generateState(loggedIn: boolean) {
  return {
    auth: {
      user,
      loggedIn,
    } satisfies AuthState,
  }
}
