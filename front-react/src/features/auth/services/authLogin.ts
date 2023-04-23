import { fetchJs } from "../../../lib/fetchJs"

export const authLogin = async (data: { email: string; password: string }) => {
  const res = await fetchJs("/auth/login", { method: "POST", body: JSON.stringify(data) })

  console.log("res instance")
  console.log(res instanceof Response)

  if (!res.ok) {
    throw res
  }

  const { authToken: jwt } = await res.json()

  return jwt as string
}
