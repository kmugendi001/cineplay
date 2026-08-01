import express from 'express'
import { getHealth } from '../controllers/healthController.js'
import movieRoutes from './movies.js'
import sportsRoutes from './sports.js'

const router = express.Router()

router.get('/', getHealth)
router.use('/movies', movieRoutes)
router.use('/sports', sportsRoutes)

export default router
