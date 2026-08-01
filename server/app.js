import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import apiRoutes from './routes/api.js'
import { errorHandler } from './middleware/errorHandler.js'
import { CLIENT_URL } from './config/index.js'

const app = express()

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(helmet())
app.use(limiter)
app.use(cors({ origin: CLIENT_URL }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'CinePlay backend is running' })
})

app.use('/api', apiRoutes)
app.use(errorHandler)

export default app
