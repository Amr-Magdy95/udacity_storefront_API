import dotenv from 'dotenv'
import { Pool } from 'pg'

// in order to be able to use env variables
dotenv.config()

// retrieving env variables
const {
  POSTGRES_HOST,
  POSTGRES_DB_DEV,
  POSTGRES_USER_DEV,
  POSTGRES_PASSWORD_DEV,
  ENV,
  POSTGRES_DB_TEST,
  POSTGRES_USER_TEST,
  POSTGRES_PASSWORD_TEST,
} = process.env

let client: Pool = new Pool({})
// initiating a connection with the database
if (ENV?.trim() == 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_DEV,
    user: POSTGRES_USER_DEV,
    password: POSTGRES_PASSWORD_DEV,
  })
}

if (ENV?.trim() == 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER_TEST,
    password: POSTGRES_PASSWORD_TEST,
  })
}

export default client
