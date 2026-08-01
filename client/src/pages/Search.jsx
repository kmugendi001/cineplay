import { useEffect, useState } from 'react'
import { searchMovies } from '../services/tmdbService'
import useDebounce from '../hooks/useDebounce'
import MovieCard from '../components/MovieCard'
import Loader from '../components/Loader'

const Search = () => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([])
      return
    }

    const loadSearch = async () => {
      setLoading(true)
      try {
        const response = await searchMovies(debouncedQuery)
        setResults(response.data.results)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadSearch()
  }, [debouncedQuery])

  return (
    <div className="space-y-8 py-10">
      <section className="rounded-[2rem] border border-white/10 bg-[#090909]/90 p-8 shadow-glow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-red-400">Search</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Find your next movie</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Search movies instantly with TMDB metadata. Results update automatically as you type.
            </p>
          </div>
        </div>

        <div className="mt-6 search-field">
          <label className="sr-only" htmlFor="search-query">
            Search movies
          </label>
          <svg viewBox="0 0 24 24" className="pointer-events-none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Zm8.5 1.5L16 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            id="search-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for movies, genres, or actors"
            className="w-full rounded-[18px] border border-white/10 bg-[#111111] py-4 pl-14 pr-5 text-white outline-none transition duration-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-400/20"
          />
        </div>
      </section>

      {loading ? (
        <Loader label="Searching for movies..." />
      ) : debouncedQuery.trim() ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.length ? (
            results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
              No results found for “{debouncedQuery}”. Try another title or genre.
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
          Start typing to search for movies from TMDB.
        </div>
      )}
    </div>
  )
}

export default Search
