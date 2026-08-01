const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.18),_transparent_36%),linear-gradient(180deg,_rgba(10,10,10,0.94),_rgba(5,5,5,1))] p-8 shadow-glow sm:p-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.06),_transparent_18%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl">
        <p className="mb-4 inline-flex rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-brand-200">
          Premium streaming
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Cinema-grade entertainment for movies, series, and live sports.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          Immerse yourself in a polished dark interface with cinematic cards, rich detail, and fast discovery across every screen.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/movies" className="btn-primary">
            Browse movies
          </a>
          <a href="/football" className="btn-secondary">
            See football
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
