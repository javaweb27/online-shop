import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { categoriesList, ProductsCatBtns } from "./ProductsCatBtns"

test("renders buttons for changing category", () => {
  renderWithProvs(<ProductsCatBtns />)

  for (const catText of categoriesList) {
    screen.getByText(catText, { selector: "button" })
  }
})

test("the button for all categories is the current one (default) and it is disabled", () => {
  renderWithProvs(<ProductsCatBtns />)
  const currentCatBtnElm = screen.getByText("all", { selector: "button" })

  expect(currentCatBtnElm).toBeDisabled()
})

test("the buttons can change the current category, they becomes disabled, and the buttons that was the previous category will be enabled", async () => {
  renderWithProvs(<ProductsCatBtns />)

  const getCatBtn = (btnText: string) => {
    return screen.getByText<HTMLButtonElement>(btnText, {
      selector: "button",
    })
  }

  // "all" is the default category
  let previousCatBtnElm: HTMLButtonElement

  for (let index = 1; index < categoriesList.length; index++) {
    // "all" is the first item in categoriesList
    const prevCategory = categoriesList[index - 1],
      nextCategory = categoriesList[index]

    previousCatBtnElm = getCatBtn(prevCategory)

    expect(previousCatBtnElm).toBeDisabled()

    const nextCatBtnElm = getCatBtn(nextCategory)
    expect(nextCatBtnElm).not.toBeDisabled()

    await userEvent.click(nextCatBtnElm)
    expect(previousCatBtnElm).not.toBeDisabled()
    expect(nextCatBtnElm).toBeDisabled()
  }
})
