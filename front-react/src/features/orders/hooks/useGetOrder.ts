import { useQuery } from "@tanstack/react-query"
import { getOrder } from "../services/getOrder"

// type UseGetOrder = typeof useGetOrder

// type UseGetOrderReturn = ReturnType<typeof useGetOrder>

export const useGetOrder = ({ orderId }: { orderId: string }) => {
  const orderQuery = useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => getOrder(orderId),
  })

  return orderQuery
}
