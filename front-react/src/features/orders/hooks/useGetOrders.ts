import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../services/getOrders"

// type UseGetOrdersReturn = ReturnType<typeof useGetOrder>

export const useGetOrders = () => {
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  })

  return ordersQuery
}
