import type { SidebarItem } from '../types';

interface SidebarProps {
  activeKey: string;
  items: SidebarItem[];
  onSelect: (key: string) => void;
}

const Sidebar = ({ activeKey, items, onSelect }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-72 border-r border-slate-700/60 bg-slate-950/95 px-6 py-8 shadow-[0_20px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:w-72">
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-500 text-2xl shadow-glow">
          L
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">lolac</p>
          <h1 className="text-xl font-semibold text-white">Moderator Panel</h1>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            className={`group flex w-full items-center gap-4 rounded-3xl px-4 py-3 text-left text-sm transition-all duration-300 ${
              activeKey === item.key
                ? 'bg-cyan-500/10 text-cyan-300 shadow-[0_0_0_1px_rgba(10,182,255,0.18)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}>
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-10 rounded-3xl border border-slate-700/60 bg-slate-900/70 p-5 text-sm text-slate-300 shadow-glow">
        <p className="mb-2 uppercase tracking-[0.24em] text-slate-500">Threat status</p>
        <p className="text-white">All systems monitored. 3 anomalies flagged in last 15 minutes.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
