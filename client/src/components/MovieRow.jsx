import MovieCard from './MovieCard'

const MovieRow = ({ title, movies, loading, description }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.26em] text-red-400">{title}</p>
          <p className="mt-2 text-xl font-semibold text-white">{description}</p>
        </div>
      </div>
      {loading ? (
        <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="glass-panel h-80 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}

export default MovieRow
