import Client from '../database'

export type Product = {
  id?: string
  name: string
  price: number
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(` ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products WHERE id = ($1) '
      const result = await conn.query(sql, [id])
      if (result.rows[0] === undefined) {
        throw new Error("couldn't find product")
      }
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  async create(incoming: Product): Promise<Product> {
    try {
      const conn = await Client.connect()
      const sql =
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *'
      const result = await conn.query(sql, [incoming.name, incoming.price])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`${err}`)
    }
  }
}
