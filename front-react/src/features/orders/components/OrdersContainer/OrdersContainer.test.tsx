import { screen, waitFor } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { OrdersContainer } from "./OrdersContainer"

test("renders title of the page", () => {
  renderWithProvs(<OrdersContainer />)

  screen.getByText(/my orders/i, { selector: "h2" })
})

test("renders a loading text on initial render", () => {
  renderWithProvs(<OrdersContainer />)

  screen.getByText(/loading orders/i)
})

test("stops rendering a loading text after loading", async () => {
  renderWithProvs(<OrdersContainer />)

  await waitFor(() => {
    const loadingTextElm = screen.queryByText(/loading orders/i)
    expect(loadingTextElm).toBeNull()
  })
})

test("renders <OrdersList />", async () => {
  renderWithProvs(<OrdersContainer />)

  await waitFor(() => {
    const loadingTextElm = screen.queryByText(/loading orders/i)
    expect(loadingTextElm).toBeNull()
  })
  console.log("DEBUG")
  console.log("DEBUG")
  console.log("DEBUG")

  screen.debug()
  const OrderListFC = await screen.findByTestId("OrdersList")
  expect(OrderListFC).toBeInTheDocument()
})
