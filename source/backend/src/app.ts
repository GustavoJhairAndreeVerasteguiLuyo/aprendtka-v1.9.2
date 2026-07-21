declare module 'express'
declare module 'cors'
declare module 'cookie-parser'

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'

const securityMiddleware: express.RequestHandler = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  next()
}

const app = express()

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}))

app.use(securityMiddleware)

app.use('/api/auth', authRoutes)

export default app
