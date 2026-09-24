import { useState } from 'react';
import { ArrowRight, LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const configuredPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!configuredPassword) {
      setError(
        'Admin password is not configured. Add VITE_ADMIN_PASSWORD to your environment file.'
      );
      return;
    }

    if (password !== configuredPassword) {
      setError('Incorrect password.');
      setPassword('');
      return;
    }

    sessionStorage.setItem('james_admin', 'true');

    navigate('/admin/dashboard', {
      replace: true,
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08090b] px-5 text-[#f2f0eb]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.035] blur-[140px]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:radial-gradient(rgba(255,255,255,.8)_0.5px,transparent_0.5px)] [background-size:5px_5px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 flex items-center justify-between text-[9px] uppercase tracking-[0.25em] text-white/25">
          <span>J / CONTROL ROOM</span>
          <span>2026</span>
        </div>

        <div className="border border-white/10 bg-[#0c0d0f] p-6 sm:p-8">
          <div className="flex h-11 w-11 items-center justify-center border border-white/15">
            <LockKeyhole
              size={16}
              className="text-white/45"
            />
          </div>

          <p className="mt-8 text-[9px] uppercase tracking-[0.28em] text-white/25">
            Private area
          </p>

          <h1 className="mt-4 text-4xl tracking-[-0.06em]">
            CONTROL ROOM.
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/35">
            Manage the projects and stories that appear on the public
            portfolio.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10"
          >
            <label className="block">
              <span className="text-[8px] uppercase tracking-[0.22em] text-white/25">
                Password
              </span>

              <input
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError('');
                }}
                placeholder="Enter password"
                autoComplete="current-password"
                autoFocus
                className="mt-3 w-full border-b border-white/15 bg-transparent py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/45"
              />
            </label>

            {error && (
              <div className="mt-5 border border-red-400/15 bg-red-400/[0.03] px-4 py-3">
                <p className="text-[9px] uppercase leading-5 tracking-[0.12em] text-red-300/65">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="group mt-8 flex w-full items-center justify-between border border-white/15 px-5 py-4 text-[9px] uppercase tracking-[0.22em] text-white/55 transition hover:border-white/35 hover:bg-white/[0.025] hover:text-white"
            >
              Enter control room

              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>
        </div>

        <div className="mt-5 flex items-center justify-between text-[8px] uppercase tracking-[0.2em] text-white/15">
          <span>Portfolio administration</span>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="transition hover:text-white/45"
          >
            Return home
          </button>
        </div>
      </motion.div>
    </main>
  );
}