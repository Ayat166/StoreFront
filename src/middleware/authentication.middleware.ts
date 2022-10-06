import { NextFunction, Request, Response } from 'express'
import config from '../config'
import jwt from 'jsonwebtoken'
import Error from '../interfaces/error.interface'

function authenticationMiddleware (req: Request, __res: Response, Next: NextFunction)  {
  try {
    // get authHeader
    const auth = req.get('Authorization');
    //check authHeader
    if (auth) {
      const bearer = auth.split(' ')[0].toLowerCase();
      const token = auth.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, config.Secret as unknown as string);
        if (decode) {
          Next();
        } else {
          const error: Error = new Error('login Error UnAuthorized');
          error.status = 401;
          Next(error);
        }
      } else {
        const error: Error = new Error('login Error UnAuthorized');
        error.status = 401;
        Next(error);
      }
    } else {
      const error: Error = new Error('login Error UnAuthorized');
      error.status = 401;
      Next(error);
      }
  } catch (err) {
    const error: Error = new Error('login Error UnAuthorized');
    error.status = 401;
    Next(error);
    }
}
export default authenticationMiddleware;
