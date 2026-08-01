import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import apiRoutes from './routes/api.js'
import { errorHandler } from './middleware/errorHandler.js'
import { PORT, CLIENT_URL } from './config/index.js'

const app = express()

// Basic rate limiter to protect external API calls and the server
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120, // limit each IP to 120 requests per windowMs
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
