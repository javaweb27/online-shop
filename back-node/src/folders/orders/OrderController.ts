import type { NextFunction, Request, Response } from "express"
import { Types } from "mongoose"
import OrderModel from "./OrderModel.js"
import ProductModel from "../products/ProductModel.js"
import boom from "@hapi/boom"

export type OrdersCreateOneResponse = {
  locals: {
    /** validated data */
    requestOrder: {
      street: string
      productsObjIds: { _id: string; qty: number }[]
    }
    /** products to save in db (OrdersModel) */
    productsToBeOrdered: { _id: Types.ObjectId; quantity: number }[]
    orderTotalPrice: number
  }
}

export class OrderController {
  async create(
    cli: Request,
    res: Response<any, OrdersCreateOneResponse["locals"]>,
    next: NextFunction
  ) {
    const { productsToBeOrdered, orderTotalPrice } = res.locals

    // res.json({ productsToBeOrdered, orderTotalPrice })

    // @ts-ignore
    const User = cli.mwUser

    try {
      if (User.balance < orderTotalPrice) {
        throw boom.conflict("balance is not enough")
      }

      User.balance -= orderTotalPrice

      const newOrder = new OrderModel({
        // auto object _id for order
        // auto createdAt date for order
        productsObjIds: productsToBeOrdered,
        street: res.locals.requestOrder.street,
        userId: User._id,
      })

      await Promise.all([User.save(), newOrder.save()])

      res.status(201).json({ message: "order created at " + newOrder.createdAt })
    } catch (error) {
      next(error)
    }
  }

  async getAll(cli: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const { _id, email } = cli.mwUser

    try {
      const orders = await OrderModel.find({ userId: _id }, { userId: 0 })
      res.json({ _id, email, orders })
    } catch (error) {
      next(error)
    }
  }

  async getById(cli: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const User = cli.mwUser

    try {
      const orderFound = await OrderModel.findOne({
        _id: cli.params.orderId,
        userId: User._id,
      })

      if (!orderFound) throw boom.notFound("Cannot find order")

      const orderedProducts = await ProductModel.find(
        {
          _id: { $in: orderFound.productsObjIds },
        },
        { __v: 0 }
      )

      const orderedProductsWithQuantity = orderedProducts.map(item => {
        const { quantity } = orderFound.productsObjIds.find(
          orderItem => item._id.toString() === orderItem._id.toString()
        )!

        return { ...item.toObject(), quantity }
      })

      const orderData = {
        _id: orderFound._id,
        street: orderFound.street,
        createdAt: orderFound.createdAt,
        products: orderedProductsWithQuantity,
      }

      res.json(orderData)
    } catch (error) {
      next(error)
    }
  }
}
