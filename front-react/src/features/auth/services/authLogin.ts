import { fetchJs } from "../../../lib/fetchJs"

export const authLogin = async (data: { email: string; password: string }) => {
  const res = await fetchJs("/auth/login", { method: "POST", body: JSON.stringify(data) })

  const { authToken: jwt } = await res.json()

  return jwt as string
}
