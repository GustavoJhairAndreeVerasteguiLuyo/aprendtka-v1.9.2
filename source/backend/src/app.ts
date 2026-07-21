import express, { RequestHandler } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'

const securityMiddleware: RequestHandler = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')

  next()
}

const app = express()

// Middlewares globales
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

// Seguridad
app.use(securityMiddleware)

// Rutas
app.use('/api/auth', authRoutes)

export default app