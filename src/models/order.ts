import Client from '../database'

export type Order = {
  id?: string
  user_id: string
  status: string
}

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`couldn't fetch orders with error: ${err}`)
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const result = await conn.query(sql, [id])
      if (!result.rows.length) {
        throw new Error(`order doesn't exist`)
      }
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `couldn't fetch user with id ${id} returning error: ${err} `
      )
    }
  }

  async create(incoming: Order): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql =
        'INSERT INTO orders(user_id, status) VALUES ($1, $2) RETURNING user_id, status'
      const { user_id, status } = incoming
      const result = await conn.query(sql, [user_id, status])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`couldn't create order returning error: ${err}`)
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const result = await conn.query(sql, [orderId])
      conn.release()
      const order = result.rows[0]
      if (order === 'completed') {
        throw new Error("can't add a product to an expired order")
      }
    } catch (err) {
      throw new Error(`${err}`)
    }
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [quantity, orderId, productId])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `couldn't add product: ${productId} to order: ${orderId}: ${err}`
      )
    }
  }
}
