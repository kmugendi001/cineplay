import api from './api'

export const fetchLiveMatches = () => api.get('/sports/live')
export const fetchFixtures = (date) => api.get('/sports/fixtures', { params: { date } })
export const fetchStandings = (competition = 200) => api.get(`/sports/standings/${competition}`)
export const fetchMatchDetails = (id) => api.get(`/sports/matches/${id}`)
