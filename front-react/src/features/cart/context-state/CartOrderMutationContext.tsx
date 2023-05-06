import { createContext, useContext } from "react"
import { UseCreateOrderReturn, useCreateOrder } from "../../orders/hooks/useCreateOrder"

const CartOrderMutationContext = createContext(undefined! as UseCreateOrderReturn)

interface CartOrderMutationProviderProps {
  children: React.ReactNode
}

export const CartOrderMutationProvider = ({
  children,
}: CartOrderMutationProviderProps) => {
  //
  const mutation = useCreateOrder()
  return (
    <CartOrderMutationContext.Provider value={mutation}>
      {children}
    </CartOrderMutationContext.Provider>
  )
}

export const useCartOrderMutation = () => {
  return useContext(CartOrderMutationContext)
}
