// Minimal mock data for football/sports endpoints used in dev fallback
export const sampleTeam = (id, name) => ({
  id,
  name,
  shortName: name.split(' ')[0],
  crest: '/team_logo.png',
})

export const liveMatches = () => ({
  count: 2,
  matches: [
    {
      id: 1,
      utcDate: new Date().toISOString(),
      status: 'LIVE',
      competition: { id: 100, name: 'Mock League' },
      homeTeam: sampleTeam(11, 'Mock United'),
      awayTeam: sampleTeam(12, 'Sample City'),
      score: { fullTime: { home: 1, away: 0 }, winner: null },
      minute: 63,
      officialStreams: [
        { label: 'Official highlights', url: 'https://www.youtube.com/results?search_query=official+highlights+mock+league' },
        { label: 'Competition broadcaster', url: 'https://www.youtube.com/results?search_query=mock+league+official+broadcast' },
      ],
    },
    {
      id: 2,
      utcDate: new Date().toISOString(),
      status: 'LIVE',
      competition: { id: 101, name: 'Friendly Cup' },
      homeTeam: sampleTeam(21, 'Example FC'),
      awayTeam: sampleTeam(22, 'Demo Rovers'),
      score: { fullTime: { home: 0, away: 2 }, winner: null },
      minute: 28,
      officialStreams: [
        { label: 'Official match center', url: 'https://www.youtube.com/results?search_query=friendly+cup+official+match' },
      ],
    },
  ],
})

export const fixturesByDate = (dateStr = null) => ({
  count: 1,
  matches: [
    {
      id: 300,
      utcDate: dateStr || new Date().toISOString(),
      status: 'SCHEDULED',
      competition: { id: 200, name: 'Sample League' },
      homeTeam: sampleTeam(31, 'Alpha FC'),
      awayTeam: sampleTeam(32, 'Beta United'),
      score: { fullTime: { home: null, away: null }, winner: null },
      officialStreams: [
        { label: 'Official broadcaster', url: 'https://www.youtube.com/results?search_query=alpha+fc+beta+united+official+broadcast' },
      ],
    },
  ],
})

export const standingsMock = (competitionId = 200) => ({
  competition: { id: competitionId, name: 'Sample League' },
  season: { id: 1 },
  standings: [
    {
      type: 'TOTAL',
      table: [
        { position: 1, team: sampleTeam(31, 'Alpha FC'), points: 42, playedGames: 20 },
        { position: 2, team: sampleTeam(32, 'Beta United'), points: 39, playedGames: 20 },
      ],
    },
  ],
})

export default { liveMatches, fixturesByDate, standingsMock }
