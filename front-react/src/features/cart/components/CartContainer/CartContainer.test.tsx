import { screen } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { CartContainer } from "./CartContainer"
import { CartTotals } from "../CartTotals"
import { CartOrderMessages } from "../CartOrderMessages"
import { CartOrderMutationProvider } from "../../context-state/CartOrderMutationContext"

beforeEach(() => {
  renderWithProvs(
    <CartOrderMutationProvider>
      <CartContainer />
    </CartOrderMutationProvider>
  )
})

test("renders cart title", () => {
  screen.getByText("Cart", { selector: "h2" })
})

test("renders cart totals title", () => {
  screen.getByText("Totals", { selector: "h2" })
})
test("renders cart title", () => {
  screen.getByText("Cart", { selector: "h2" })
})

test("renders <CartList />", () => {
  screen.getByTestId("CartList")
})

test("renders <CartTotals />", () => {
  screen.getByTestId(CartTotals.name)
})

test("renders <CartOrderBtn />", () => {
  screen.getByText(/Order now/i, { selector: "button" })
})

test("renders <CartOrderMessages />", () => {
  screen.getByTestId(CartOrderMessages.name)
})
