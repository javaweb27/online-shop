import { rest } from "msw"
import { NODE_API } from "../../../config"
import { productsApiDataMock } from "./productsApiDataMock"

export const productsApiMock = [
  rest.get(`${NODE_API}/products`, (cli, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsApiDataMock))
  }),
]
