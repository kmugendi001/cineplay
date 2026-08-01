# CinePlay - Premium Streaming Platform

A full-stack streaming platform featuring movies from TMDB and live football from football-data.org.

## Features

- **Movie Database**: Browse trending, popular, top-rated movies from TMDB
- **Search & Filters**: Advanced search with genre filtering
- **Movie Details**: Watch official streaming options, trailers, and ratings
- **Football Integration**: Live matches, fixtures, standings, and match details
- **Official Content**: All content served through legal watch-providers and official broadcasters
- **Caching & Rate Limiting**: Optimized backend with intelligent caching and rate limiting

## Tech Stack

### Frontend
- **React 18** with Vite build tool
- **Tailwind CSS** with custom CinePlay theme
- **React Router** for navigation
- **Axios** for API communication

### Backend
- **Node.js** with Express.js
- **TMDB API** for movie data
- **football-data.org API** for sports data
- **In-memory caching** with TTL support
- **Rate limiting** (120 req/60s)

## Prerequisites

- Node.js 18+
- npm or yarn

## Environment Setup

### Backend (.env)
```
TMDB_API_KEY=your_tmdb_key_here
FOOTBALL_API_KEY=your_football_data_key_here
PORT=4000
CLIENT_URL=http://localhost:5173
```

### Frontend (uses default localhost:4000/api)
No environment setup needed for local development.

## Local Development

### Start Backend
```bash
cd server
npm install
npm run dev
# Server runs on http://localhost:4000
```

### Start Frontend
```bash
cd client
npm install
npm run dev
# Client runs on http://localhost:5173
```

## API Endpoints

### Movies
- `GET /api/movies/trending` - Trending movies
- `GET /api/movies/popular` - Popular movies
- `GET /api/movies/top-rated` - Top-rated movies
- `GET /api/movies/upcoming` - Upcoming movies
- `GET /api/movies/search?query=...` - Search movies
- `GET /api/movies/:id` - Movie details with watch-providers
- `GET /api/movies/:id/videos` - Movie trailers

### Sports (Football)
- `GET /api/sports/live` - Live matches (today/in-play)
- `GET /api/sports/fixtures?dateFrom=...&dateTo=...` - Fixtures by date range
- `GET /api/sports/standings/:competition` - League standings
- `GET /api/sports/matches/:id` - Match details with official streams

## Deployment to Vercel

### Steps:
1. **Create GitHub Repository**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/cineplay.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit https://vercel.com
   - Sign in with GitHub
   - Click "Add New..." → "Project"
   - Select your CinePlay repository
   - Configure build settings:
     - Framework: Vite
     - Build Command: `npm run build --prefix client`
     - Output Directory: `client/dist`
     - Install Command: `npm install --prefix client && npm install --prefix server`
   - Add Environment Variables:
     - `TMDB_API_KEY` = your key
     - `FOOTBALL_API_KEY` = your key
   - Deploy

3. **Update Client API URL**
   - After deployment, update `client/src/services/api.js`:
   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-vercel-url.vercel.app/api'
   ```

## Project Structure

```
stream1/
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/      # Route pages
│   │   ├── components/ # Reusable components
│   │   ├── services/   # API services
│   │   └── hooks/      # Custom hooks
│   └── vite.config.js
├── server/              # Express backend
│   ├── controllers/    # Route handlers
│   ├── routes/         # API routes
│   ├── middleware/     # Express middleware
│   ├── utils/          # Utilities (cache)
│   ├── mocks/          # Fallback mock data
│   ├── config/         # Configuration
│   └── index.js
└── vercel.json         # Vercel deployment config
```

## License

MIT

## Support

For issues or questions, please create a GitHub issue.
