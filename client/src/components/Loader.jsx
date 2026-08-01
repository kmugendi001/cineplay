const Loader = ({ label = 'Loading...' }) => {
  return (
    <div className="flex min-h-[240px] items-center justify-center rounded-[24px] border border-white/10 bg-[#0f0f0f]/95 p-8 text-slate-300 shadow-[0_24px_80px_-50px_rgba(255,255,255,0.16)]">
      <div className="space-y-4 text-center">
        <div className="dot-pulse">
          <span />
          <span />
          <span />
        </div>
        <p className="text-sm text-slate-300">{label}</p>
      </div>
    </div>
  )
}

export default Loader
