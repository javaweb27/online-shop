import { UseMutationResult, useMutation } from "@tanstack/react-query"
import { authReSendEmail } from "../services/authReSendEmail"

export type UseAuthReSendEmailReturn = UseMutationResult<
  Response,
  unknown,
  string,
  unknown
>

export const useAuthReSendEmail = (): UseAuthReSendEmailReturn => {
  const mutation = useMutation({
    mutationKey: ["re-send-email"],
    mutationFn: authReSendEmail,
  })

  return mutation
}
