const GenreFilter = ({ genres, activeGenre, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect('')}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeGenre === '' ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          type="button"
          onClick={() => onSelect(genre.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeGenre === genre.id ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter
