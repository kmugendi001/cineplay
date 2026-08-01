import api from './api'

export const fetchTrendingMovies = (page = 1) => api.get('/movies/trending', { params: { page } })
export const fetchPopularMovies = (page = 1) => api.get('/movies/popular', { params: { page } })
export const fetchTopRatedMovies = (page = 1) => api.get('/movies/top-rated', { params: { page } })
export const fetchUpcomingMovies = (page = 1) => api.get('/movies/upcoming', { params: { page } })
export const fetchGenres = () => api.get('/movies/genres')
export const discoverMovies = (genre, page = 1) => {
  const params = genre ? { genre, page } : { page }
  return api.get('/movies/discover', { params })
}
export const searchMovies = (query, page = 1) => api.get('/movies/search', { params: { q: query, page } })
export const fetchMovieDetails = (id) => api.get(`/movies/${id}`)
export const fetchMovieVideos = (id) => api.get(`/movies/${id}/videos`)
