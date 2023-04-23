import { screen } from "@testing-library/react"
import { rest } from "msw"
import userEvent from "@testing-library/user-event"
import { NODE_API } from "../../../../config"
import { server } from "../../../../mocks/server"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { AuthRegisterContainer } from "./AuthRegisterContainer"

test("renders title", () => {
  renderWithProvs(<AuthRegisterContainer />)
  screen.getByText("Create account", { selector: "h1" })
})

test("renders submit button", () => {
  renderWithProvs(<AuthRegisterContainer />)
  screen.getByText("Register", { selector: "button" })
})

test("renders a message to redirect to Register page", () => {
  renderWithProvs(<AuthRegisterContainer />)
  screen.getByText(/Already have an account?/i)
})

test("renders a link to redirect to Register page with correct href", () => {
  renderWithProvs(<AuthRegisterContainer />)
  const linkElm = screen.getByText("Log in", { selector: "a" })
  expect(linkElm).toHaveAttribute("href", "/login")
})

test("when click on submit button, it triggers rest api for register", () => {
  return new Promise(async resolve => {
    server.use(
      rest.post(NODE_API + "/auth/register", (cli, res, ctx) => {
        resolve(undefined)

        return res(ctx.status(201))
      })
    )

    renderWithProvs(<AuthRegisterContainer />)

    const submitBtnElm = screen.getByText<HTMLButtonElement>("Register", {
      selector: "button",
    })
    await userEvent.click(submitBtnElm)
  })
})
