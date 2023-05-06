import { CartContainer } from "../features/cart/components/CartContainer"
import { CartOrderMutationProvider } from "../features/cart/context-state/CartOrderMutationContext"

const Cart = () => {
  return (
    <CartOrderMutationProvider>
      <CartContainer />
    </CartOrderMutationProvider>
  )
}
export default Cart
