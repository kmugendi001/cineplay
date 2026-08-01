const SectionCard = ({ title, description, cta }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_120px_-80px_rgba(255,255,255,0.3)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-red-400">{title}</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{description}</h2>
        </div>
        {cta && (
          <button className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200 transition hover:bg-red-500/20">
            {cta}
          </button>
        )}
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-3xl border border-white/5 bg-slate-950/70 p-4 shadow-inner shadow-black/20">
            <div className="mb-4 h-44 rounded-3xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
            <p className="text-sm font-semibold text-white">Placeholder title</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">This card will show real content when the API integration is enabled.</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SectionCard
