import { fetchJs } from "../../../lib/fetchJs"

export const authReSendEmail = async (email: string) => {
  const res = await fetchJs("/auth/resend-email-confirmation", {
    method: "POST",
    body: JSON.stringify({ email }),
  })

  return res
}
