import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { NODE_API } from "../../../../config"
import { server } from "../../../../mocks/server"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { AuthLoginContainer } from "./AuthLoginContainer"

test("renders title", () => {
  renderWithProvs(<AuthLoginContainer />)
  screen.getByText("Log in", { selector: "h1" })
})

test("renders submit button", () => {
  renderWithProvs(<AuthLoginContainer />)
  screen.getByText("Log in", { selector: "button" })
})

test("renders a message to redirect to Register page", () => {
  renderWithProvs(<AuthLoginContainer />)
  screen.getByText(/Don't have an account yet?/i)
})

test("renders a link to redirect to Register page with correct href", () => {
  renderWithProvs(<AuthLoginContainer />)
  const linkElm = screen.getByText("Register", { selector: "a" })
  expect(linkElm).toHaveAttribute("href", "/register")
})

test("when click on submit button, it triggers rest api for login", () => {
  return new Promise(async resolve => {
    server.use(
      rest.post(NODE_API + "/auth", (cli, res, ctx) => {
        resolve(undefined)

        return res(ctx.status(201))
      })
    )

    renderWithProvs(<AuthLoginContainer />)

    const submitBtnElm = screen.getByText<HTMLButtonElement>("Log in", {
      selector: "button",
    })
    await userEvent.click(submitBtnElm)
  })
})
