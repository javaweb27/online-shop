import type { NextFunction, Request, Response } from "express"
import { body, matchedData, validationResult } from "express-validator"
import type { OrdersCreateOneResponse } from "../controllers/createOne.controller.js"

export const newOrderRequestBodyMiddleware: ((
  cli: Request,
  res: Response<any, OrdersCreateOneResponse["locals"]>,
  next: NextFunction
) => void)[] = [
  body("productsObjIds").isArray({ min: 1, max: 10 }),
  body("street").trim().isString().isLength({ min: 3, max: 200 }),
  body("productsObjIds.*").isObject({ strict: true }),
  body("productsObjIds.*._id").isString().isMongoId(),
  // body("productsObjIds.*.qty").not().isString().isInt({ min: 1, max: 10 }),
  body("productsObjIds.*.qty").isInt({ min: 1, max: 10 }).not().isString(),
  (cli, res, next) => {
    const errors = validationResult(cli)

    if (false === errors.isEmpty()) {
      // there are errors
      res.status(400).json(errors.array())
      return
    }

    const { street, productsObjIds } = matchedData(cli)

    res.locals.requestOrder = { street, productsObjIds }
    next()
  },
]
