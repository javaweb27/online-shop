import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { changeTheme } from "../../../../helps/changeTheme"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { authReduxSliceMock } from "../../mocks/authReduxSliceMock"
import { AuthProfile } from "./AuthProfile"

vi.mock("../../../../helps/changeTheme", () => {
  return {
    changeTheme: vi.fn(),
  }
})

beforeEach(() => {
  renderWithProvs(<AuthProfile />, {
    preloadedState: { auth: authReduxSliceMock.onTrue.auth },
  })
})

test("renders user's email", () => {
  screen.getByText(authReduxSliceMock.onTrue.auth.user.email)
})

test("renders user's balance", () => {
  const balanceText = `Your balance: ${authReduxSliceMock.onTrue.auth.user.balance} $`

  screen.getByText((_content, node) => {
    return node!.textContent === balanceText
  })
})

test("renders a link to the user's orders with href", () => {
  const linkElm = screen.getByText<HTMLLinkElement>(/see my orders/i, { selector: "a" })

  expect(linkElm).toHaveAttribute("href", "/orders")
})

test("renders a title for set theme color", () => {
  screen.getByText<HTMLLinkElement>(/Set theme color/i)
})

describe("button for set theme color with correct param for changeTheme", () => {
  const buttonsData = [
    {
      param: [],
      textBtn: "detect",
    },
    {
      param: [true],
      textBtn: "dark",
    },
    {
      param: [false],
      textBtn: "light",
    },
  ]

  for (const data of buttonsData) {
    test(`renders button for ${data.textBtn} color`, async () => {
      const btn = screen.getByText<HTMLLinkElement>(new RegExp(data.textBtn, "i"), {
        selector: "button",
      })

      vi.mocked(changeTheme).mockClear()
      await userEvent.click(btn)

      expect(changeTheme).toHaveBeenCalledOnce()
      expect(changeTheme).toHaveBeenCalledWith(...data.param)
    })
  }
})
