import { act, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { NODE_API } from "../../../../config"
import { server } from "../../../../mocks/server"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { authReduxSliceMock } from "../../../auth/mocks/authReduxSliceMock"
import { cartItemsDataMock } from "../../mocks/cartItemsDataMock"
import { CartOrderBtn } from "./CartOrderBtn"
import { CartOrderMutationProvider } from "../../context-state/CartOrderMutationContext"

describe("when the cart is empty, no matter if the user is logged in or not", () => {
  beforeEach(() => {
    renderWithProvs(<CartOrderBtn />)
  })

  test("order button is disabled", () => {
    const orderBtnElm = screen.getByText(/Order now/i, { selector: "button" })

    expect(orderBtnElm).toBeDisabled()
  })
})

describe("when the cart has items, and the user is logged in", () => {
  beforeEach(() => {
    renderWithProvs(
      <CartOrderMutationProvider>
        <CartOrderBtn />
      </CartOrderMutationProvider>,
      {
        preloadedState: {
          cart: { items: cartItemsDataMock },
          auth: authReduxSliceMock.onTrue.auth,
        },
      }
    )
  })

  test("order button is enabled", () => {
    const orderBtnElm = screen.getByText(/Order now/i, { selector: "button" })

    expect(orderBtnElm).not.toBeDisabled()
  })

  test("order button calls fetch to the API", () => {
    return new Promise(async done => {
      server.use(
        rest.post(`${NODE_API}/orders`, (cli, res, ctx) => {
          console.log("api endpoint triggered")

          done(undefined)

          return res(
            ctx.status(201),
            ctx.json({ message: "this message isn't being used" })
          )
        })
      )

      const userEvs = userEvent.setup()

      const orderBtnElm = screen.getByText(/Order now/i, { selector: "button" })

      expect(orderBtnElm).not.toBeDisabled()

      await act(async () => {
        await userEvs.click(orderBtnElm)
      })
    })
  })
})

describe("when the cart has items, and the user is NOT logged in", () => {
  beforeEach(() => {
    renderWithProvs(<CartOrderBtn />, {
      preloadedState: {
        cart: { items: cartItemsDataMock },
        auth: authReduxSliceMock.onFalse.auth,
      },
    })
  })

  test("order button is disabled", async () => {
    const orderBtnElm = await screen.findByText(/Order now/i, { selector: "button" })

    expect(orderBtnElm).toBeDisabled()
  })
})
