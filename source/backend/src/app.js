import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

const app = express()

app.use(helmet())

app.use(cors())

app.use(compression())

app.use(express.json())

app.use('/api/auth', authRoutes)

export default app
