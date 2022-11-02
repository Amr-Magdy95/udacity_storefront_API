import supertest from 'supertest'
import app from '../../server'
import Client from '../../database'
import { UserStore} from '../../models/user'
import { OrderStore } from '../../models/order'

const userStore = new UserStore()
const orderStore = new OrderStore()
const request = supertest(app)

describe('Testing Dashboard Queries ', () => {
  beforeAll(async () => {
    // Creating a user
    await userStore.create({
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'password@12',
    })
    // Creating an order
    await orderStore.create({
      user_id: '1',
      status: 'incomplete',
    })
  })

  afterAll(async () => {
    // Cleanup
    const conn = Client.connect()
    const sql = 'TRUNCATE users,orders RESTART IDENTITY CASCADE';
    (await conn).query(sql);
    (await conn).release()
  })

  it('GET /users/:id/orders', async () => {
    const response = await request.get('/users/1/orders')
    expect(response.status).toEqual(200)
  })
})
