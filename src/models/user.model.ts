import User from '../types/user.type'
import db from '../database'
import config from '../config'
import bcrypt from 'bcrypt'

const hashPassword = (password: string) => {
  const salt = parseInt(config.salt as string, 10)
  return bcrypt.hashSync(`${password}${config.pepper}`, salt)
}

class UserModel {
  //create
  async create(u: User): Promise<User> {
    try {
      //open connection with database
      const connection = await db.connect()
      const sql = `insert into Users(email,userName,firstName,lastName,password) 
            values($1, $2, $3, $4, $5)returning id,email,userName,firstName,lastName`
      //run query
      const result = await connection.query(sql, [
        u.email,
        u.userName,
        u.firstName,
        u.lastName,
        hashPassword(String(u.password))
      ])
      //release connection
      connection.release()
      //return created user
      return result.rows[0]
    } catch (error) {
      throw new Error('Unable to create user')
    }
  }

  async getMany(): Promise<User[]> {
    try {
      const connection = await db.connect()
      const sql = 'SELECT id,email,userName,firstName,lastName from users'
      const result = await connection.query(sql)
      connection.release()
      return result.rows
    } catch (error) {
      throw new Error(`Error at retrieving users ${(error as Error).message}`)
    }
  }

  async getOne(id: string): Promise<User[]> {
    try {
      const connection = await db.connect()
      const sql = `SELECT id,email,userName,firstName,lastName from users where id=($1) `
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Coulden't find user${id} ${(error as Error).message}`)
    }
  }

  async updateOne(u: User): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `UPDATE users SET email=$1,userName=$2,firstName=$3,lastName=$4 ,password=$5 WHERE id=$6 RETURNING id,email,userName,firstName,lastName`
      const result = await connection.query(sql, [
        u.email,
        u.userName,
        u.firstName,
        u.lastName,
        hashPassword(String(u.password)),
        u.id
      ])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Error at Update user ${u.userName},${(error as Error).message}`)
    }
  }

  async deleteOne(id: string): Promise<User> {
    try {
      const connection = await db.connect()
      const sql = `DELETE FROM users WHERE id=($1) RETURNING id,email,userName,firstName,lastName  `
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(`Couldn't delete User${id} ${(error as Error).message}`)
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const connection = await db.connect()
      const sql = `SELECT password FROM users WHERE email=$1`
      const result = await connection.query(sql, [email])
      if (result.rows.length) {
        const { password: hashPassword } = result.rows[0]
        const isPasswordValid = bcrypt.compareSync(`${password}${config.pepper}`, hashPassword)
        if (isPasswordValid) {
          const userInfo = await connection.query(
            `SELECT id, email, userName, firstName, lastName FROM users WHERE email=($1)`,
            [email]
          )
          return userInfo.rows[0]
        }
      }
      connection.release()
      return null
    } catch (error) {
      throw new Error(`Unable to Login: ${(error as Error).message}`)
    }
  }
}

export default UserModel
