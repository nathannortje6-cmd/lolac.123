import { FormEvent, useState } from 'react';

interface LoginPageProps {
  onLogin: (username: string, password: string, remember: boolean) => Promise<boolean>;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [username, setUsername] = useState('moderator');
  const [password, setPassword] = useState('securepass');
  const [remember, setRemember] = useState(true);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await onLogin(username, password, remember);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10">
      <div className="glass-card w-full max-w-md border-slate-700/70 p-10 shadow-glow">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/10 text-3xl text-cyan-300 shadow-[0_0_30px_rgba(10,182,255,0.25)]">L</div>
          <h1 className="text-3xl font-semibold text-white">lolac Login</h1>
          <p className="mt-2 text-sm text-slate-400">Secure moderator access for the anti-cheat control panel.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm font-medium text-slate-300">
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Enter moderator username"
            />
          </label>

          <label className="block text-sm font-medium text-slate-300">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-3xl border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Enter password"
            />
          </label>

          <div className="flex items-center justify-between text-sm text-slate-300">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
              />
              Remember me
            </label>
            <button type="button" className="text-cyan-300 hover:text-white">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="w-full rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 transition hover:bg-cyan-400">
            Secure access
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
