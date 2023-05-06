import { CartTotals } from "../CartTotals"
import { CartList } from "../CartList"
import { CartOrderMessages } from "../CartOrderMessages"
import { CartOrderBtn } from "../CartOrderBtn"

export const CartContainer = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 justify-between">
      <section>
        <h2 className="text-2xl">Cart</h2>
        <div data-testid="CartList">
          <CartList />
        </div>
      </section>
      <section className="flex flex-col p-1.5 pt-0 min-w-[27%] max-w-[27%]">
        <h2 className="text-2xl">Totals</h2>

        <CartTotals />
        <CartOrderBtn />
        <CartOrderMessages />
      </section>
    </div>
  )
}
