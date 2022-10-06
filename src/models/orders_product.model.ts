import Orders_product from "../types/orders_product.type";
import db from "../database";

class Orders_productModel{

    async create(OP: Orders_product): Promise<Orders_product> {
        try {
          //open connection with database
          const connection = await db.connect()
          const sql = `insert into orders_product(orders_id,product_id,quantity) 
                values($1, $2, $3)returning id,orders_id,product_id,quantity`
          //run query
          const result = await connection.query(sql, [
            OP.id,
            OP.orders_id,
            OP.product_id,
            OP.quantity
          ])
          //release connection
          connection.release()
          //return created user
          return result.rows[0]
        } catch (error) {
          throw new Error('Unable to create Order Product')
        }
    }

    async getMany(): Promise<Orders_product[]> {
        try {
          const connection = await db.connect()
          const sql = 'SELECT id,orders_id,product_id,quantity from orders_product'
          const result = await connection.query(sql)
          connection.release()
          return result.rows
        } catch (error) {
          throw new Error(`Error at retrieving Orders Products ${(error as Error).message}`)
        }
    }

    async getOne(id: number): Promise<Orders_product[]> {
        try {
          const connection = await db.connect()
          const sql = `SELECT id,orders_id,product_id,quantity from orders_product where id=($1) `
          const result = await connection.query(sql, [id])
          connection.release()
          return result.rows[0]
        } catch (error) {
          throw new Error(`Coulden't find Order Product${id} ${(error as Error).message}`)
        }
    }

    async updateOne(OP: Orders_product): Promise<Orders_product> {
        try {
          const connection = await db.connect()
          const sql = `UPDATE orders_product SET orders_id=$1,product_id=$2,quantity=$3 WHERE id=$4 RETURNING id,orders_id,product_id,quantity `
          const result = await connection.query(sql, [
            OP.id,
            OP.orders_id,
            OP.product_id,
            OP.quantity
          ])
          connection.release()
          return result.rows[0]
        } catch (error) {
          throw new Error(`Error at Update Order Product ${OP.id},${(error as Error).message}`)
        }
    }

    async deleteOne(id: number): Promise<Orders_product> {
        try {
          const connection = await db.connect()
          const sql = `DELETE FROM orders_product WHERE id=($1) RETURNING id,orders_id,product_id,quantity `
          const result = await connection.query(sql, [id])
          connection.release()
          return result.rows[0]
        } catch (error) {
          throw new Error(`Couldn't delete Order product ${id} ${(error as Error).message}`)
        }
    }
}

export default Orders_productModel;