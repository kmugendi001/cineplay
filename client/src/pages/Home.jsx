import { useEffect, useState } from 'react'
import { fetchPopularMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../services/tmdbService'
import HeroBanner from '../components/HeroBanner'
import MovieRow from '../components/MovieRow'
import Loader from '../components/Loader'

const Home = () => {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true)
      try {
        const [trendingRes, popularRes, upcomingRes] = await Promise.all([
          fetchTrendingMovies(),
          fetchPopularMovies(),
          fetchUpcomingMovies(),
        ])
        setTrending(trendingRes.data.results.slice(0, 8))
        setPopular(popularRes.data.results.slice(0, 8))
        setUpcoming(upcomingRes.data.results.slice(0, 8))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  return (
    <div className="space-y-10 py-10">
      <HeroBanner />

      {loading ? (
        <Loader label="Fetching the latest movies..." />
      ) : (
        <div className="space-y-10">
          <MovieRow title="Trending now" description="Movies everyone is watching" movies={trending} loading={loading} />
          <MovieRow title="Popular" description="Top popular titles" movies={popular} loading={loading} />
          <MovieRow title="Upcoming" description="New releases to add to your watchlist" movies={upcoming} loading={loading} />
        </div>
      )}

      <section className="grid gap-8 xl:grid-cols-[2fr_1fr]">
        <aside className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_120px_-80px_rgba(255,255,255,0.3)] backdrop-blur-xl">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-red-400">Football</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Live Fixtures & Scores</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Football dashboard content will be integrated next, with fixtures, standings, and match details from football APIs.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
              <p className="text-sm font-semibold text-white">Today's Matches</p>
              <p className="mt-2 text-slate-400">Follow major league and international fixtures.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
              <p className="text-sm font-semibold text-white">Standings</p>
              <p className="mt-2 text-slate-400">League tables and live rankings.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-5 text-center text-sm text-slate-400">
            Reserved ad area
            <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-xs text-slate-500">
              Future advertisement placeholder
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

export default Home
