import { rest } from "msw"
import { NODE_API } from "../../../config"
import { ordersApiDataMock } from "./ordersApiDataMock"
import { ordersOneApiDataMock } from "./ordersOneApiDataMock"

export const ordersApiMock = [
  rest.get(`${NODE_API}/orders`, (cli, res, ctx) => {
    return res(ctx.status(200), ctx.json(ordersApiDataMock))
  }),
  rest.get(`${NODE_API}/orders/:id`, (cli, res, ctx) => {
    // const { id } = cli.params // not necessary in here
    return res(ctx.status(200), ctx.json(ordersOneApiDataMock))
  }),
  // this post method is tested in cart -> CartTotals
  // using server.use(rest.post(path,resolverFunc))
  // disabled
  // rest.post(`${NODE_API}/orders`, (cli, res, ctx) => {
  //   return res(ctx.status(201), ctx.json({ authToken: "why auth token?" }))
  // }),
]
