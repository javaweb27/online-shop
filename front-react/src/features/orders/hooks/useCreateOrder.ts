import { useMutation } from "@tanstack/react-query"
import { createOrder } from "../services/createOrder"

export type UseCreateOrderReturn = ReturnType<typeof useCreateOrder>

export const useCreateOrder = () => {
  const orderMutation = useMutation({
    mutationKey: ["order"],
    mutationFn: createOrder,
  })

  return orderMutation
}
