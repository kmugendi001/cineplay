// Minimal TMDB mock responses for offline/dev usage
const sampleMovie = (id) => ({
  id,
  title: `Sample Movie ${id}`,
  poster_path: '/sample_poster.jpg',
  vote_average: 7.4,
  release_date: '2024-01-01',
})

const trending = {
  page: 1,
  results: Array.from({ length: 8 }).map((_, i) => sampleMovie(100 + i)),
  total_pages: 1,
  total_results: 8,
}

const popular = {
  page: 1,
  results: Array.from({ length: 8 }).map((_, i) => sampleMovie(200 + i)),
  total_pages: 1,
  total_results: 8,
}

const genres = { genres: [ { id: 28, name: 'Action' }, { id: 35, name: 'Comedy' }, { id: 18, name: 'Drama' } ] }

const discover = {
  page: 1,
  results: Array.from({ length: 8 }).map((_, i) => sampleMovie(300 + i)),
  total_pages: 1,
  total_results: 8,
}

const search = (q) => ({
  page: 1,
  results: Array.from({ length: 6 }).map((_, i) => ({ ...sampleMovie(400 + i), title: `${q || 'Search'} Result ${i + 1}` })),
  total_pages: 1,
  total_results: 6,
})

const watchProviders = {
  results: {
    US: {
      flatrate: [{ provider_id: 8, provider_name: 'Prime Video' }],
      rent: [{ provider_id: 2, provider_name: 'Apple TV' }],
      buy: [{ provider_id: 3, provider_name: 'Google Play Movies' }],
    },
  },
}

const movieDetails = (id) => ({
  id,
  title: `Sample Movie ${id}`,
  overview: 'This is a mock overview used for local development when TMDB API key is not configured.',
  poster_path: '/sample_poster.jpg',
  vote_average: 7.4,
  runtime: 120,
  release_date: '2024-01-01',
  genres: [ { id: 28, name: 'Action' } ],
  status: 'Released',
  watch_providers: watchProviders,
})

const movieVideos = (id) => ({
  id,
  results: [ { id: `vid-${id}-1`, key: 'dQw4w9WgXcQ', name: 'Official Trailer', site: 'YouTube', type: 'Trailer' } ],
})

export function getMock(endpoint, query = {}) {
  if (endpoint.startsWith('/trending')) return trending
  if (endpoint.startsWith('/movie/popular')) return popular
  if (endpoint.startsWith('/movie/top_rated')) return popular
  if (endpoint.startsWith('/movie/upcoming')) return popular
  if (endpoint.startsWith('/genre')) return genres
  if (endpoint.startsWith('/discover')) return discover
  if (endpoint.startsWith('/search')) return search(query.query || '')
  const m = endpoint.match(/^\/movie\/(\d+)(?:\/videos)?$/)
  if (m) {
    const id = parseInt(m[1], 10)
    if (endpoint.endsWith('/videos')) return movieVideos(id)
    return movieDetails(id)
  }
  if (endpoint.match(/^\/movie\/\d+\/watch\/providers$/)) {
    return watchProviders
  }
  // default fallback
  return { page: 1, results: [ sampleMovie(999) ], total_pages: 1, total_results: 1 }
}

export default { getMock }
