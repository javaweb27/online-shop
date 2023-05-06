import { type Matcher, screen } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { CartOrderMessages } from "./CartOrderMessages"
import { authReduxSliceMock } from "../../../auth/mocks/authReduxSliceMock"
import {
  CartOrderMutationProvider,
  useCartOrderMutation,
} from "../../context-state/CartOrderMutationContext"

import { cartItemsDataMock } from "../../mocks/cartItemsDataMock"
import { UseCreateOrderReturn } from "../../../orders/hooks/useCreateOrder"

vi.mock(
  "../../context-state/CartOrderMutationContext",
  async (importOriginal: () => Promise<() => UseCreateOrderReturn>) => {
    const mod = await importOriginal()
    return {
      ...mod,
      // replace some exports
      useCartOrderMutation: vi.fn(),
    }
  }
)

const getElementByText = (text: Matcher) => {
  const element = screen.getByText(text, {
    selector: `[data-testid=${CartOrderMessages.name}]`,
  })

  expect(element.dataset.testid).toBe(CartOrderMessages.name)

  return element
}

const modifyMockedHookReturnValue = (value: Partial<UseCreateOrderReturn> = {}) => {
  // it is Partial<> because the other values are not used
  vi.mocked(
    useCartOrderMutation as () => Partial<UseCreateOrderReturn>
  ).mockReturnValueOnce(value)
}

describe("when the user is NOT logged in", () => {
  test("renders a message to log in", async () => {
    modifyMockedHookReturnValue()

    renderWithProvs(
      <CartOrderMutationProvider>
        <CartOrderMessages />
      </CartOrderMutationProvider>
      // the user is not logged by default
    )

    getElementByText(/log in to order/i)
  })
})

describe("when the user is logged in", () => {
  const preloadedState = {
    auth: authReduxSliceMock.onTrue.auth,
    cart: { items: cartItemsDataMock },
  }

  test('renders a successful message when the prop "isSuccess" is true', async () => {
    modifyMockedHookReturnValue({ isSuccess: true })

    //
    renderWithProvs(
      <CartOrderMutationProvider>
        <CartOrderMessages />
      </CartOrderMutationProvider>,
      { preloadedState }
    )

    screen.getByText(/Your products were successfully ordered/i)
  })

  test("renders a balance error message when the status is 409 Conflict", async () => {
    modifyMockedHookReturnValue({
      error: new Response(undefined, { status: 409 }),
    })

    //
    renderWithProvs(
      <CartOrderMutationProvider>
        <CartOrderMessages />
      </CartOrderMutationProvider>,
      { preloadedState }
    )

    screen.getByText(/You don't have enough balance/i)
  })

  test("renders an auth error message when the status is 401 Unauthorized", async () => {
    modifyMockedHookReturnValue({
      error: new Response(undefined, { status: 401 }),
    })

    //
    renderWithProvs(
      <CartOrderMutationProvider>
        <CartOrderMessages />
      </CartOrderMutationProvider>,
      { preloadedState }
    )

    getElementByText(/Log in to order/i)
  })

  test("renders an unknown error message for a different status code", async () => {
    modifyMockedHookReturnValue({
      error: new Response(undefined, { status: 500 }),
    })

    //
    renderWithProvs(
      <CartOrderMutationProvider>
        <CartOrderMessages />
      </CartOrderMutationProvider>,
      { preloadedState }
    )

    getElementByText(/Something went wrong/i)
  })

  test("renders an unknown error message in other cases(not Response)", async () => {
    modifyMockedHookReturnValue({
      error: new Error(),
      isError: true,
    })

    //
    renderWithProvs(
      <CartOrderMutationProvider>
        <CartOrderMessages />
      </CartOrderMutationProvider>,
      { preloadedState }
    )

    getElementByText(/Something went wrong/i)
  })
})
