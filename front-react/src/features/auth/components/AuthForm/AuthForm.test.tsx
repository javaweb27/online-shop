import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { rest } from "msw"
import { NODE_API } from "../../../../config"
import { server } from "../../../../mocks/server"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { authFormReduxSliceMock } from "../../mocks/authFormReduxSliceMock"
import { AuthForm } from "./AuthForm"

test("renders <AuthFormInputs />", () => {
  const onSubmitMock = vi.fn()

  renderWithProvs(<AuthForm submitBtnText={"submitBtnText"} onSubmit={onSubmitMock} />)

  screen.getByTestId("AuthFormInputs")
})

test("renders <AuthFormSubmitBtn /> by its text", () => {
  const onSubmitMock = vi.fn()

  renderWithProvs(<AuthForm submitBtnText={"submitBtnText"} onSubmit={onSubmitMock} />)

  screen.getByText<HTMLInputElement>("submitBtnText")
})

describe("when form has valid data", () => {
  const formsList = authFormReduxSliceMock.onValidList
  const formsCount = formsList.length

  for (const index in formsList) {
    const currentCount = +index + 1

    const validForm = formsList[index]

    test(
      currentCount +
        " / " +
        formsCount +
        ': submit button is enabled and "onSubmit" can be called',
      async () => {
        const onSubmitMock = vi.fn()

        const authForm = {
          form: validForm,
          isSubmitBtnClicked: false,
        }
        renderWithProvs(
          <AuthForm submitBtnText={"submitBtnText"} onSubmit={onSubmitMock} />,
          {
            preloadedState: { authForm },
          }
        )
        server.use(
          rest.post(`${NODE_API}`, (_cli, res, ctx) => {
            return res(ctx.status(201))
          })
        )

        const submitBtnElm = screen.getByText<HTMLInputElement>("submitBtnText")

        await userEvent.click(submitBtnElm)

        expect(submitBtnElm).toBeEnabled()
        expect(onSubmitMock).toHaveBeenCalledTimes(1)
      }
    )
  }
})

describe("when form doesn't have valid data", () => {
  const formsList = authFormReduxSliceMock.onWrongList
  const formsCount = formsList.length

  for (const index in formsList) {
    const currentCount = Number(index) + 1

    const notValidForm = formsList[index]

    test(currentCount + " / " + formsCount + ": submit button is disabled", async () => {
      const onSubmitMock = vi.fn()
      renderWithProvs(
        <AuthForm submitBtnText={"submitBtnText"} onSubmit={onSubmitMock} />,
        {
          preloadedState: {
            authForm: {
              form: notValidForm,
              isSubmitBtnClicked: false,
            },
          },
        }
      )

      const submitBtnElm = screen.getByText<HTMLInputElement>("submitBtnText")

      expect(submitBtnElm).toBeDisabled()
    })
  }
})
