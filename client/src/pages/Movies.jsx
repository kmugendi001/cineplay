import { useEffect, useState } from 'react'
import { discoverMovies, fetchGenres } from '../services/tmdbService'
import MovieCard from '../components/MovieCard'
import GenreFilter from '../components/GenreFilter'
import Loader from '../components/Loader'

const Movies = () => {
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [activeGenre, setActiveGenre] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const loadMovies = async (genre, pageNumber = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      const response = await discoverMovies(genre, pageNumber)
      const fetched = response.data.results
      setMovies((current) => (append ? [...current, ...fetched] : fetched))
      setTotalPages(response.data.total_pages)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    const initialize = async () => {
      try {
        const genreRes = await fetchGenres()
        setGenres(genreRes.data.genres)
      } catch (error) {
        console.error(error)
      }
    }

    initialize()
    loadMovies(activeGenre, 1, false)
  }, [])

  useEffect(() => {
    loadMovies(activeGenre, 1, false)
    setPage(1)
  }, [activeGenre])

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    loadMovies(activeGenre, nextPage, true)
  }

  return (
    <div className="space-y-8 py-10">
      <section className="rounded-[2rem] border border-white/10 bg-[#090909]/90 p-8 shadow-glow">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-red-400">Movies</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Browse the latest catalog</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Filter by genre, explore new releases, and open movie details for trailers, ratings, and overview.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <GenreFilter genres={genres} activeGenre={activeGenre} onSelect={setActiveGenre} />
        </div>
      </section>

      {loading ? (
        <Loader label="Loading movie catalog..." />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {movies.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
              No movies found for the selected genre.
            </div>
          )}

          {page < totalPages && (
            <div className="flex justify-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={loadingMore}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingMore ? 'Loading more...' : 'Load more movies'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Movies
