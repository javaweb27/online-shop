import { NODE_API } from "../config"
import { authJwtManager } from "../features/auth/helps/authJwtManager"

interface Request extends Omit<RequestInit, "method" | "headers"> {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE"
  headers?: RequestInit["headers"] & { authorization?: "jwt" }
}

/**
 * already includes root url of the NODE API
 *
 * already includes content as json in headers
 *
 * /api is necessary in endpoint
 */
export function fetchJs(endpoint: `/${string}`, { headers, ...init }: Request) {
  return fetch(NODE_API + endpoint, {
    ...init,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      "authorization": headers?.authorization ? getAuthJwt() : "",
    },
  })
}

function getAuthJwt() {
  return "Bearer " + authJwtManager.get()
}
