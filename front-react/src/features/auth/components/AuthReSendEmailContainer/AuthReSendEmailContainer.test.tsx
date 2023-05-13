import { AuthReSendEmailContainer } from "./AuthReSendEmailContainer"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { screen } from "@testing-library/react"
import {
  UseAuthReSendEmailReturn,
  useAuthReSendEmail,
} from "../../hooks/useAuthReSendEmail"

vi.mock("../../hooks/useAuthReSendEmail", () => {
  //
  return {
    useAuthReSendEmail: vi.fn().mockImplementation(() => ({})),
  }
})

function setMockedHookOnce(value: Partial<UseAuthReSendEmailReturn>) {
  vi.mocked(
    useAuthReSendEmail as () => Partial<UseAuthReSendEmailReturn>
  ).mockReturnValueOnce(value)
}

test("renders a message, user should use always the last sent email", () => {
  renderWithProvs(<AuthReSendEmailContainer />)

  screen.getByText(
    /Please use the last email we send you, because the previous ones will be invalid/i
  )
})

test("renders title", () => {
  renderWithProvs(<AuthReSendEmailContainer />)

  screen.getByText(/Enter your email address/i, { selector: "h2" })
})

describe("on initial render", () => {
  //
  test("email input is empty", () => {
    renderWithProvs(<AuthReSendEmailContainer />)

    screen.getByPlaceholderText("your_email@example.com")
  })
  //
  test("email input is type email", () => {
    renderWithProvs(<AuthReSendEmailContainer />)
    const emailInputElm = screen.getByPlaceholderText("your_email@example.com")

    expect(emailInputElm).toHaveAttribute("type", "email")
  })

  test("error message of invalid email format has the invisible class of tailwindcss", async () => {
    renderWithProvs(<AuthReSendEmailContainer />)
    const errorMsg = screen.getByText(/Enter a valid email format/i)

    expect(errorMsg.classList.contains("invisible")).toBe(true)
  })

  test("response message is empty", () => {
    renderWithProvs(<AuthReSendEmailContainer />)
    const responseMsgElm = screen.getByText("", { selector: "p" })

    expect(responseMsgElm).toBeInTheDocument()
  })

  test("submit btn is disabled", () => {
    renderWithProvs(<AuthReSendEmailContainer />)
    const submitBtn = screen.getByText(/send email/i, {
      selector: "button",
    })

    expect(submitBtn).toBeDisabled()
  })

  test("submit btn is type submit", () => {
    renderWithProvs(<AuthReSendEmailContainer />)
    const submitBtn = screen.getByText(/send email/i, {
      selector: "button",
    })

    expect(submitBtn).toHaveAttribute("type", "submit")
  })
})

describe("after entering a valid value to the email input", () => {
  beforeEach(async () => {
    const { userEvent } = renderWithProvs(<AuthReSendEmailContainer />)
    const emailInputElm = screen.getByPlaceholderText("your_email@example.com")

    await userEvent.type(emailInputElm, "user@example.com")
  })

  test("error message of invalid email format has still the invisible class of tailwindcss", () => {
    // renderWithProvs(<AuthReSendEmailContainer />)
    const errorMsg = screen.getByText(/Enter a valid email format/i)

    expect(errorMsg.classList.contains("invisible")).toBe(true)
  })

  test("submit btn becomes enabled", () => {
    // renderWithProvs(<AuthReSendEmailContainer />)
    const submitBtn = screen.getByText(/send email/i, {
      selector: "button",
    })

    expect(submitBtn).toBeEnabled()
  })
})

describe("after entering an invalid value to the email input", () => {
  beforeEach(async () => {
    const { userEvent } = renderWithProvs(<AuthReSendEmailContainer />)
    const emailInputElm = screen.getByPlaceholderText("your_email@example.com")

    await userEvent.type(emailInputElm, "@.")
  })

  test("error message of invalid email format doesn't have the invisible class of tailwindcss", () => {
    // renderWithProvs(<AuthReSendEmailContainer />)
    const errorMsg = screen.getByText(/Enter a valid email format/i)

    expect(errorMsg.classList.contains("invisible")).toBe(false)
  })

  test("submit btn becomes disabled", () => {
    // renderWithProvs(<AuthReSendEmailContainer />)
    const submitBtn = screen.getByText(/send email/i, {
      selector: "button",
    })

    expect(submitBtn).toBeDisabled()
  })
})

//
test("when user clicks the submit button mutate fn is called with the value of the email input ", async () => {
  const EMAIL_ADDRESS = "user@example.com"
  const mockedMutate = vi.fn()
  setMockedHookOnce({ mutate: mockedMutate })

  const { userEvent } = renderWithProvs(<AuthReSendEmailContainer />)

  const submitBtn = screen.getByText<HTMLButtonElement>(/send email/i, {
    selector: "button",
  })

  const emailInputElm = screen.getByPlaceholderText<HTMLInputElement>(
    "your_email@example.com"
  )

  await userEvent.type(emailInputElm, EMAIL_ADDRESS)

  await userEvent.click(submitBtn)

  expect(mockedMutate).toHaveBeenCalledOnce()
  expect(mockedMutate).toHaveBeenCalledWith(EMAIL_ADDRESS)
})

describe("mutation response", () => {
  test("(on status 200) renders a message, the email is already confirmed", async () => {
    setMockedHookOnce({ data: new Response(undefined, { status: 200 }), isSuccess: true })

    renderWithProvs(<AuthReSendEmailContainer />)

    await screen.findByText(/Your email was already confirmed/i, { selector: "p" })
  })

  test("(on status 201) renders a message, server sent the email, user should check the email, and the spam", () => {
    setMockedHookOnce({ data: new Response(undefined, { status: 201 }), isSuccess: true })

    renderWithProvs(<AuthReSendEmailContainer />)

    screen.getByText(
      /We sent you an email with the instructions to confirm your account, check your spam if you can't find it/i,
      { selector: "p" }
    )
  })
  //
  test("(on status 401) renders a message, there is no account with the entered email", () => {
    setMockedHookOnce({ isError: true, error: new Response(undefined, { status: 401 }) })
    renderWithProvs(<AuthReSendEmailContainer />)

    screen.getByText(/There is no account with this email/i, { selector: "p" })
  })
  //
  test("(on status 500) renders a message, something went wrong, try it again", () => {
    setMockedHookOnce({ isError: true, error: new Response(undefined, { status: 500 }) })
    renderWithProvs(<AuthReSendEmailContainer />)

    screen.getByText(/Something went wrong, try it again/i, { selector: "p" })
  })
  //
  test("(on a different error) renders a message, something went wrong, try it again", () => {
    setMockedHookOnce({ isError: true, error: null })
    renderWithProvs(<AuthReSendEmailContainer />)

    screen.getByText(/Something went wrong, try it again/i, { selector: "p" })
  })
})
