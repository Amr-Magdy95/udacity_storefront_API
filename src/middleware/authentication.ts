import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export const verifyAuthToken = async (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  try {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader?.split(' ')[1] || ''
    const tokenSecret = process.env.TOKEN_SECRET || ''
    jwt.verify(token, tokenSecret)
    next()
  } catch (err) {
    res.status(401)
    res.json(`Invalid token: ${err}`)
  }
}
