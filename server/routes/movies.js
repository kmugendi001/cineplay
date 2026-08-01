import express from 'express'
import {
  discoverMovies,
  getGenres,
  getMovieDetails,
  getMovieVideos,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
  searchMovies,
} from '../controllers/moviesController.js'

const router = express.Router()

router.get('/trending', getTrendingMovies)
router.get('/popular', getPopularMovies)
router.get('/top-rated', getTopRatedMovies)
router.get('/upcoming', getUpcomingMovies)
router.get('/genres', getGenres)
router.get('/discover', discoverMovies)
router.get('/search', searchMovies)
router.get('/:id', getMovieDetails)
router.get('/:id/videos', getMovieVideos)

export default router
