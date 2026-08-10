import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Loader({ isLoading, onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);
          return 100;
        }
        return prev + 3;
      });
    }, 40);

    return () => window.clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (progress >= 100 && isLoading) {
      const timeout = window.setTimeout(() => {
        onFinish();
      }, 320);
      return () => window.clearTimeout(timeout);
    }
  }, [progress, isLoading, onFinish]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#04060a]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_38%)]" />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 text-3xl font-semibold tracking-[0.25em] text-white shadow-[0_25px_90px_rgba(2,8,23,0.4)] backdrop-blur-xl"
            >
              JM
            </motion.div>

            <div className="mt-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.32em] text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              Loading Experience
            </div>

            <div className="mt-5 h-1.5 w-56 overflow-hidden rounded-full border border-white/10 bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.08, ease: 'linear' }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
