import { useEffect, useState } from 'react'
import { fetchFixtures, fetchLiveMatches, fetchStandings } from '../services/sportsService'

const Football = () => {
  const [liveMatches, setLiveMatches] = useState([])
  const [fixtures, setFixtures] = useState([])
  const [standings, setStandings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [liveRes, fixturesRes, standingsRes] = await Promise.all([
          fetchLiveMatches(),
          fetchFixtures(new Date().toISOString().slice(0, 10)),
          fetchStandings(200),
        ])

        setLiveMatches(liveRes.data.matches || [])
        setFixtures(fixturesRes.data.matches || [])
        setStandings(standingsRes.data.standings?.[0]?.table || [])
      } catch (error) {
        console.error('Failed to load football data', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const formatScore = (match) => {
    const home = match.score?.fullTime?.home ?? '?'
    const away = match.score?.fullTime?.away ?? '?'
    return `${home} - ${away}`
  }

  return (
    <div className="space-y-8 py-8">
      <section className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(229,9,20,0.18),_transparent_32%),linear-gradient(180deg,_rgba(10,10,10,0.95),_rgba(5,5,5,1))] p-8 shadow-glow">
        <p className="text-sm uppercase tracking-[0.28em] text-brand-400">Football</p>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Live match center</h1>
        <p className="mt-3 max-w-3xl text-slate-400">
          Discover live action, upcoming fixtures, and league standings from the backend sports endpoints, plus official broadcaster links where available.
        </p>
      </section>

      {loading ? (
        <div className="rounded-[24px] border border-white/10 bg-[#0f0f0f]/95 p-8 text-slate-300">Loading football feed…</div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Live matches</h2>
              <span className="badge-pill">LIVE</span>
            </div>

            {liveMatches.length ? (
              liveMatches.map((match) => (
                <article key={match.id} className="rounded-[20px] border border-white/10 bg-[#101010]/90 p-5 shadow-[0_24px_80px_-48px_rgba(255,255,255,0.12)]">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>{match.competition?.name || 'Competition'}</span>
                    <span>{match.minute ? `${match.minute}'` : match.status}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-semibold text-white">{match.homeTeam?.name}</p>
                    </div>
                    <div className="rounded-full bg-brand-500/15 px-4 py-2 text-sm font-semibold text-brand-200">
                      {formatScore(match)}
                    </div>
                    <div className="flex-1 text-right">
                      <p className="font-semibold text-white">{match.awayTeam?.name}</p>
                    </div>
                  </div>
                  {match.officialStreams?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {match.officialStreams.map((stream) => (
                        <a key={stream.url} href={stream.url} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-brand-400 hover:text-brand-200">
                          {stream.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))
            ) : (
              <div className="rounded-[20px] border border-white/10 bg-[#101010]/90 p-6 text-slate-400">
                No live matches right now.
              </div>
            )}
          </section>

          <section className="space-y-6">
            <div className="rounded-[20px] border border-white/10 bg-[#101010]/90 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Upcoming fixtures</h2>
                <span className="badge-pill">Today</span>
              </div>
              <div className="mt-4 space-y-3">
                {fixtures.length ? (
                  fixtures.map((match) => (
                    <div key={match.id} className="rounded-[16px] border border-white/10 bg-black/20 p-4">
                      <p className="text-sm text-slate-400">{match.competition?.name}</p>
                      <p className="mt-2 font-medium text-white">{match.homeTeam?.name} vs {match.awayTeam?.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">{match.utcDate?.slice(0, 10)}</p>
                      {match.officialStreams?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {match.officialStreams.map((stream) => (
                            <a key={stream.url} href={stream.url} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 transition hover:border-brand-400 hover:text-brand-200">
                              {stream.label}
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400">No fixtures available.</p>
                )}
              </div>
            </div>

            <div className="rounded-[20px] border border-white/10 bg-[#101010]/90 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Standings</h2>
                <span className="badge-pill">League</span>
              </div>
              <div className="mt-4 space-y-2">
                {standings.length ? (
                  standings.map((row) => (
                    <div key={row.team?.id || row.position} className="flex items-center justify-between rounded-[14px] border border-white/10 bg-black/20 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{row.position}. {row.team?.name}</p>
                      </div>
                      <div className="text-sm text-slate-400">{row.points} pts</div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400">No standings available yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default Football
