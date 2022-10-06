import { NextFunction, Request, Response } from 'express'
import OrdersModel from '../models/orders.model'

const ordersModel = new OrdersModel()

async function create (req: Request, res: Response, next: NextFunction)  {
  try {
    const order = await ordersModel.create(req.body)
    res.status(200).json({
      status: 'success',
      data: { ...order },
      message: 'order Created ! ☺'
    })
  } catch (error) {
    next(error)
  }
}

async function getMany (req: Request, res: Response, next: NextFunction)  {
  try {
    const order = await ordersModel.getMany()
    res.status(200).json({
      status: 'success',
      data: order,
      message: 'orders retrieved '
    })
  } catch (error) {
    next(error)
  }
}

async function getOne (req: Request, res: Response, next: NextFunction) {
  try {
    const order = await ordersModel.getOne(req.params.id as unknown as number)
    res.status(200).json({
      status: 'success',
      data: order,
      message: 'order retrieved '
    })
  } catch (error) {
    next(error)
  }
}

async function updateOne (req: Request, res: Response, next: NextFunction)  {
  try {
    const order = await ordersModel.updateOne(req.body)
    res.status(200).json({
      status: 'success',
      data: order,
      message: 'order Updated '
    })
  } catch (error) {
    next(error)
  }
}

async function deleteOne (req: Request, res: Response, next: NextFunction)  {
  try {
    const order = await ordersModel.deleteOne(req.params.id as unknown as number)
    res.status(200).json({
      status: 'success',
      data: order,
      message: 'order Deleted '
    })
  } catch (error) {
    next(error)
  }
}

export {create,getMany,getOne,updateOne,deleteOne};
