import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { NODE_API } from "../../../../config"
import { server } from "../../../../mocks/server"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { authReduxSliceMock } from "../../../auth/mocks/authReduxSliceMock"
import { cartItemsDataMock } from "../../mocks/cartItemsDataMock"
import { CartList } from "../CartList"
import { CartTotals } from "./CartTotals"

describe("on empty cart", () => {
  beforeEach(() => {
    renderWithProvs(<CartTotals />)
  })

  test("renders totals of quantity and price as 0", () => {
    screen.getByText(/Total price: 0/i)
    screen.getByText(/Total quantity: 0/i)
  })

  test("order button is disabled", () => {
    const orderBtnElm = screen.getByText(/Order now/i)

    expect(orderBtnElm).toBeDisabled()
  })
})

describe("on cart with items", () => {
  let resultWithProvs: ReturnType<typeof renderWithProvs>

  beforeEach(() => {
    const result = renderWithProvs(
      <>
        <CartTotals />
        <CartList />
      </>,
      {
        preloadedState: { cart: { items: cartItemsDataMock } },
        // user is not logged in by default (initial state, redux store auth)
      }
    )

    resultWithProvs = result
  })

  test("total quantity of the cart is correctly calculated", () => {
    const totalQuantity = cartItemsDataMock.reduce((cv, item) => {
      return cv + item.qty
    }, 0)

    screen.getByText(new RegExp(`Total quantity: ${totalQuantity}`, "i"))
  })

  test("total price of the cart is correctly calculated", () => {
    // total price of one product
    // is qty * price
    const totalPrice = cartItemsDataMock.reduce((cv, item) => {
      const totalOfOne = item.price * item.qty

      return totalOfOne + cv
    }, 0)

    screen.getByText(new RegExp(`Total price: ${totalPrice}`, "i"))
  })

  test("when user isn't logged in, order button is still disabled even if there are items in cart", () => {
    const orderBtnElm = screen.getByText(/Order now/i)

    expect(orderBtnElm).toBeDisabled()
  })

  test("when click in plus button, increments quantity and updates the totals", async () => {
    // first item is qty 1, price 1
    const [firstItem] = cartItemsDataMock

    const firstItemElm = screen.getByText(firstItem.title).closest("tr")

    const inFirstItemElm = within(firstItemElm!)

    const incQtyBtnElm = inFirstItemElm.getByTestId("icon-inc-qty").closest("button")

    //
    // times: 1
    //
    await userEvent.click(incQtyBtnElm!)
    // quantity of product
    inFirstItemElm.getByText("2x")

    // cart totals, initially: qty is 6, and price is 14
    screen.getByText(/Total quantity: 7/i) // 6 + 1
    screen.getByText(/Total price: 15/i) // 14 + 1

    //
    // times: 2
    //
    await userEvent.click(incQtyBtnElm!)

    // quantity of product
    inFirstItemElm.getByText("3x")

    // cart totals, initially: qty is 6, and price is 14
    screen.getByText(/Total quantity: 8/i) // 6 + 2
    screen.getByText(/Total price: 16/i) // 14 + 2
  })

  test("when click in minus button, decrements quantity and updates the totals, and product is removed when qty is 1", async () => {
    // second item is qty 2, price 2
    const [, secondItem] = cartItemsDataMock

    const secondItemElm = screen.getByText(secondItem.title).closest("tr")

    const inSecondItemElm = within(secondItemElm!)

    const decQtyBtnElm = inSecondItemElm.getByTestId("icon-dec-qty").closest("button")

    //
    // times: 1
    //
    await userEvent.click(decQtyBtnElm!)
    // quantity of product
    inSecondItemElm.getByText("1x")

    // cart totals, initially: qty is 6, and price is 14
    screen.getByText(/Total quantity: 5/i) // 6 - 1
    screen.getByText(/Total price: 12/i) // 14 + 2

    //
    // times: 2 (product is removed)
    //
    await userEvent.click(decQtyBtnElm!)

    // quantity of product (the product was removed)
    expect(inSecondItemElm.queryByText("3x")).not.toBeInTheDocument()

    // cart totals, initially: qty is 6, and price is 14
    screen.getByText(/Total quantity: 4/i) // 6 + 2
    screen.getByText(/Total price: 10/i) // 14 + 4
    //
  })

  test("when click in X button, removes the product from cart no matter its quantity, and updates totals of cart", async () => {
    // third item is qty 3, price 3
    const [, , thirdItem] = cartItemsDataMock

    const inThirdItem = within(screen.getByText(thirdItem.title).closest("tr")!)

    const removeBtnElm = inThirdItem.getByTestId("icon-remove").closest("button")

    await userEvent.click(removeBtnElm!)

    // cart totals, initially: qty is 6, and price is 14
    screen.getByText(/Total quantity: 3/i) // 6 - 3
    screen.getByText(/Total price: 5/i) // 14 - 9
  })

  describe("on user is logged in (cart isn't empty)", () => {
    beforeEach(() => {
      resultWithProvs.unmount()
      renderWithProvs(<CartTotals />, {
        preloadedState: {
          cart: { items: cartItemsDataMock },
          auth: authReduxSliceMock.onTrue.auth,
        },
      })
    })

    test("order button is now enabled", () => {
      const orderBtnElm = screen.getByText(/Order now/i)

      expect(orderBtnElm).not.toBeDisabled()
    })

    test("order button calls fetch to the API", () => {
      return new Promise(async done => {
        server.use(
          rest.post(`${NODE_API}/orders`, (cli, res, ctx) => {
            console.log("click ordering")

            done(undefined)
            return res(ctx.status(201), ctx.json({ authToken: "why auth token?" }))
          })
        )

        const orderBtnElm = screen.getByText(/Order now/i)

        await userEvent.click(orderBtnElm)

        expect(orderBtnElm).not.toBeDisabled()
      })
    })

    test("order button calls fetch to the API", () => {
      return new Promise(async done => {
        server.use(
          rest.post(`${NODE_API}/orders`, (cli, res, ctx) => {
            console.log("click ordering")

            done(undefined)
            return res(ctx.status(201), ctx.json({ authToken: "why auth token?" }))
          })
        )

        const orderBtnElm = screen.getByText(/Order now/i)

        await userEvent.click(orderBtnElm)

        expect(orderBtnElm).not.toBeDisabled()
      })
    })
  })
})
