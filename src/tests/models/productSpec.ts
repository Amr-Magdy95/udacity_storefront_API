import { UserStore } from '../../models/user'
import { ProductStore } from '../../models/product'
import Client from '../../database'

const userStore = new UserStore()
const productStore = new ProductStore()

describe('Testing Product Models', () => {
  describe('Testing Definitions', () => {
    it('testing whether the order model index is defined', () => {
      expect(productStore.index).toBeDefined()
    })
    it('testing whether the order model show is defined', () => {
      expect(productStore.show).toBeDefined()
    })
    it('testing whether the order model create is defined', () => {
      expect(productStore.create).toBeDefined()
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
    })

    afterAll(async () => {
      // Cleanup
      const conn = Client.connect()
      const sql =
        'TRUNCATE users,orders,products,order_products RESTART IDENTITY CASCADE';
      (await conn).query(sql)
      ;(await conn).release();
    })
    it('Testing index method', async () => {
      const result = await productStore.index()
      expect(result).toEqual([])
    })
    it('Testing create method', async () => {
      const result = await productStore.create({ name: 'Food', price: 12.25 })
      expect(result).toBeTruthy()
    })
    it('Testing  show method', async () => {
      const result = await productStore.show('1')
      expect(result).toBeTruthy()
    })
  })
})
