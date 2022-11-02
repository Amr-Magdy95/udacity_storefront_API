import { Application, Request, Response } from 'express'
import { DashboardQueries } from '../services/dashboard'

const store = new DashboardQueries()
const userOrders = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await store.userOrders(id)
    res.json(result)
  } catch (err) {
    res.status(400).json({ error: `${err}` })
  }
}

export const dashboardRoutes = (app: Application) => {
  app.get('/users/:id/orders', userOrders)
}
