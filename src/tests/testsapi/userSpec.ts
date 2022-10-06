import supertest from 'supertest'
import db from '../../database'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'
import app from '../../index'

const userModel = new UserModel()
const request = supertest(app)
let token = ''

describe('User API Endpoints', () => {
  const user = {
    email: 'test@gmail.com',
    userName: 'UserTest',
    firstName: 'User',
    lastName: 'Test',
    password: '123'
  } as User
  beforeAll(async () => {
    const createdUser = await userModel.create(user)
    user.id = createdUser.id
  })
  afterAll(async () => {
    const connection = await db.connect()
    const sql = 'DELETE FROM users;'
    await connection.query(sql)
    connection.release()
  })
  describe('Test Authenticate methods', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          email: 'test@gmail.com',
          password: '123'
        })
      expect(res.status).toBe(200)
      const { id, email, token: userToken } = res.body.data
      expect(id).toBe(user.id)
      expect(email).toBe(user.email)
      token = userToken
    })
    it('should be faild to authenticate with wrong email', async () => {
      const res = await request
        .post('/api/users/authenticate')
        .set('Content-type', 'application/json')
        .send({
          email: 'WrongEmail',
          password: '456'
        })
      expect(res.status).toBe(401)
    })
  })
  describe('Test Crud API methods', () => {
    it('should create new user', async () => {
      const res = await request
        .post('/api/users/')
        .set('Content-type', 'application/json')
        .send({
          email: 'test2@gmail.com',
          userName: 'TestUser2',
          firstName: 'Test2',
          lastName: 'User',
          password: '1234'
        } as User)
      expect(res.status).toBe(200)
      const { email, userName, firstName, lastName } = res.body.data
      expect(email).toBe('test22gmail.com')
      expect(userName).toBe('TestUser2')
      expect(firstName).toBe('Test2')
      expect(lastName).toBe('User')
    })

    it('should get list users', async () => {
      const res = await request
        .get('/api/users/')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.length).toBe(2)
    })
    it('should get user info', async () => {
      const res = await request
        .get(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.userName).toBe('UserTest')
      expect(res.body.data.email).toBe('test@gmail.com')
    })
    it('should update user info', async () => {
      const res = await request
        .patch(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer${token}`)
        .send({
          ...user,
          userName: 'mohamed',
          firstName: 'mohamed'
        })
      expect(res.status).toBe(200)
      const { id, email, userName, firstName, lastName } = res.body.data
      expect(id).toBe(user.id)
      expect(email).toBe(user.email)
      expect(userName).toBe('mohamed')
      expect(firstName).toBe('mohamed')
      expect(lastName).toBe(user.lastName)
    })
    it('should delete user', async () => {
      const res = await request
        .delete(`/api/users/${user.id}`)
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
      expect(res.body.data.id).toBe(user.id)
      expect(res.body.data.userName).toBe('mohamed')
    })
  })
})
