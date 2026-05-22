import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { fetchLogs, loginModerator, sendAlert as sendAlertApi } from './api';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Toast from './components/Toast';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import {
  initialTheme,
  sidebarItems,
  severityStyles,
  systemStatus
} from './data/mock';
import type { DetectionLog, EmailSettings, ThemeMode } from './types';

const defaultEmailSettings: EmailSettings = {
  moderatorEmail: '',
  serviceId: '',
  templateId: '',
  publicKey: '',
  smtpServer: '',
  smtpPort: '',
  alertEnabled: false
};

const App = () => {
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('lolac-auth') === 'true');
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [logs, setLogs] = useState<DetectionLog[]>([]);
  const [emailSettings, setEmailSettings] = useState<EmailSettings>(() => {
    const saved = localStorage.getItem('lolac-email-settings');
    return saved ? JSON.parse(saved) : defaultEmailSettings;
  });
  const [theme, setTheme] = useState<ThemeMode>(() => (localStorage.getItem('lolac-theme') as ThemeMode) || initialTheme);
  const [toastQueue, setToastQueue] = useState<Array<{ id: string; message: string; type: 'success' | 'error' }>>([]);

  const stats = useMemo(
    () => ({
      totalDetections: logs.length,
      activeModerators: authenticated ? 1 : 0,
      playersScanned: 0,
      cheatsToday: logs.length
    }),
    [authenticated, logs.length]
  );

  // Keep the document theme up to date for the dark/light toggle.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('lolac-theme', theme);
  }, [theme]);

  // Store email settings in local storage so user values persist.
  useEffect(() => {
    localStorage.setItem('lolac-email-settings', JSON.stringify(emailSettings));
  }, [emailSettings]);

  // Real-time clock updates every second.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Attempt to load logs from the backend on authentication.
  useEffect(() => {
    if (!authenticated) return;

    fetchLogs()
      .then((remoteLogs) => {
        setLogs(remoteLogs);
      })
      .catch(() => {
        setToastQueue((state) => [...state, { id: 'backend-unavailable', message: 'Unable to load logs from backend.', type: 'error' }].slice(-3));
      });
  }, [authenticated]);

  const handleLogin = async (username: string, password: string, remember: boolean) => {
    if (!username || !password) {
      setToastQueue((state) => [...state, { id: 'login-error', message: 'Please enter valid credentials.', type: 'error' }].slice(-4));
      return false;
    }

    try {
      const result = await loginModerator(username, password);
      localStorage.setItem('lolac-token', result.token);
      setAuthenticated(true);
      setActivePage('dashboard');
      if (remember) {
        localStorage.setItem('lolac-auth', 'true');
      }
      setToastQueue((state) => [...state, { id: 'login-success', message: 'Authenticated with backend server.', type: 'success' }].slice(-4));
      return true;
    } catch (error) {
      setToastQueue((state) => [...state, { id: 'login-failed', message: 'Authentication failed. Check your credentials and backend.', type: 'error' }].slice(-4));
      return false;
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setActivePage('login');
    setToastQueue((state) => [...state, { id: 'logout', message: 'Signed out of the moderator dashboard.', type: 'success' }].slice(-4));
  };

  const handleEmailSubmit = async () => {
    try {
      await sendAlertApi({ emailSettings, test: true });
      setToastQueue((state) => [...state, { id: 'email-sent', message: 'Backend alert endpoint accepted the test alert.', type: 'success' }].slice(-4));
    } catch {
      setToastQueue((state) => [...state, { id: 'email-error', message: 'Unable to send test alert. Verify backend email service and credentials.', type: 'error' }].slice(-4));
    }
  };

  const sidebarTitle = useMemo(() => sidebarItems.find((item) => item.key === activePage)?.label || 'Moderator Panel', [activePage]);

  if (!authenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(10,182,255,0.18),_transparent_28%)]" />
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(180deg,_rgba(15,23,42,0.75),_rgba(15,23,42,1)_85%)]" />
      <Sidebar activeKey={activePage} items={sidebarItems} onSelect={(key) => (key === 'logout' ? handleLogout() : setActivePage(key))} />

      <main className="ml-0 min-h-screen px-6 pb-12 pt-6 lg:ml-72 lg:px-10">
        <div className="mb-6 flex flex-col gap-4 pt-4 lg:pt-0">
          <Topbar currentTime={currentTime} notificationCount={Math.min(logs.length, 16)} />
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="glass-panel p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/75">Active module</p>
                <h1 className="text-3xl font-semibold text-white">{sidebarTitle}</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-400">Modern anti-cheat monitoring with email alerts, real-time detection feeds, and admin controls ready for backend integration.</p>
              </div>
              <div className="rounded-3xl border border-slate-700/40 bg-slate-950/80 px-4 py-3 text-sm text-slate-300 shadow-glow">
                API route: <span className="font-semibold text-cyan-300">/api/logs</span>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.section key={activePage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            {activePage === 'dashboard' && (
              <DashboardPage
                stats={stats}
                logs={logs}
                severityStyles={severityStyles}
                onExport={() => {
                  const csv = [
                    ['Username', 'Cheat', 'Time', 'IP Address', 'HWID', 'Severity', 'Status'],
                    ...logs.map((entry) => [entry.username, entry.cheat, entry.time, entry.ip, entry.hwid, entry.severity, entry.status])
                  ]
                    .map((row) => row.join(','))
                    .join('\n');
                  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = 'lolac-logs.csv';
                  link.click();
                  setToastQueue((state) => [...state, { id: 'export', message: 'Detection logs exported successfully.', type: 'success' }].slice(-4));
                }}
              />
            )}

            {activePage === 'settings' && (
              <SettingsPage
                emailSettings={emailSettings}
                onEmailSettingsChange={setEmailSettings}
                onThemeChange={setTheme}
                theme={theme}
                onSubmitEmail={handleEmailSubmit}
                systemStatus={systemStatus}
              />
            )}

            {activePage === 'email' && (
              <SettingsPage
                emailSettings={emailSettings}
                onEmailSettingsChange={setEmailSettings}
                onThemeChange={setTheme}
                theme={theme}
                onSubmitEmail={handleEmailSubmit}
                systemStatus={systemStatus}
              />
            )}

            {activePage !== 'dashboard' && activePage !== 'settings' && activePage !== 'login' && activePage !== 'email' && (
              <div className="glass-card p-6">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/75">Focus area</p>
                    <h2 className="text-2xl font-semibold text-white">{sidebarTitle}</h2>
                  </div>
                  <span className="rounded-full bg-slate-800/70 px-3 py-1 text-xs uppercase tracking-[0.28em] text-cyan-200">Module unavailable</span>
                </div>
                <p className="max-w-3xl text-slate-300">This section is not implemented yet. Live data will be sourced from the backend through the configured API routes once they are available.</p>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-slate-700/40 bg-slate-900/75 p-5">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500">API integration</h3>
                    <p className="mt-3 text-slate-300">GET /api/logs</p>
                    <p className="mt-1 text-slate-400">POST /api/send-alert</p>
                  </div>
                  <div className="rounded-3xl border border-slate-700/40 bg-slate-900/75 p-5">
                    <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500">System preview</h3>
                    <p className="mt-3 text-slate-300">Hardware ID logs, screenshot review, and alert history are all modular sections waiting on backend data.</p>
                  </div>
                </div>
              </div>
            )}
          </motion.section>
        </AnimatePresence>
      </main>

      <div className="fixed right-6 bottom-6 flex flex-col gap-3">
        <AnimatePresence>
          {toastQueue.map((toast) => (
            <Toast key={toast.id} message={toast.message} type={toast.type} onDismiss={() => setToastQueue((current) => current.filter((item) => item.id !== toast.id))} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
