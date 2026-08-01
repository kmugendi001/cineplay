import cache from '../utils/cache.js'
import { TMDB_API_KEY } from '../config/index.js'
import { getMock } from '../mocks/tmdbMocks.js'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

const tmdbFetch = async (endpoint, query = {}) => {
  // Dev fallback: if no API key is provided, return local mock data
  if (!TMDB_API_KEY) {
    console.warn('TMDB_API_KEY missing — returning mock data for', endpoint)
    return getMock(endpoint, query)
  }

  const params = new URLSearchParams({ api_key: TMDB_API_KEY, language: 'en-US', ...query })
  const url = `${TMDB_BASE_URL}${endpoint}?${params.toString()}`

  const res = await fetch(url)
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    const e = new Error(error.status_message || 'TMDB API request failed')
    e.status = res.status
    throw e
  }

  return res.json()
}

export const getTrendingMovies = async (req, res, next) => {
  try {
    const cacheKey = `trending:page:${req.query.page || 1}`
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    const data = await tmdbFetch('/trending/movie/week', { page: req.query.page || 1 })
    cache.set(cacheKey, data, 1000 * 30) // 30s cache
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export const getPopularMovies = async (req, res, next) => {
  try {
    const cacheKey = `popular:page:${req.query.page || 1}`
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    const data = await tmdbFetch('/movie/popular', { page: req.query.page || 1 })
    cache.set(cacheKey, data, 1000 * 60) // 60s cache
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export const getTopRatedMovies = async (req, res, next) => {
  try {
    const cacheKey = `toprated:page:${req.query.page || 1}`
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    const data = await tmdbFetch('/movie/top_rated', { page: req.query.page || 1 })
    cache.set(cacheKey, data, 1000 * 60) // 60s cache
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export const getUpcomingMovies = async (req, res, next) => {
  try {
    const cacheKey = `upcoming:page:${req.query.page || 1}`
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    const data = await tmdbFetch('/movie/upcoming', { page: req.query.page || 1 })
    cache.set(cacheKey, data, 1000 * 60) // 60s cache
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export const getGenres = async (req, res, next) => {
  try {
    const cacheKey = `genres:list`
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    const data = await tmdbFetch('/genre/movie/list')
    cache.set(cacheKey, data, 1000 * 60 * 60) // 1h cache
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export const searchMovies = async (req, res, next) => {
  try {
    const query = req.query.q || ''
    const cacheKey = `search:q:${query}:page:${req.query.page || 1}`
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    const data = await tmdbFetch('/search/movie', { query, page: req.query.page || 1, include_adult: false })
    cache.set(cacheKey, data, 1000 * 30) // 30s cache
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export const getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params
    const cacheKey = `movie:${id}:details`
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    const data = await tmdbFetch(`/movie/${id}`, {})
    const providers = await tmdbFetch(`/movie/${id}/watch/providers`, {})
    const enriched = {
      ...data,
      watch_providers: providers || null,
    }

    cache.set(cacheKey, enriched, 1000 * 60 * 5) // 5m cache
    res.json(enriched)
  } catch (error) {
    next(error)
  }
}

export const getMovieVideos = async (req, res, next) => {
  try {
    const { id } = req.params
    const cacheKey = `movie:${id}:videos`
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    const data = await tmdbFetch(`/movie/${id}/videos`, {})
    cache.set(cacheKey, data, 1000 * 60 * 10) // 10m cache
    res.json(data)
  } catch (error) {
    next(error)
  }
}

export const discoverMovies = async (req, res, next) => {
  try {
    const { genre, page } = req.query
    const query = { sort_by: 'popularity.desc', page: page || 1 }
    if (genre) query.with_genres = genre
    const cacheKey = `discover:genre:${genre || 'all'}:page:${page || 1}`
    const cached = cache.get(cacheKey)
    if (cached) return res.json(cached)

    const data = await tmdbFetch('/discover/movie', query)
    cache.set(cacheKey, data, 1000 * 60) // 60s cache
    res.json(data)
  } catch (error) {
    next(error)
  }
}
