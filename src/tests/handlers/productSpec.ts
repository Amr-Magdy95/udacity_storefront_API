import supertest from 'supertest'
import app from '../../server'
import Client from '../../database'
import { UserStore } from '../../models/user'
import { OrderStore } from '../../models/order'

const userStore = new UserStore()
const orderStore = new OrderStore()
const request = supertest(app)

describe('Testing Product Handler', () => {
  let token: string

  beforeAll(async () => {
    // Creating a user
    await userStore.create({
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'password@12',
    })
    // Retrieving jwt for above user to use in future tests
    const response = await request
      .post('/users/auth')
      .send({ email: 'johndoe@gmail.com', password: 'password@12' })
    token = response.body
    // Creating an order
    await orderStore.create({
      user_id: '1',
      status: 'incomplete',
    })
  })

  afterAll(async () => {
    // Cleanup
    const conn = Client.connect()
    const sql = 'TRUNCATE users,orders,products RESTART IDENTITY CASCADE';
    (await conn).query(sql)
    ;(await conn).release();
  })

  it('GET /products', async () => {
    const response = await request.get('/products')
    expect(response.status).toEqual(200)
  })

  it('POST /products', async () => {
    const response = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Food', price: '12.25' })
    // console.log(response);
    expect(response.status).toEqual(200)
  })

  it('GET /products/:id', async () => {
    const response = await request.get('/products/1')
    expect(response.status).toEqual(200)
  })
})
