import Client from '../database'
import { Order } from '../models/order'

export class DashboardQueries {
  async userOrders(userId: string): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders WHERE orders.user_id = ($1) '
      const result = await conn.query(sql, [userId])
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`${err}`)
    }
  }
}
