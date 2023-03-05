import { screen, waitFor, within } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { productsApiDataMock } from "../../mocks/productsApiDataMock"
import { ProductsContainer } from "./ProductsContainer"

test("renders loading text on initial render", async () => {
  renderWithProvs(<ProductsContainer />)

  screen.getByText(/loading products/i)
})

test("renders loading text on initial render", async () => {
  renderWithProvs(<ProductsContainer />)

  screen.getByText(/loading products/i)
})

test("renders products list after loading", async () => {
  renderWithProvs(<ProductsContainer />)

  await waitFor(() => {
    expect(screen.queryByText(/loading products/i)).not.toBeInTheDocument()
  })

  for (const prod of productsApiDataMock.results) {
    const productElm = screen.getByText(prod.title).closest("article")

    const withinProductElm = within(productElm!)

    withinProductElm.getByText(prod.title)

    const imgElm = withinProductElm.getByAltText(prod.title)
    expect(imgElm).toHaveAttribute("src", prod.imgSrc)

    withinProductElm.getByText((_content, node) => {
      return node?.textContent === `${prod.price} $`
    })

    withinProductElm.getByText(/add to cart/i)
  }
})

test("renders <ProductsCatBtns />", async () => {
  renderWithProvs(<ProductsContainer />)

  await waitFor(() => {
    expect(screen.queryByText(/loading products/i)).not.toBeInTheDocument()
  })

  const filtersElmArray = screen.getAllByTestId("ProductsCatBtns")

  expect(filtersElmArray).toHaveLength(1)
})

test("renders <ProductsPageBtns /> 2 times", async () => {
  renderWithProvs(<ProductsContainer />)

  await waitFor(() => {
    expect(screen.queryByText(/loading products/i)).not.toBeInTheDocument()
  })

  const filtersElmArray = screen.getAllByTestId("ProductsPageBtns")

  expect(filtersElmArray).toHaveLength(2)
})
