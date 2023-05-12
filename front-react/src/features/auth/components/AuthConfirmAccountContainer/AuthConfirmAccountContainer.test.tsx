import {
  UseConfirmEmailReturn,
  useConfirmEmail,
} from "../../../confirm-email/hooks/useConfirmEmail"

import { AuthConfirmAccountContainer } from "./AuthConfirmAccountContainer"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { screen } from "@testing-library/react"

vi.mock(
  "../../../confirm-email/hooks/useConfirmEmail",
  async (importOriginal: () => Promise<() => UseConfirmEmailReturn>) => {
    const mod = await importOriginal()
    return {
      ...mod,
      // replace some exports
      useConfirmEmail: vi.fn(),
    }
  }
)

const modifyMockedHookReturnValue = (value: Partial<UseConfirmEmailReturn> = {}) => {
  // it is Partial<> because the other values are not used
  const mockedMutate = vi.fn()
  vi.mocked(useConfirmEmail as () => Partial<UseConfirmEmailReturn>).mockReturnValueOnce({
    mutate: mockedMutate,
    ...value,
  })
  return { mockedMutate }
}

describe("initially", () => {
  test("mutate func is called", () => {
    const { mockedMutate } = modifyMockedHookReturnValue({ isLoading: true })
    renderWithProvs(<AuthConfirmAccountContainer />)

    expect(mockedMutate).toHaveBeenCalledOnce()
  })
  test("renders a title, loading", () => {
    modifyMockedHookReturnValue({ isLoading: true })
    renderWithProvs(<AuthConfirmAccountContainer />)

    screen.getByText(/Confirming your account/i, { selector: "h2" })
  })
  test("renders a icon that is loading", () => {
    modifyMockedHookReturnValue({ isLoading: true })
    renderWithProvs(<AuthConfirmAccountContainer />)

    const svgElm = screen.getByTestId("icon-loading")

    expect(svgElm).toHaveAttribute("class", "text-4xl animate-spin")
  })
})

describe("when the account was confirmed", () => {
  beforeEach(() => {
    modifyMockedHookReturnValue({
      data: new Response(undefined, { status: 204 }),
      isSuccess: true,
    })

    renderWithProvs(<AuthConfirmAccountContainer />)
  })

  test("renders title", () => {
    screen.getByText(/Your account was confirmed successfully/i, { selector: "h2" })
  })
  test("renders a message, user can order products", () => {
    screen.getByText(/Now you can to order products/i, { selector: "p" })
  })
  test("renders a link to go to the login page", () => {
    const linkElm = screen.getByText(/Log in/i, { selector: "a" })

    expect(linkElm).toHaveAttribute("href", "/login")
  })
})

describe("when there was an error with the token", () => {
  test("renders title", () => {
    modifyMockedHookReturnValue({
      error: new Response(undefined, { status: 401 }),
      isError: true,
    })
    renderWithProvs(<AuthConfirmAccountContainer />)
    screen.getByText(/Error when confirming your account/i, { selector: "h2" })
  })
  test("renders a message, invalid or expired token", () => {
    // invalid or expired token
    // user ID doesn't exist in DB
    // the token is different
    modifyMockedHookReturnValue({
      error: new Response(undefined, { status: 401 }),
      isError: true,
    })
    renderWithProvs(<AuthConfirmAccountContainer />)

    screen.getByText(/Your link expired or it is invalid/i)
  })
})

describe("when there was a server error, status 500", () => {
  test("renders title", () => {
    modifyMockedHookReturnValue({
      error: new Response(undefined, { status: 500 }),
      isError: true,
    })
    renderWithProvs(<AuthConfirmAccountContainer />)

    screen.getByText(/Something went wrong/i, { selector: "h2" })
  })
  test("renders a message, try it again by reloading the page", () => {
    modifyMockedHookReturnValue({
      error: new Response(undefined, { status: 500 }),
      isError: true,
    })
    renderWithProvs(<AuthConfirmAccountContainer />)

    screen.getByText(/Try it again by reloading the page/i)
  })
})

describe("when there was another error", () => {
  test("renders title", () => {
    modifyMockedHookReturnValue({
      error: null,
      isError: true,
    })
    renderWithProvs(<AuthConfirmAccountContainer />)

    screen.getByText(/Something went wrong/i, { selector: "h2" })
  })
  test("renders a message, try it again by reloading the page", () => {
    modifyMockedHookReturnValue({
      error: null,
      isError: true,
    })
    renderWithProvs(<AuthConfirmAccountContainer />)

    screen.getByText(/Try it again by reloading the page/i)
  })
})
