import { motion } from 'framer-motion';
import { useState } from 'react';
import type { DetectionLog } from '../types';

interface DashboardPageProps {
  stats: {
    totalDetections: number;
    activeModerators: number;
    playersScanned: number;
    cheatsToday: number;
  };
  logs: DetectionLog[];
  severityStyles: Record<DetectionLog['severity'], string>;
  onExport: () => void;
}

const DashboardPage = ({ stats, logs, severityStyles, onExport }: DashboardPageProps) => {
  const [filter, setFilter] = useState('');
  const cardData = [
    { key: 'Total Detections', value: stats.totalDetections.toLocaleString(), icon: '🚨' },
    { key: 'Active Moderators', value: stats.activeModerators.toLocaleString(), icon: '🛡️' },
    { key: 'Players Scanned', value: stats.playersScanned.toLocaleString(), icon: '🎮' },
    { key: 'Cheats Today', value: stats.cheatsToday.toLocaleString(), icon: '⚡' }
  ];

  const filteredLogs = logs.filter((log) => {
    const query = filter.toLowerCase();
    return (
      log.username.toLowerCase().includes(query) ||
      log.cheat.toLowerCase().includes(query) ||
      log.ip.toLowerCase().includes(query) ||
      log.hwid.toLowerCase().includes(query) ||
      log.severity.toLowerCase().includes(query) ||
      log.status.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-2">
        {cardData.map((card) => (
          <motion.div key={card.key} whileHover={{ y: -6 }} className="glass-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{card.key}</p>
                <p className="mt-4 text-4xl font-semibold text-white">{card.value}</p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-950/80 text-3xl text-cyan-300 shadow-glow">
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-card p-6">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Live detection feed</p>
            <h2 className="text-2xl font-semibold text-white">Incoming security events</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button onClick={onExport} className="rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              Export logs
            </button>
            <input
              type="search"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              placeholder="Search logs"
              className="min-w-[220px] rounded-3xl border border-slate-700/70 bg-slate-950/85 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-950/75">
          <div className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_1fr_1fr] gap-4 border-b border-slate-700/60 bg-slate-950/90 px-5 py-4 text-xs uppercase tracking-[0.22em] text-slate-500">
            <span>Username</span>
            <span>Cheat Detected</span>
            <span>Time</span>
            <span>IP</span>
            <span>HWID</span>
            <span>Severity</span>
            <span>Status</span>
          </div>

          <div className="divide-y divide-slate-800">
            {filteredLogs.length === 0 && (
              <div className="p-8 text-center text-slate-400">No detection logs match your filter.</div>
            )}
            {filteredLogs.map((log) => (
              <div key={log.id} className="grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-4 text-sm text-slate-200 transition hover:bg-slate-900/80">
                <div>
                  <p className="font-semibold text-white">{log.username}</p>
                  <p className="text-xs text-slate-500">{log.id}</p>
                </div>
                <div>{log.cheat}</div>
                <div>{log.time}</div>
                <div>{log.ip}</div>
                <div>{log.hwid}</div>
                <div className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium ${severityStyles[log.severity]}`}>{log.severity}</div>
                <div className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${log.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-300' : log.status === 'PENDING' ? 'bg-amber-500/10 text-amber-300' : 'bg-slate-700/10 text-slate-200'}`}>{log.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
