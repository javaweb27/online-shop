import { fetchJs } from "../../../lib/fetchJs"

export const confirmEmail = async (token: string) => {
  const res = await fetchJs("/auth/confirm-email", {
    method: "POST",
    body: JSON.stringify({ token }),
  })

  return res
}
