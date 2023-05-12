import { useMutation } from "@tanstack/react-query"
import { confirmEmail } from "../services/confirmEmail"
type UseConfirmEmail = typeof useConfirmEmail

export type UseConfirmEmailReturn = ReturnType<UseConfirmEmail>

export const useConfirmEmail = () => {
  const mutation = useMutation({
    mutationKey: ["confirm-email"],
    mutationFn: confirmEmail,
  })
  return mutation
}
