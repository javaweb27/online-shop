import { fetchJs } from "../../../lib/fetchJs"

export const authRegister = async (data: { email: string; password: string }) => {
  const res = await fetchJs("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  })

  const userData = await res.json()

  // user data is no used
  // not usefull
  return userData as Record<string, any>
}
