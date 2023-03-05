import { screen } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { MenuBottomLinks } from "./MenuBottomLinks"

const linksData = [
  ["/", "Home"],
  ["/products", "Products"],
  ["/cart", "Cart"],
  ["/profile", "Profile"],
]

beforeEach(() => {
  renderWithProvs(<MenuBottomLinks />)
})

for (const [path, text] of linksData) {
  test(`renders link to ${text} with href "${path}"`, () => {
    const linkElm = screen.getByText(
      (_content, node) => {
        return node?.textContent === text
      },
      { selector: "a" }
    )

    expect(linkElm).toHaveAttribute("href", path)
  })
}
