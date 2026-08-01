import { Link } from 'react-router-dom'

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

const MovieCard = ({ movie }) => {
  const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'

  return (
    <Link to={`/movies/${movie.id}`} className="movie-card-group">
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-900">
        <img src={poster} alt={movie.title} className="movie-card-image" />
        <div className="movie-card-overlay">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="badge-pill">HD</span>
            <span className="badge-pill">⭐ {movie.vote_average?.toFixed(1)}</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="badge-pill">Watch</span>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-500/95 text-white shadow-[0_12px_30px_rgba(229,9,20,0.24)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 7.5L16.2 12L9 16.5V7.5Z" fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-2 p-4">
        <h3 className="text-base font-semibold text-white truncate">{movie.title}</h3>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span>{movie.release_date?.slice(0, 4) || 'N/A'}</span>
          <span className="rounded-full bg-white/5 px-2 py-1">{movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
