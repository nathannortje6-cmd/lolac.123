interface TopbarProps {
  currentTime: string;
  notificationCount: number;
}

const Topbar = ({ currentTime, notificationCount }: TopbarProps) => {
  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-slate-700/50 bg-slate-900/65 p-4 shadow-glow backdrop-blur-xl md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Current session</p>
        <h2 className="text-xl font-semibold text-white">Futuristic monitoring hub</h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-3xl border border-slate-700/40 bg-slate-950/70 px-4 py-3 text-sm text-slate-300 shadow-inner">
          <span className="block text-slate-500">Real-time clock</span>
          <span className="font-semibold text-white">{currentTime}</span>
        </div>

        <button className="group inline-flex items-center gap-2 rounded-3xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200 transition-colors duration-300 hover:bg-cyan-500/15">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.45)]"></span>
          {notificationCount} Alerts
        </button>

        <div className="flex items-center gap-3 rounded-3xl border border-slate-700/50 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 shadow-glow">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-xl text-cyan-300">⚡</div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Moderator</p>
            <p className="font-medium text-white">Nexus Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
