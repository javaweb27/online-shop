import { screen } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { CartTotals } from "./CartTotals"
import { cartItemsDataMock } from "../../mocks/cartItemsDataMock"

describe("when the cart is empty", () => {
  //
  test("renders the total quantity and the total price, both as 0", () => {
    renderWithProvs(<CartTotals />)

    screen.getByText(/Total price: 0/i)
    screen.getByText(/Total quantity: 0/i)
  })
})
describe("when the cart has items", () => {
  beforeEach(() => {
    renderWithProvs(<CartTotals />, {
      preloadedState: { cart: { items: cartItemsDataMock } },
      // user is not logged in by default (initial state, redux store auth)
    })
  })

  test("total quantity of the cart is correctly calculated", () => {
    /**
     * quantity item 1: 1
     *
     * quantity item 2: 2
     *
     * quantity item 2: 3
     */
    const totalQuantity = cartItemsDataMock.reduce((cv, item) => {
      return cv + item.qty
    }, 0)

    expect(totalQuantity).toBe(1 + 2 + 3)

    screen.getByText(new RegExp(`Total quantity: ${totalQuantity}`, "i"))
  })

  test("total price of the cart is correctly calculated", () => {
    /**
     * total price of one product is qty * price
     *
     * price item 1: 1 (1*1)
     *
     * price item 2: 4 (2*2)
     *
     * price item 3: 9 (3*3)
     */
    const totalPrice = cartItemsDataMock.reduce((cv, item) => {
      const totalOfOne = item.price * item.qty

      return totalOfOne + cv
    }, 0)

    expect(totalPrice).toBe(1 + 4 + 9)

    screen.getByText(new RegExp(`Total price: ${totalPrice}`, "i"))
  })
})
