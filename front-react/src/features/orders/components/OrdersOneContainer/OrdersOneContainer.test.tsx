import { screen, waitFor } from "@testing-library/react"
import { renderWithProvs } from "../../../../test-utils/renderWithProvs"
import { ordersOneApiDataMock } from "../../mocks/ordersOneApiDataMock"
import { OrdersOneContainer } from "./OrdersOneContainer"

beforeEach(() => {
  renderWithProvs(<OrdersOneContainer />)
})

test("renders a loading text on initial render", () => {
  screen.getByText(/Loading Order/i)
})

describe("after loading", () => {
  beforeEach(async () => {
    vi.resetAllMocks()
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom")
      return {
        ...(actual as any),
        useParams: () => ({ id: ordersOneApiDataMock._id }),
      }
    })
  })

  beforeEach(async () => {
    //from test "stops rendering a loading text"
    await waitFor(() => {
      const loadingTextElm = screen.queryByText(/Loading Order/i)
      expect(loadingTextElm).not.toBeInTheDocument()
    })
  })
  test("stops rendering a loading text", async () => {
    await waitFor(() => {
      const loadingTextElm = screen.queryByText(/Loading Order/i)
      expect(loadingTextElm).not.toBeInTheDocument()
    })
  })

  test("renders title for <OrderDetails />", () => {
    screen.getByText(/order details/i)
  })

  test("renders <OrderDetails />", () => {
    screen.getByTestId("OrderDetails")
  })

  test("renders title for <OrderProductsList />", () => {
    screen.getByText(/ordered products/i)
  })

  test("renders <OrderProductsList />", () => {
    screen.getByTestId("OrderProductsList")
  })
})
