import { useState } from 'react';
import type { EmailSettings, ThemeMode } from '../types';

interface SettingsPageProps {
  emailSettings: EmailSettings;
  theme: ThemeMode;
  onEmailSettingsChange: (settings: EmailSettings) => void;
  onThemeChange: (theme: ThemeMode) => void;
  onSubmitEmail: () => void;
  systemStatus: Array<{ label: string; value: string; status: string }>;
}

const SettingsPage = ({ emailSettings, theme, onEmailSettingsChange, onThemeChange, onSubmitEmail, systemStatus }: SettingsPageProps) => {
  const [sensitivity, setSensitivity] = useState(7);

  return (
    <div className="space-y-6">
      <section className="glass-card p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/75">Configuration</p>
            <h2 className="text-2xl font-semibold text-white">Moderator email & system settings</h2>
          </div>
          <button onClick={onSubmitEmail} className="rounded-3xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Send test alert
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-slate-700/60 bg-slate-950/75 p-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500">Email alert settings</h3>
            <label className="block text-sm text-slate-300">
              Moderator email
              <input
                type="email"
                value={emailSettings.moderatorEmail}
                onChange={(event) => onEmailSettingsChange({ ...emailSettings, moderatorEmail: event.target.value })}
                className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Email service ID
              <input
                type="text"
                value={emailSettings.serviceId}
                onChange={(event) => onEmailSettingsChange({ ...emailSettings, serviceId: event.target.value })}
                className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Template ID
              <input
                type="text"
                value={emailSettings.templateId}
                onChange={(event) => onEmailSettingsChange({ ...emailSettings, templateId: event.target.value })}
                className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Public key
              <input
                type="text"
                value={emailSettings.publicKey}
                onChange={(event) => onEmailSettingsChange({ ...emailSettings, publicKey: event.target.value })}
                className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </label>
            <label className="block text-sm text-slate-300">
              SMTP server
              <input
                type="text"
                value={emailSettings.smtpServer}
                onChange={(event) => onEmailSettingsChange({ ...emailSettings, smtpServer: event.target.value })}
                className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </label>
            <label className="block text-sm text-slate-300">
              SMTP port
              <input
                type="text"
                value={emailSettings.smtpPort}
                onChange={(event) => onEmailSettingsChange({ ...emailSettings, smtpPort: event.target.value })}
                className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </label>
            <label className="inline-flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={emailSettings.alertEnabled}
                onChange={(event) => onEmailSettingsChange({ ...emailSettings, alertEnabled: event.target.checked })}
                className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
              />
              Enable automatic email alerts
            </label>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-700/60 bg-slate-950/75 p-6">
            <div>
              <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500">Appearance</h3>
              <p className="mt-2 text-sm text-slate-400">Switch between dark and light layout modes for your monitoring console.</p>
            </div>

            <div className="space-y-4 rounded-3xl border border-slate-700/50 bg-slate-900/70 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Dashboard theme</p>
              <div className="flex flex-wrap gap-3">
                {(['dark', 'light'] as ThemeMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => onThemeChange(mode)}
                    className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                      theme === mode ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {mode} mode
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-700/50 bg-slate-900/70 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Detection sensitivity</p>
              <input
                type="range"
                min="1"
                max="10"
                value={sensitivity}
                onChange={(event) => setSensitivity(Number(event.target.value))}
                className="mt-4 w-full accent-cyan-400"
              />
              <p className="mt-3 text-sm text-slate-300">Current sensitivity: <span className="font-semibold text-white">{sensitivity}</span></p>
              <p className="mt-2 text-sm text-slate-400">Adjust the detection sensitivity slider to fine-tune automated alerts and monitoring thresholds.</p>
            </div>

            <div className="rounded-3xl border border-slate-700/50 bg-slate-900/70 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">API integration</p>
              <p className="mt-3 text-sm text-slate-300">Ready to connect with the backend via these routes.</p>
              <div className="mt-4 space-y-2 rounded-3xl bg-slate-950/80 p-4 text-xs text-slate-400">
                <p>/api/login</p>
                <p>/api/logs</p>
                <p>/api/send-alert</p>
              </div>
            </div>

            <div className="mt-4 rounded-3xl bg-slate-950/80 p-4 text-sm text-slate-200">
              <p className="font-medium text-white">Discord webhook</p>
              <p className="mt-1 text-slate-400">Integration endpoint: <span className="text-cyan-300">https://discord.com/api/webhooks/WEBHOOK_ID</span></p>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {systemStatus.map((item) => (
          <div key={item.label} className="glass-card p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xl font-semibold text-white">{item.value}</p>
              <span className="rounded-full bg-slate-800/80 px-3 py-1 text-xs text-slate-300">{item.status}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SettingsPage;
