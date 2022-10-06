import Product from "../types/product.type";
import db from "../database";

class ProductModel{
    async create(p: Product): Promise<Product> {
        try {
          //open connection with database
          const connection = await db.connect()
          const sql = `insert into product (name,description,price,category)
           values($1, $2, $3, $4)returning id,name,description,price,category`
          //run query
          const result = await connection.query(sql, [
            p.name,
            p.description,
            p.price,
            p.category
          ])
          //release connection
          connection.release()
          //return created user
          return result.rows[0]
        } catch (error) {
          throw new Error('Unable to create Product')
        }
    }

    async getMany(): Promise<Product[]> {
        try {
          const connection = await db.connect()
          const sql = 'SELECT id,name,description,price,category from product'
          const result = await connection.query(sql)
          connection.release()
          return result.rows
        } catch (error) {
          throw new Error(`Error at retrieving Products ${(error as Error).message}`)
        }
    }

    async getOne(id: number): Promise<Product[]> {
        try {
          const connection = await db.connect()
          const sql = `SELECT id,name,description,price,category from product where id=($1) `
          const result = await connection.query(sql, [id])
          connection.release()
          return result.rows[0]
        } catch (error) {
          throw new Error(`Coulden't find Product${id} ${(error as Error).message}`)
        }
    }

    async updateOne(p: Product): Promise<Product> {
        try {
          const connection = await db.connect()
          const sql = `UPDATE product SET name=$1,description=$2,price=$3,category=$4 WHERE id=$5 RETURNING id,name,description,price,category`
          const result = await connection.query(sql, [
            p.name,
            p.description,
            p.price,
            p.category,
            p.id
            
          ])
          connection.release()
          return result.rows[0]
        } catch (error) {
          throw new Error(`Error at Update Product ${p.id},${(error as Error).message}`)
        }
    }

    async deleteOne(id: number): Promise<Product> {
        try {
          const connection = await db.connect()
          const sql = `DELETE FROM product WHERE id=($1) RETURNING id,name,description,price,category  `
          const result = await connection.query(sql, [id])
          connection.release()
          return result.rows[0]
        } catch (error) {
          throw new Error(`Couldn't delete Order${id} ${(error as Error).message}`)
        }
    }

}

export default ProductModel;