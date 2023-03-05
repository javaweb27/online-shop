import jwtDecode from "jwt-decode"

const JWT_KEY = "authJwt"

interface AuthJwtDecoded {
  data: { balance: number; email: string; password: string; _id: string }
  iat: number
}

export const authJwtManager = {
  /** saves the jwt in localStorage */
  save(jwt: string) {
    localStorage.setItem(JWT_KEY, jwt)
  },
  /** returns the jwt from localStorage */
  get() {
    return localStorage.getItem(JWT_KEY)
  },
  /** deletes the jwt from localStorage */
  delete() {
    localStorage.removeItem(JWT_KEY)
  },
  /** decodes the jwt from localStorage and returns its payload */
  decode(): AuthJwtDecoded["data"] {
    const jwt = localStorage.getItem(JWT_KEY)
    return jwtDecode<AuthJwtDecoded>(jwt!).data
  },
}
