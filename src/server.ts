import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { userRoutes } from './handlers/user'
import { productRoutes } from './handlers/product'
import { orderRoutes } from './handlers/order'
import { dashboardRoutes } from './handlers/dashboard'

const app: express.Application = express()
const address = '0.0.0.0:3000'

app.use(cors())
app.use(bodyParser.json())

// Routes
userRoutes(app)
productRoutes(app)
orderRoutes(app)
dashboardRoutes(app)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})

export default app
