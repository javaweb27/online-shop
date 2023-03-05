import { screen } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { ordersApiDataMock } from "../../mocks/ordersApiDataMock"
import { OrdersList } from "./OrdersList"

test('renders title of the order inside a "a" tag', () => {
  renderWithProvs(<OrdersList orders={ordersApiDataMock.orders} />)

  ordersApiDataMock.orders.forEach(order => {
    const productsCount = order.productsObjIds.length
    screen.getByText(`${productsCount} product(s) ordered - ${order.street}`, {
      selector: "a div",
    })
  })
})

test('renders date of the order inside a "a" tag', () => {
  renderWithProvs(<OrdersList orders={ordersApiDataMock.orders} />)

  ordersApiDataMock.orders.forEach(order => {
    screen.getByText(order.createdAt, {
      selector: "a div",
    })
  })
})
