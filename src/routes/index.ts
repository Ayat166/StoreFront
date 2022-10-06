import { Router } from "express";
import userRoutes from './api/users.routes'
import productRoutes from'./api/product.routes'
import ordersRoutes from './api/orders.routes';
import orderProductRoutes from './api/orders_product.routes';
const routes =Router();

routes.use('/users',userRoutes);
routes.use('/products',productRoutes);
routes.use('/orders',ordersRoutes);
routes.use('/order_product',orderProductRoutes);

export default routes;