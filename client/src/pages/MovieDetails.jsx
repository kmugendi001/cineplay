import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchMovieDetails, fetchMovieVideos } from '../services/tmdbService'
import Loader from '../components/Loader'

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original'

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [videoKey, setVideoKey] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true)
      try {
        const [movieRes, videoRes] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieVideos(id),
        ])

        setMovie(movieRes.data)
        const trailer = videoRes.data.results.find(
          (item) => item.site === 'YouTube' && item.type === 'Trailer'
        )
        setVideoKey(trailer?.key || null)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadMovie()
  }, [id])

  if (loading) {
    return <Loader label="Loading movie details..." />
  }

  if (!movie) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
        Unable to load movie details.
      </div>
    )
  }

  const providers = movie.watch_providers?.results?.US
  const providerSections = [
    { key: 'flatrate', label: 'Streaming' },
    { key: 'rent', label: 'Rent' },
    { key: 'buy', label: 'Buy' },
  ]

  return (
    <div className="space-y-10 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-red-400">Movie Details</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">{movie.title}</h1>
          <p className="mt-2 max-w-3xl text-slate-400">{movie.tagline || 'Explore the official overview, trailer, and legal viewing options.'}</p>
        </div>
        <Link to="/movies" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:border-red-500 hover:text-red-300">
          Back to movies
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          {videoKey ? (
            <div className="aspect-video overflow-hidden rounded-3xl bg-black shadow-lg shadow-black/40">
              <iframe
                title="Movie trailer"
                src={`https://www.youtube.com/embed/${videoKey}?rel=0&modestbranding=1`}
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl bg-slate-950/80 text-slate-400">
              No trailer available yet.
            </div>
          )}

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_-45px_rgba(255,255,255,0.25)]">
            <h2 className="text-2xl font-semibold text-white">Overview</h2>
            <p className="mt-4 leading-7 text-slate-300">{movie.overview}</p>
          </div>
        </div>

        <aside className="space-y-6 rounded-3xl border border-white/10 bg-[#090909]/90 p-6 shadow-glow">
          <img
            src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
            alt={movie.title}
            className="w-full rounded-3xl object-cover"
          />

          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Rating</p>
              <p className="mt-2 text-3xl font-semibold text-white">{movie.vote_average?.toFixed(1)} / 10</p>
            </div>

            <div className="space-y-3 rounded-3xl bg-slate-950/80 p-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Release</span>
                <span>{movie.release_date}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Runtime</span>
                <span>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-3 text-xs text-slate-300">
                {movie.genres?.map((genre) => (
                  <span key={genre.id} className="rounded-full bg-white/5 px-3 py-2">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950/80 p-5 text-sm text-slate-300">
              <p className="font-semibold text-white">Official availability</p>
              <p className="mt-2 text-slate-400">This UI surfaces legal watch-provider data where available.</p>
              {providers ? (
                <div className="mt-4 space-y-3">
                  {providerSections.map((section) => {
                    const items = providers[section.key]
                    if (!items?.length) return null
                    return (
                      <div key={section.key}>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{section.label}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {items.map((provider) => (
                            <span key={provider.provider_id} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white">
                              {provider.provider_name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">No official watch-provider data is available yet for this title.</p>
              )}
            </div>

            <div className="rounded-3xl bg-slate-950/80 p-5 text-sm text-slate-300">
              <p className="font-semibold text-white">Status</p>
              <p className="mt-2">{movie.status}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default MovieDetails
