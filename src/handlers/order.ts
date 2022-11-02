import { Application, Request, Response } from 'express'
import { OrderStore, Order } from '../models/order'
import { idQuantityValidator } from '../validators/idValidator'
import { verifyAuthToken } from '../middleware/authentication'
const store = new OrderStore()

const index = async (req: Request, res: Response) => {
  try {
    const result = await store.index()
    res.json(result)
  } catch (err) {
    throw new Error(`couldn't fetch orders with error: ${err}`)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    // check validity of id
    idQuantityValidator(id)
    //fetch and return order
    const result = await store.show(id)
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: `${err}` })
  }
}
const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id,
    }
    // Check the validity of status and user_id
    if (order.status === 'completed' || order.status === 'incomplete') {
      console.log("valid");
    } else {
      throw new Error('please enter a valid order status')
    }
    idQuantityValidator(order.user_id)
    // create and return order
    const result = await store.create(order)
    res.json(result)
  } catch (err) {
    res.status(400).json(`${err}`)
  }
}

const addProduct = async (req: Request, res: Response) => {
  try {
    const { order_id } = req.params
    const { quantity, product_id } = req.body
    // check the validity of order_id, product_id and quantity
    idQuantityValidator(order_id)
    idQuantityValidator(product_id)
    idQuantityValidator(quantity, 'quantity')
    // store product to that order
    const result = await store.addProduct(quantity, order_id, product_id)
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: `${err}` })
  }
}

export const orderRoutes = (app: Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.post('/orders', verifyAuthToken, create)
  app.post('/orders/:order_id/products', verifyAuthToken, addProduct)
}
