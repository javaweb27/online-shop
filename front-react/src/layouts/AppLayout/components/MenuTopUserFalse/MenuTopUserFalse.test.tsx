import { screen } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { MenuTopUserFalse } from "./MenuTopUserFalse"

beforeEach(() => {
  renderWithProvs(<MenuTopUserFalse />)
})

test("renders a log in button with correct href", () => {
  const linkElm = screen.getByText(/log in/i, { selector: "a" })

  expect(linkElm).toHaveAttribute("href", "/login")
})

test("renders a register button with correct href", () => {
  const linkElm = screen.getByText(/register/i, { selector: "a" })

  expect(linkElm).toHaveAttribute("href", "/register")
})
