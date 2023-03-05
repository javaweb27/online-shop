import { screen } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { CartContainer } from "./CartContainer"

test("renders cart title", () => {
  renderWithProvs(<CartContainer />)
  screen.getByText("Cart", { selector: "h2" })
})

test("renders cart totals title", () => {
  renderWithProvs(<CartContainer />)
  screen.getByText("Totals", { selector: "h2" })
})
test("renders cart title", () => {
  renderWithProvs(<CartContainer />)
  screen.getByText("Cart", { selector: "h2" })
})

test("renders <CartList />", () => {
  renderWithProvs(<CartContainer />)
  screen.getByTestId("CartList")
})

test("renders <CartTotals />", () => {
  renderWithProvs(<CartContainer />)
  screen.getByTestId("CartTotals")
})
