import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { cartItemsDataMock } from "../../mocks/cartItemsDataMock"
import { CartList } from "./CartList"

describe("on empty cart", () => {
  test("renders a message for an empty cart", () => {
    renderWithProvs(<CartList />)

    screen.getByText(/You don't have any product in the cart/i)
  })
})

describe("on cart with items", () => {
  beforeEach(() => {
    renderWithProvs(<CartList />, {
      preloadedState: { cart: { items: cartItemsDataMock } },
    })
  })

  test("doesn't render the message for an empty cart", () => {
    const emptyCartMsgElm = screen.queryByText(/You don't have any product in the cart/i)
    expect(emptyCartMsgElm).not.toBeInTheDocument()
  })

  test("renders title", () => {
    for (const item of cartItemsDataMock) {
      screen.getByText(new RegExp(item.title, "i"))
    }
  })

  test("renders image with its correct src attr", () => {
    for (const item of cartItemsDataMock) {
      const imgElm = screen.getByAltText(new RegExp(item.title, "i"))

      expect(imgElm).toHaveAttribute("src", item.imgSrc)
    }
  })

  test("renders quantity", () => {
    for (const item of cartItemsDataMock) {
      screen.getByText(
        (__content, node) => {
          return node!.textContent === `${item.qty}x`
        },
        { selector: "td" }
      )
    }
  })

  test("renders price x quantity", () => {
    for (const item of cartItemsDataMock) {
      screen.getByText(
        (__content, node) => {
          return node!.textContent === `${item.price * item.qty} $`
        },
        { selector: "td" }
      )
    }
  })

  test("when click in minus button when quantity is 1, removes the product from cart", async () => {
    // first item is qty 1, price 1
    const [product] = cartItemsDataMock

    const inProduct = within(screen.getByText(product.title).closest("tr")!)

    const incQtyBtnElm = inProduct.getByTestId("icon-dec-qty").closest("button")

    await userEvent.click(incQtyBtnElm!)

    const removedProduct = screen.queryByText(product.title, { selector: "tr td span" })

    expect(removedProduct).not.toBeInTheDocument()
  })

  test("when click in X button, removes the product from cart no matter its quantity", async () => {
    // third item is qty 3, price 3
    const [, , thirdItem] = cartItemsDataMock

    const inThirdItem = within(screen.getByText(thirdItem.title).closest("tr")!)

    const removeBtnElm = inThirdItem.getByTestId("icon-remove").closest("button")

    await userEvent.click(removeBtnElm!)

    const removedProduct = screen.queryByText(thirdItem.title, { selector: "tr td span" })

    expect(removedProduct).not.toBeInTheDocument()
  })
})
