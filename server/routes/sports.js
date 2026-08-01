import express from 'express'
import { getLiveMatches, getFixturesByDate, getStandings, getMatchDetails } from '../controllers/sportsController.js'

const router = express.Router()

router.get('/live', getLiveMatches)
router.get('/fixtures', getFixturesByDate)
router.get('/standings', getStandings)
router.get('/standings/:competition', getStandings)
router.get('/matches/:id', getMatchDetails)

export default router
