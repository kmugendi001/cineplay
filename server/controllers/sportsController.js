import cache from '../utils/cache.js'
import { FOOTBALL_API_KEY } from '../config/index.js'
import { liveMatches as mockLive, fixturesByDate as mockFixtures, standingsMock } from '../mocks/sportsMocks.js'

const FOOTBALL_BASE = 'https://api.football-data.org/v4'

const footballFetch = async (endpoint, query = {}) => {
  // Dev fallback: return mock data if key is missing
  if (!FOOTBALL_API_KEY) {
    console.warn('FOOTBALL_API_KEY missing — returning mock data for', endpoint)
    // basic mapping
    if (endpoint.startsWith('/matches') && endpoint.includes('status=LIVE')) return mockLive()
    if (endpoint.startsWith('/matches')) return mockFixtures(query.date)
    if (endpoint.startsWith('/competitions') && endpoint.endsWith('/standings')) return standingsMock(parseInt(endpoint.split('/')[2], 10) || 200)
    return { message: 'mock' }
  }

  const url = new URL(`${FOOTBALL_BASE}${endpoint}`)
  Object.entries(query || {}).forEach(([k, v]) => v != null && url.searchParams.append(k, v))
  const res = await fetch(url.toString(), { headers: { 'X-Auth-Token': FOOTBALL_API_KEY } })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const e = new Error(err.message || 'Football API failed')
    e.status = res.status
    throw e
  }
  return res.json()
}

export const getLiveMatches = async (req, res, next) => {
  try {
    const cacheKey = 'sports:live'
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    // football-data: /matches?status=LIVE
    const data = await footballFetch('/matches', { status: 'LIVE' })
    cache.set(cacheKey, data, 1000 * 15) // 15s cache
    res.json(data)
  } catch (err) { next(err) }
}

export const getFixturesByDate = async (req, res, next) => {
  try {
    const date = req.query.date || new Date().toISOString().slice(0, 10)
    const cacheKey = `sports:fixtures:${date}`
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    const data = await footballFetch('/matches', { dateFrom: date, dateTo: date, date })
    cache.set(cacheKey, data, 1000 * 60) // 60s
    res.json(data)
  } catch (err) { next(err) }
}

export const getStandings = async (req, res, next) => {
  try {
    const competition = req.params.competition || req.query.competition || '200'
    const cacheKey = `sports:standings:${competition}`
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    const data = await footballFetch(`/competitions/${competition}/standings`)
    cache.set(cacheKey, data, 1000 * 60 * 5) // 5m
    res.json(data)
  } catch (err) { next(err) }
}

export const getMatchDetails = async (req, res, next) => {
  try {
    const id = req.params.id
    const cacheKey = `sports:match:${id}`
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    const data = await footballFetch(`/matches/${id}`)
    cache.set(cacheKey, data, 1000 * 60) // 1m
    res.json(data)
  } catch (err) { next(err) }
}

export default { getLiveMatches, getFixturesByDate, getStandings, getMatchDetails }
