import { AuthReSendEmailContainer } from "./AuthReSendEmailContainer"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { screen } from "@testing-library/react"
import {
  UseAuthReSendEmailReturn,
  useAuthReSendEmail,
} from "../../hooks/useAuthReSendEmail"
import { AuthReSendEmailProvider } from "../../context-state/AuthReSendEmailContext"
import { AuthReSendEmailMessages } from "../AuthReSendEmailMessages"

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
  renderWithProvs(
    <AuthReSendEmailProvider>
      <AuthReSendEmailContainer />
    </AuthReSendEmailProvider>
  )

  screen.getByText(
    /Please use the last email we send you, because the previous ones will be invalid/i
  )
})

test("renders title", () => {
  renderWithProvs(
    <AuthReSendEmailProvider>
      <AuthReSendEmailContainer />
    </AuthReSendEmailProvider>
  )

  screen.getByText(/Enter your email address/i, { selector: "h2" })
})

describe("on initial render", () => {
  //
  test("email input is empty", () => {
    renderWithProvs(
      <AuthReSendEmailProvider>
        <AuthReSendEmailContainer />
      </AuthReSendEmailProvider>
    )

    screen.getByPlaceholderText("your_email@example.com")
  })
  //
  test("email input is type email", () => {
    renderWithProvs(
      <AuthReSendEmailProvider>
        <AuthReSendEmailContainer />
      </AuthReSendEmailProvider>
    )
    const emailInputElm = screen.getByPlaceholderText("your_email@example.com")

    expect(emailInputElm).toHaveAttribute("type", "email")
  })

  test("error message of invalid email format has the invisible class of tailwindcss", async () => {
    renderWithProvs(
      <AuthReSendEmailProvider>
        <AuthReSendEmailContainer />
      </AuthReSendEmailProvider>
    )
    const errorMsg = screen.getByText(/Enter a valid email format/i)

    expect(errorMsg.classList.contains("invisible")).toBe(true)
  })

  test("response message is empty", () => {
    renderWithProvs(
      <AuthReSendEmailProvider>
        <AuthReSendEmailContainer />
      </AuthReSendEmailProvider>
    )
    const responseMsgElm = screen.getByText("", { selector: "p" })

    expect(responseMsgElm).toBeInTheDocument()
  })

  test("submit btn is disabled", () => {
    renderWithProvs(
      <AuthReSendEmailProvider>
        <AuthReSendEmailContainer />
      </AuthReSendEmailProvider>
    )
    const submitBtn = screen.getByText(/send email/i, {
      selector: "button",
    })

    expect(submitBtn).toBeDisabled()
  })

  test("submit btn is type submit", () => {
    renderWithProvs(
      <AuthReSendEmailProvider>
        <AuthReSendEmailContainer />
      </AuthReSendEmailProvider>
    )
    const submitBtn = screen.getByText(/send email/i, {
      selector: "button",
    })

    expect(submitBtn).toHaveAttribute("type", "submit")
  })
})

describe("after entering a valid value to the email input", () => {
  beforeEach(async () => {
    const { userEvent } = renderWithProvs(
      <AuthReSendEmailProvider>
        <AuthReSendEmailContainer />
      </AuthReSendEmailProvider>
    )
    const emailInputElm = screen.getByPlaceholderText("your_email@example.com")

    await userEvent.type(emailInputElm, "user@example.com")
  })

  test("error message of invalid email format has still the invisible class of tailwindcss", () => {
    const errorMsg = screen.getByText(/Enter a valid email format/i)

    expect(errorMsg.classList.contains("invisible")).toBe(true)
  })

  test("submit btn becomes enabled", () => {
    const submitBtn = screen.getByText(/send email/i, {
      selector: "button",
    })

    expect(submitBtn).toBeEnabled()
  })
})

describe("after entering an invalid value to the email input", () => {
  beforeEach(async () => {
    const { userEvent } = renderWithProvs(
      <AuthReSendEmailProvider>
        <AuthReSendEmailContainer />
      </AuthReSendEmailProvider>
    )
    const emailInputElm = screen.getByPlaceholderText("your_email@example.com")

    await userEvent.type(emailInputElm, "@.")
  })

  test("error message of invalid email format doesn't have the invisible class of tailwindcss", () => {
    const errorMsg = screen.getByText(/Enter a valid email format/i)

    expect(errorMsg.classList.contains("invisible")).toBe(false)
  })

  test("submit btn becomes disabled", () => {
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

  const { userEvent } = renderWithProvs(
    <AuthReSendEmailProvider>
      <AuthReSendEmailContainer />
    </AuthReSendEmailProvider>
  )

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

test(`render <AuthReSendEmailMessages /> (response messages)`, () => {
  renderWithProvs(
    <AuthReSendEmailProvider>
      <AuthReSendEmailContainer />
    </AuthReSendEmailProvider>
  )

  const msgElm = screen.getByTestId(AuthReSendEmailMessages.name)

  expect(msgElm.tagName).toBe("P")
})
