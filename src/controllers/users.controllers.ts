import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/user.model'
import config from '../config'
import jwt from 'jsonwebtoken'
const Model = new UserModel()

async function create (  req: Request, res: Response, next: NextFunction)  {
  try {
    const user = await Model.create(req.body);
    res.status(200).json({
      status: 'success',
      data: { ...user },
      message: 'User Created ! ☺'
    });
  } catch (error) {
    next(error);
  }
}

async function getMany  (_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await Model.getMany();
    res.status(200).json({
      status: 'success',
      data: {...users},
      message: 'Users retrieved '
    });
  } catch (error) {
    next(error);
  }
}

async function getOne  (req: Request, res: Response, next: NextFunction)  {
  try {
    const user = await Model.getOne(req.params.id as unknown as string);
    res.status(200).json({
      status: 'success',
      data: {...user},
      message: 'User retrieved '
    });
  } catch (error) {
    next(error);
  }
}

async function updateOne  (req: Request, res: Response, next: NextFunction) {
  try {
    const user = await Model.updateOne(req.body);
    res.status(200).json({
      status: 'success',
      data: {...user},
      message: 'User Updated '
    });
  } catch (error) {
    next(error);
  }
}

async function deleteOne (req: Request, res: Response, next: NextFunction) {
  try {
    const user = await Model.deleteOne(req.params.id as unknown as string);
    res.status(200).json({
      status: 'success',
      data: {...user},
      message: 'User Deleted '
    });
  } catch (error) {
    next(error);
  }
}

async function authenticate  (req: Request, res: Response, next: NextFunction){
  try {
    const { email, password } = req.body;
    const user = await Model.authenticate(email, password);
    const token = jwt.sign({ user }, config.Secret as unknown as string);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'please try again'
      });
    }
    return res.status(200).json({
      status: 'success',
      data: { ...user, token },
      message: 'user Authenticated'
    });
  } catch (error) {
    return next(error);
  }
}

export {create,getMany,getOne,updateOne,deleteOne,authenticate};
