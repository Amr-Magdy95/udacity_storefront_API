import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { verifyAuthToken } from '../middleware/authentication'
import { userValidator } from '../validators/userValidator'
import { idQuantityValidator } from '../validators/idValidator'

dotenv.config()

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    // ID validation
    idQuantityValidator(id)
    // Look for user with id
    const user = await store.show(id)
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: `${err}` })
  }
}

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    email: req.body.email,
  }
  try {
    // User Validation
    userValidator(user.firstname, user.lastname, user.email, user.password)
    // Creating a user and returning the newly created user
    const result = await store.create(user)
    res.json(result)
  } catch (err) {
    res.status(400)
    res.json({ error: `${err} ` })
  }
}

export const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    email: req.body.email,
  }
  try {
    // User Validation
    userValidator(user.firstname, user.lastname, user.email, user.password)
    // Authenticating user and returning a token
    const result = await store.authenticate(user.email, user.password)
    const tokenSecret: string = process.env.TOKEN_SECRET || ''
    const token = jwt.sign({ user: result }, tokenSecret)
    res.json(token)
  } catch (err) {
    res.status(400)
    res.json({ error: `${err}` })
  }
}

// Routes for above methods
export const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users', create)
  app.post('/users/auth', authenticate)
}
