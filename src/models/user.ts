import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
const { PEPPER, SALT_ROUNDS } = process.env
const saltRounds: string = SALT_ROUNDS || ''

export type User = {
  id?: string
  firstname: string
  lastname: string
  password: string
  email: string
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT firstname, lastname, email FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(` ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT firstname, lastname, email FROM users WHERE id = $1'
      const result = await conn.query(sql, [id])
      conn.release()
      if (result.rows[0] === undefined) {
        throw new Error("couldn't find user")
      }
      return result.rows[0]
    } catch (err) {
      throw new Error(`couldn't retrieve user with id: ${id} returning ${err}`)
    }
  }

  async create(incoming: User): Promise<User> {
    const { firstname, email, lastname, password } = incoming
    try {
      const conn = await Client.connect()
      // check whether a user is already created with given email
      const checkEmail = 'SELECT * FROM users WHERE email=($1)'
      const isRegistered = await conn.query(checkEmail, [email])
      if (isRegistered.rows.length) {
        throw new Error('a user with this email already exists')
      }
      // otherwise create user
      const sql =
        'INSERT INTO users(email, firstname, lastname, password_digest) VALUES($1, $2, $3,$4) RETURNING email, firstname, lastname'
      const temp = parseInt(saltRounds)
      const hash = bcrypt.hashSync(password + PEPPER, temp)
      const result = await conn.query(sql, [email, firstname, lastname, hash])

      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`couldn't create user with error: ${err}`)
    }
  }

  async authenticate(email: string, password: string): Promise<User | unknown> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users WHERE email=($1)'
      const result = await conn.query(sql, [email])
      // check whether a user with given email exists
      if (result.rows.length) {
        // if so compare whether password is correct
        const user = result.rows[0]
        if (bcrypt.compareSync(password + PEPPER, user.password_digest)) {
          return user
        }
        throw new Error('please enter valid credentials')
      } else {
        // if not notify client
        throw new Error(`there's not such user`)
      }
    } catch (err) {
      throw new Error(`${err}`)
    }
  }
}
