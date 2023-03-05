import { screen } from "@testing-library/react"
import { authReduxSliceMock } from "../../features/auth/mocks/authReduxSliceMock"
import { renderWithProvs } from "../../test-utils/renderWithProvs"
import { AppLayout } from "./AppLayout"

let resultWithProvs: ReturnType<typeof renderWithProvs>
const childrenText = Date.now()

beforeEach(() => {
  resultWithProvs = renderWithProvs(
    <AppLayout>
      <div>{childrenText}</div>
    </AppLayout>
  )
})

test("renders children prop", () => {
  screen.getByText(childrenText, { selector: "div" })
})

test("renders <MenuTopLinks />", () => {
  screen.getByTestId("MenuTopLinks")
})

describe("when user isn't logged in", () => {
  test("renders <MenuTopUserFalse />", () => {
    screen.getByTestId("MenuTopUserFalse")
  })
  test("doesn't render <MenuTopUserTrue />", () => {
    expect(screen.queryByTestId("MenuTopUserTrue")).not.toBeInTheDocument()
  })
})

describe("when user is logged in", () => {
  beforeEach(() => {
    resultWithProvs.unmount()

    renderWithProvs(
      <AppLayout>
        <div>{childrenText}</div>
      </AppLayout>,
      { preloadedState: authReduxSliceMock.onTrue }
    )
  })

  test("renders <MenuTopUserTrue />", () => {
    screen.getByTestId("MenuTopUserTrue")
  })

  test("doesn't render <MenuTopUserFalse />", () => {
    expect(screen.queryByTestId("MenuTopUserFalse")).not.toBeInTheDocument()
  })
})
