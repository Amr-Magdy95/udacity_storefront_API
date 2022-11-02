import { UserStore } from '../../models/user'
import { OrderStore } from '../../models/order'
import { ProductStore } from '../../models/product'
import Client from '../../database'
import app from '../../server'
import supertest from 'supertest'

const userStore = new UserStore()
const productStore = new ProductStore()
const orderStore = new OrderStore()
const request = supertest(app)

describe('Testing Order Models', () => {
  describe('Testing Definitions', () => {
    it('testing whether the order model index is defined', () => {
      expect(orderStore.index).toBeDefined()
    })
    it('testing whether the order model show is defined', () => {
      expect(orderStore.show).toBeDefined()
    })
    it('testing whether the order model create is defined', () => {
      expect(orderStore.create).toBeDefined()
    })
    it('testing whether the order model addProduct is defined', () => {
      expect(orderStore.addProduct).toBeDefined()
    })
  })

  describe('Testing Functionality', () => {
    beforeAll(async () => {
      // Creating a user
      await userStore.create({
        firstname: 'John',
        lastname: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'password@12',
      })
      // Retrieving jwt for above user to use in future tests
       await request
        .post('/users/auth')
        .send({ email: 'johndoe@gmail.com', password: 'password@12' })
      const conn = await Client.connect()
      await conn.query('SELECT * FROM users')
      conn.release()
    })

    afterAll(async () => {
      // Cleanup
      const conn = Client.connect()
      const sql =
        'TRUNCATE users,orders,products,order_products RESTART IDENTITY CASCADE';
      (await conn).query(sql)
      ;(await conn).release()
    })

    it('testing the dashboard query model', async () => {
      const response = await request.get('/users/1/orders')
      expect(response.status).toEqual(200)
    })
    it('Testing index method', async () => {
      const result = await orderStore.index()
      expect(result).toEqual([])
    })
    it('Testing create method', async () => {
      const result = await orderStore.create({
        user_id: '1',
        status: 'incomplete',
      })
      expect(result).toBeTruthy()
    })
    it('Testing  show method', async () => {
      const result = await orderStore.show('1')
      expect(result).toBeTruthy()
    })

    describe('Testing add product method', () => {
      beforeAll(async () => {
        await productStore.create({ name: 'Food', price: 12.25 })
      })
      it('proceeding to test addproduct', async () => {
        const result = await orderStore.addProduct(5, '1', '1')
        expect(result).toBeTruthy()
      })
    })
  })
})
