import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Movies', path: '/movies' },
  { label: 'Football', path: '/football' },
  { label: 'Search', path: '/search' },
]

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080808]/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 text-sm sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-brand-500 shadow-[0_18px_40px_rgba(229,9,20,0.28)]">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 7.5L16.2 12L9 16.5V7.5Z" fill="currentColor" />
              <path d="M5.25 6.5H7.5V4.5H5.25C4.284 4.5 3.5 5.284 3.5 6.25V17.75C3.5 18.716 4.284 19.5 5.25 19.5H7.5V17.5H5.25C5.112 17.5 5 17.388 5 17.25V6.75C5 6.612 5.112 6.5 5.25 6.5Z" fill="rgba(255,255,255,0.18)" />
            </svg>
          </span>
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1 text-lg font-semibold uppercase tracking-[0.2em] text-white">
              <span>CINE</span>
              <span className="text-brand-500">PLAY</span>
            </div>
            <span className="text-xs uppercase tracking-[0.35em] text-slate-500">
              MOVIES • SERIES • SPORTS • LIVE
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="transition text-slate-200 hover:text-brand-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-white/10">
            Login
          </button>
          <button className="rounded-full bg-brand-500 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white transition hover:bg-[#ff3333]">
            Register
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
