import { screen } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { MenuTopUserTrue } from "./MenuTopUserTrue"

test("renders link to profile with correct href", () => {
  renderWithProvs(<MenuTopUserTrue />)

  const linkElm = screen.getByText(/profile/i)

  expect(linkElm).toHaveAttribute("href", "/profile")
})

test("renders link to user's orders with correct href", () => {
  renderWithProvs(<MenuTopUserTrue />)

  const linkElm = screen.getByText(/my orders/i)

  expect(linkElm).toHaveAttribute("href", "/orders")
})

test("renders icons of user", () => {
  renderWithProvs(<MenuTopUserTrue />)

  screen.getByTestId(/icon-user/i)
  screen.getByTestId(/icon-caretdown/i)
})
