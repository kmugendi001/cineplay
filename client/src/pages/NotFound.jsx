import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-6 px-4 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-red-400">404 error</p>
      <h1 className="text-5xl font-semibold text-white sm:text-6xl">Page not found</h1>
      <p className="max-w-xl text-base leading-8 text-slate-400">
        The page you are looking for does not exist yet. Head back to the home screen and continue exploring.
      </p>
      <Link
        to="/"
        className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
