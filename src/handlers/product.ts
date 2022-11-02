import { ProductStore, Product } from '../models/product'
import { Application, Request, Response } from 'express'
import { verifyAuthToken } from '../middleware/authentication'
import { productValidator } from '../validators/productValidator'
import { idQuantityValidator } from '../validators/idValidator'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index()
    res.json(result)
  } catch (err) {
    res
      .status(400)
      .json({ error: `couldn't retrive products with error: ${err}` })
  }
}

const show = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    // validate id
    idQuantityValidator(id)
    //retrieve product with this id
    const result = await store.show(id)
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: ` ${err}` })
  }
}

const create = async (req: Request, res: Response) => {
  const { name, price } = req.body
  try {
    const product: Product = {
      name,
      price,
    }
    // validate product parameters
    productValidator(name, price)
    // create and return product
    const result = await store.create(product)
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: `${err}` })
  }
}

export const productRoutes = (app: Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
}
