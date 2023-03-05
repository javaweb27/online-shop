import { screen } from "@testing-library/react"
import { cartItemsDataMock } from "../../../../features/cart/mocks/cartItemsDataMock"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { MenuTopLinks } from "./MenuTopLinks"

test("renders link to products with correct href", () => {
  renderWithProvs(<MenuTopLinks />)

  const linkElm = screen.getByText("Products", { selector: "a" })

  expect(linkElm).toHaveAttribute("href", "/products")
})

test("renders link to cart with correct href", () => {
  renderWithProvs(<MenuTopLinks />)

  const linkElm = screen.getByText("Cart", { selector: "a" })

  expect(linkElm).toHaveAttribute("href", "/cart")
})

test("renders counter for empty cart next to the link to cart", () => {
  renderWithProvs(<MenuTopLinks />)

  screen.getByText(0, { selector: "a + span" })
})

test("renders counter for cart with items next to the link to cart", () => {
  renderWithProvs(<MenuTopLinks />, {
    preloadedState: {
      cart: {
        items: cartItemsDataMock,
      },
    },
  })

  const cartQuanity = cartItemsDataMock.reduce((cv, item) => {
    return cv + item.qty
  }, 0) // cartQuanity results in 6

  screen.getByText(cartQuanity, { selector: "a + span" })
})
