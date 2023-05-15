import { Matcher, screen } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { AuthReSendEmailProvider } from "../../context-state/AuthReSendEmailContext"
import {
  UseAuthReSendEmailReturn,
  useAuthReSendEmail,
} from "../../hooks/useAuthReSendEmail"
import { AuthReSendEmailMessages } from "./AuthReSendEmailMessages"

vi.mock("../../hooks/useAuthReSendEmail", async importOriginal => {
  const mod: any = await importOriginal()
  return {
    ...mod,
    useAuthReSendEmail: vi.fn().mockImplementation(() => ({})),
  }
})

function setMockedHookOnce(value: Partial<UseAuthReSendEmailReturn>) {
  const mocked = vi.mocked(useAuthReSendEmail as () => Partial<UseAuthReSendEmailReturn>)

  mocked.mockReturnValueOnce(value)
}
function renderComponent() {
  renderWithProvs(
    <AuthReSendEmailProvider>
      <AuthReSendEmailMessages />
    </AuthReSendEmailProvider>
  )
}

const getElementByText = (text: Matcher) => {
  const element = screen.getByText(text, {
    selector: "p",
  })

  expect(element.dataset.testid).toBe(AuthReSendEmailMessages.name)

  expect(element.tagName).toBe("P")

  return element
}

test("(on status 200) renders a message, the email was already confirmed", () => {
  setMockedHookOnce({ data: new Response(undefined, { status: 200 }), isSuccess: true })
  renderComponent()

  getElementByText(/Your email was already confirmed/i)
})

test("(on status 201) renders a message, server sent the email, user should check the email, and the spam", () => {
  setMockedHookOnce({
    data: new Response(undefined, { status: 201 }),
    isSuccess: true,
  })
  renderComponent()

  getElementByText(
    /We sent you an email with the instructions to confirm your account, check your spam if you can't find it/i
  )
})

test("(on status 401) renders a message, there is no account with the entered email", () => {
  setMockedHookOnce({ isError: true, error: new Response(undefined, { status: 401 }) })

  renderComponent()

  getElementByText(/There is no account with this email/i)
})

test("(on status 500) renders a message, something went wrong, try it again", () => {
  setMockedHookOnce({ isError: true, error: new Response(undefined, { status: 500 }) })
  renderComponent()

  getElementByText(/Something went wrong, try it again/i)
})
//
test("(on a different error) renders a message, something went wrong, try it again", () => {
  setMockedHookOnce({ isError: true, error: null })
  renderComponent()

  getElementByText(/Something went wrong, try it again/i)
})
