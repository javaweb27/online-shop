import { ordersApiMock } from "../features/orders/mocks/ordersApiMock"
import { productsApiMock } from "../features/products/mocks/productsApiMock"

/*
  you can use *server.use(
   rest.get("/api/path", funcResolver)
  )*

  so msw can mock the api inside a test
  and replace an handled path
*/

export const handlers = [...productsApiMock, ...ordersApiMock]
