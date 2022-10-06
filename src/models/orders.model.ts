import Order from "../types/orders.type";
import db from "../database";

class OrdersModel{
    async create(o: Order): Promise<Order> {
        try {
          //open connection with database
          const connection = await db.connect()
          const sql = `insert into orders (status,userId) 
                values($1, $2)returning id,status,userId`
          //run query
          const result = await connection.query(sql, [
            o.status,
            o.userId
          ])
          //release connection
          connection.release()
          //return created user
          return result.rows[0]
        } catch (error) {
          throw new Error('Unable to create Order')
        }
    }

    async getMany(): Promise<Order[]> {
        try {
          const connection = await db.connect()
          const sql = 'SELECT id,status,userId from orders'
          const result = await connection.query(sql)
          connection.release()
          return result.rows
        } catch (error) {
          throw new Error(`Error at retrieving Orders ${(error as Error).message}`)
        }
    }

    async getOne(id: number): Promise<Order[]> {
        try {
          const connection = await db.connect()
          const sql = `SELECT id,status,userId from orders where id=($1) `
          const result = await connection.query(sql, [id])
          connection.release()
          return result.rows[0]
        } catch (error) {
          throw new Error(`Coulden't find order ${id} ${(error as Error).message}`)
        }
    }

    async updateOne(o: Order): Promise<Order> {
        try {
          const connection = await db.connect()
          const sql = `UPDATE orders SET status=$1,userId=$2 WHERE id=$3 RETURNING id,status,userId`
          const result = await connection.query(sql, [
            o.status,
            o.userId,
            o.id
          ])
          connection.release()
          return result.rows[0]
        } catch (error) {
          throw new Error(`Error at Update Order ${o.id},${(error as Error).message}`)
        }
    }

    async deleteOne(id: number): Promise<Order> {
        try {
          const connection = await db.connect()
          const sql = `DELETE FROM orders WHERE id=($1) RETURNING id,status,userId  `
          const result = await connection.query(sql, [id])
          connection.release()
          return result.rows[0]
        } catch (error) {
          throw new Error(`Couldn't delete Order${id} ${(error as Error).message}`)
        }
    }
}

export default OrdersModel;
