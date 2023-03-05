import { screen, within } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { ordersOneApiDataMock } from "../../mocks/ordersOneApiDataMock"
import { OrderProductsList } from "./OrderProductsList"

const { products: productsMock } = ordersOneApiDataMock

test("renders titles of ordered products", () => {
  renderWithProvs(<OrderProductsList products={productsMock} />)

  const titles = ["Image", "Product", "Quantity", "Total price"]
  for (const title of titles) {
    screen.getByText(title, { selector: "table thead tr th" })
  }
})

test("renders ordered products", () => {
  renderWithProvs(<OrderProductsList products={productsMock} />)

  for (const prod of productsMock) {
    //_id and category are not showed to the user

    const productElm = screen.getByText(prod.title).closest("tr") //table row

    const inProductElm = within(productElm!)

    const imgElm = inProductElm.getByAltText<HTMLImageElement>(prod.title)

    expect(imgElm).toHaveAttribute("src", prod.imgSrc)

    inProductElm.getByText(prod.title)

    inProductElm.getByText(prod.quantity + "x")

    // price x quantity
    inProductElm.getByText(prod.price * prod.quantity + " $")
  }
})

const orderTotals = productsMock.reduce(
  (cv, item) => {
    cv.quantity += item.quantity
    cv.price += item.quantity * item.price

    return cv
  },
  { price: 0, quantity: 0 }
)

test("renders total quantity of the order", () => {
  renderWithProvs(<OrderProductsList products={productsMock} />)

  screen.getByText(
    (_content, node) => {
      const matchText = `Quantity: ${orderTotals.quantity} in total`

      return node?.textContent === matchText
    },
    { selector: "tfoot tr td" }
  )
})
test("renders total price of the order", () => {
  renderWithProvs(<OrderProductsList products={productsMock} />)

  screen.getByText((_content, node) => {
    const matchText = `Total price: ${orderTotals.price} $ in total`
    return node?.textContent === matchText
  })
})
