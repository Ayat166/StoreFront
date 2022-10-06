import { NextFunction, Request, Response } from 'express'
import Orders_productModel from '../models/orders_product.model'

const orders_productModel = new Orders_productModel()

async function create (req: Request, res: Response, next: NextFunction) {
  try {
    const order = await orders_productModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...order },
      message: 'orders product Created ! ☺'
    })
  } catch (error) {
    next(error)
  }
}

async function getMany (req: Request, res: Response, next: NextFunction)  {
  try {
    const order = await orders_productModel.getMany()
    res.json({
      status: 'success',
      data: order,
      message: 'orders product retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

async function getOne (req: Request, res: Response, next: NextFunction) {
  try {
    const order = await orders_productModel.getOne(req.params.id as unknown as number)
    res.json({
      status: 'success',
      data: order,
      message: 'orders product retrieved successfully'
    })
  } catch (error) {
    next(error)
  }
}

async function updateOne (req: Request, res: Response, next: NextFunction)  {
  try {
    const order = await orders_productModel.updateOne(req.body)
    res.json({
      status: 'success',
      data: order,
      message: 'orders product Updated successfully'
    })
  } catch (error) {
    next(error)
  }
}

async function deleteOne (req: Request, res: Response, next: NextFunction)  {
  try {
    const order = await orders_productModel.deleteOne(req.params.id as unknown as number)
    res.json({
      status: 'success',
      data: order,
      message: 'orders product Deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

export {create,getMany,getOne,updateOne,deleteOne};
