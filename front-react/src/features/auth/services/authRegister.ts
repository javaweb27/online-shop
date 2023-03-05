import { fetchJs } from "../../../lib/fetchJs"

export const authRegister = async (data: { email: string; password: string }) => {
  const res = await fetchJs("/users", { method: "POST", body: JSON.stringify(data) })

  if (!res.ok) {
    throw res
  }

  const userData = await res.json()

  // user data is no used
  // not usefull
  return userData as Record<string, any>
}
