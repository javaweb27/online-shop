import { AuthAccountRegisteredContainer } from "./AuthAccountRegisteredContainer"
import { screen } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"

test("renders title", () => {
  renderWithProvs(<AuthAccountRegisteredContainer />)
  screen.getByText(/Please confirm your account/i, { selector: "h2" })
})

test("renders a message, an email to confirm the account was sent", () => {
  renderWithProvs(<AuthAccountRegisteredContainer />)
  screen.getByText(/We sent you an email with the instructions to confirm your account./i)
})

test("renders a message, asks the user if the email was not sent", () => {
  renderWithProvs(<AuthAccountRegisteredContainer />)
  const message = "didn't you receive the email?"

  screen.getByText(new RegExp(message, "i"))
})

test("renders a message, the user must check the spam or re-send email", () => {
  renderWithProvs(<AuthAccountRegisteredContainer />)
  const message = "check your spam or re-send email."

  screen.getByText((_, node) => {
    return message === node?.textContent
  })
})

test('renders a link that redirect to a page to "re-send-email" with the correct href', () => {
  renderWithProvs(<AuthAccountRegisteredContainer />)

  const linkElm = screen.getByText("re-send email", { selector: "a" })

  expect(linkElm).toHaveAttribute("href", "/re-send-email")
})

test("renders a message, the user can log in", () => {
  renderWithProvs(<AuthAccountRegisteredContainer />)

  screen.getByText((_, node) => {
    return node?.textContent === "You can log in."
  })
})

test("renders a link to go to the login page with the correct href", () => {
  renderWithProvs(<AuthAccountRegisteredContainer />)

  const linkElm = screen.getByText("log in", { selector: "a" })

  expect(linkElm).toHaveAttribute("href", "/login")
})

test("renders a message, to order products the account must be confirmed", () => {
  renderWithProvs(<AuthAccountRegisteredContainer />)

  screen.getByText(/But your account must be confirmed to order products./i)
})
