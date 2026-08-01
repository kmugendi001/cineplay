import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 4000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'
const TMDB_API_KEY = process.env.TMDB_API_KEY || ''
const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY || ''

if (!TMDB_API_KEY) {
  console.warn('Warning: TMDB_API_KEY is not set. TMDB endpoints will fail without a valid API key.')
}

export { PORT, CLIENT_URL, TMDB_API_KEY }

export { FOOTBALL_API_KEY }
