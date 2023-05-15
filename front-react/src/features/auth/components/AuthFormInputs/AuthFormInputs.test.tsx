import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { AuthFormInputs } from "./AuthFormInputs"
import { AuthFormInputsData } from "./AuthFormInputsData"

describe("on inputs with empty values", () => {
  beforeEach(() => {
    renderWithProvs(<AuthFormInputs />)
  })

  test("renders inputs with empty value", () => {
    AuthFormInputsData.forEach(([__inputProps, labelText]) => {
      const inputElm = screen.getByLabelText<HTMLInputElement>(labelText)
      expect(inputElm.value.length).toBe(0)
    })
  })

  test("form inputs can change their values", async () => {
    const inputValue = "user@email.123"

    for (const [__inputProps, labelText] of AuthFormInputsData) {
      const inputElm = screen.getByLabelText<HTMLInputElement>(labelText)

      await userEvent.type(inputElm, inputValue)

      expect(inputElm.value).toBe(inputValue)
    }
  })

  test("renders button with icons that hides and shows the password", () => {
    const hideBtnElm = screen.getByTestId<HTMLButtonElement>("hide-btn")

    expect(hideBtnElm.type).toBe("button")
  })

  test('renders icon to show with password input as "password"', () => {
    const showIconElm = screen.getByTestId<HTMLButtonElement>("show")
    const hideIconElm = screen.queryByTestId<HTMLButtonElement>("hide")

    const passwInputElm = screen.getByLabelText<HTMLInputElement>("Password")

    expect(showIconElm).toBeInTheDocument()
    expect(hideIconElm).not.toBeInTheDocument()
    expect(passwInputElm.type).toBe("password")
  })

  test("password input can show and hide its value", async () => {
    const hideBtnElm = screen.getByTestId<HTMLButtonElement>("hide-btn")
    // showing password
    await userEvent.click(hideBtnElm)

    // visible password
    let showIconElm = screen.queryByTestId("show")
    let hideIconElm: HTMLElement | null = screen.getByTestId("hide")
    let passwInputElm = screen.getByLabelText<HTMLInputElement>("Password")

    expect(showIconElm).not.toBeInTheDocument()
    expect(hideIconElm).toBeInTheDocument()
    expect(passwInputElm.type).toBe("text")

    // hidding password
    await userEvent.click(hideBtnElm)

    showIconElm = screen.getByTestId("show")
    hideIconElm = screen.queryByTestId("hide")
    passwInputElm = screen.getByLabelText<HTMLInputElement>("Password")

    // hidden password
    expect(showIconElm).toBeInTheDocument()
    expect(hideIconElm).not.toBeInTheDocument()
    expect(passwInputElm.type).toBe("password")
  })
})
