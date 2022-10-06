import { Router } from "express";
import * as controllers from '../../controllers/orders_product.controllers'
import authenticationMiddleware from'../../middleware/authentication.middleware'
const routes =Router();

routes.route('/')
.get(authenticationMiddleware,controllers.getMany)
.post(controllers.create);

routes.route('/:id').get(authenticationMiddleware,controllers.getOne)
.patch(authenticationMiddleware,controllers.updateOne).delete(authenticationMiddleware,controllers.deleteOne);



export default routes;