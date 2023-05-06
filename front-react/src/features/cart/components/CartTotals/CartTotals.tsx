import { useCartItemsTotals } from "../../hooks/useCartItemsTotals"

export const CartTotals = () => {
  const { totalPrice, totalQty } = useCartItemsTotals()

  return (
    <div data-testid={CartTotals.name}>
      <span>Total price: {totalPrice}</span>
      <br />
      <span>Total quantity: {totalQty}</span>
    </div>
  )
}
