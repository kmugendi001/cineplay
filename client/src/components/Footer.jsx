const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#080808] px-4 py-12 text-sm text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-4">
        <div className="space-y-4">
          <p className="text-xl font-semibold uppercase tracking-[0.24em] text-white">CinePlay</p>
          <p className="text-slate-400">
            Luxury streaming for movies, series, and live sports with cinematic polish and modern simplicity.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Explore</p>
          <ul className="space-y-2 text-slate-400">
            <li>Home</li>
            <li>Movies</li>
            <li>Football</li>
            <li>Search</li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Support</p>
          <ul className="space-y-2 text-slate-400">
            <li>Help Center</li>
            <li>Contact</li>
            <li>API Status</li>
            <li>Privacy</li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Legal</p>
          <ul className="space-y-2 text-slate-400">
            <li>Terms</li>
            <li>Cookies</li>
            <li>Security</li>
            <li>Licenses</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
        © 2026 CinePlay. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
