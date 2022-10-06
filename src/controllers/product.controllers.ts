import { NextFunction, Request, Response } from 'express'
import ProductModel from '../models/product.model'

const productModel = new ProductModel()
async function create  (req: Request, res: Response, next: NextFunction){
  try {
    const product = await productModel.create(req.body)
    res.status(200).json({
      status: 'success',
      data: { ...product },
      message: 'product Created ! ☺'
    })
  } catch (error) {
    next(error)
  }
}

async function getMany (req: Request, res: Response, next: NextFunction)  {
  try {
    const product = await productModel.getMany()
    res.status(200).json({
      status: 'success',
      data: product,
      message: 'products retrieved '
    })
  } catch (error) {
    next(error)
  }
}

async function getOne (req: Request, res: Response, next: NextFunction)  {
  try {
    const product = await productModel.getOne(req.params.id as unknown as number)
    res.status(200).json({
      status: 'success',
      data: product,
      message: 'product retrieved'
    })
  } catch (error) {
    next(error)
  }
}
async function updateOne (req: Request, res: Response, next: NextFunction)  {
  try {
    const product = await productModel.updateOne(req.body)
    res.status(200).json({
      status: 'success',
      data: product,
      message: 'product Updated'
    })
  } catch (error) {
    next(error)
  }
}

async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await productModel.deleteOne(req.params.id as unknown as number)
    res.status(200).json({
      status: 'success',
      data: product,
      message: 'product Deleted'
    })
  } catch (error) {
    next(error)
  }
}

export {create,getMany,getOne,updateOne,deleteOne};
