import { Router } from "express";
import * as controllers from '../../controllers/product.controllers'
import authenticationMiddleware from'../../middleware/authentication.middleware'
const routes =Router();

routes.route('/')
.get(controllers.getMany)
.post(authenticationMiddleware,controllers.create);

routes.route('/:id').get(controllers.getOne)
.patch(authenticationMiddleware,controllers.updateOne).delete(authenticationMiddleware,controllers.deleteOne);



export default routes;