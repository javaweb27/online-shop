import { screen } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { AuthFormSubmitBtn } from "./AuthFormSubmitBtn"

const textBtn = "text-" + Date.now()

test("renders the disabled button with text from its props", () => {
  renderWithProvs(<AuthFormSubmitBtn disabled={true} submitBtnText={textBtn} />)

  const btnElm = screen.getByText(textBtn, { selector: "button" })

  expect(btnElm).toBeDisabled()
})

test("the button can be enabled from its props", () => {
  renderWithProvs(<AuthFormSubmitBtn disabled={false} submitBtnText={textBtn} />)

  const btnElm = screen.getByText(textBtn, { selector: "button" })

  expect(btnElm).not.toBeDisabled()
})

test('the button is a "submit" button', () => {
  renderWithProvs(<AuthFormSubmitBtn disabled={false} submitBtnText={textBtn} />)
  const submitBtnElm = screen.getByText<HTMLButtonElement>(textBtn, {
    selector: "button",
  })

  expect(submitBtnElm.type).toBe("submit")
})
