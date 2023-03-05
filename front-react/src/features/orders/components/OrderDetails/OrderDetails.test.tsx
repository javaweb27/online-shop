import { screen } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { ordersOneApiDataMock } from "../../mocks/ordersOneApiDataMock"
import { OrderDetails } from "./OrderDetails"

const detailsMock = ordersOneApiDataMock

const selectorHead = "table thead tr th"
const selectorBody = "table tbody tr td"

test("renders titles of details of the order", () => {
  renderWithProvs(<OrderDetails details={detailsMock} />)

  screen.getByText("Order ID", { selector: selectorHead })
  screen.getByText("Street", { selector: selectorHead })
  screen.getByText("Ordered at", { selector: selectorHead })
})

test("renders details of the order", () => {
  renderWithProvs(<OrderDetails details={detailsMock} />)

  const rowsData = [
    ["Order ID", detailsMock._id],
    ["Street", detailsMock.street],
    ["Ordered at", detailsMock.createdAt],
  ]

  for (const [title, desc] of rowsData) {
    screen.getByText(
      (_content, node) => {
        const matchText = `${title}: ${desc}`
        const textContent = node?.textContent

        return matchText === textContent
      },
      { selector: selectorBody }
    )
  }

  // screen.getByText("Order ID" + detailsMock._id, { selector: selectorBody })
  // screen.getByText("Street" + detailsMock.street, { selector: selectorBody })
  // screen.getByText("Ordered at" + detailsMock.createdAt, { selector: selectorBody })
})
