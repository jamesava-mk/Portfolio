import { motion } from 'framer-motion';
import { aboutStats } from '../../data/about';

export default function Stats() {
  if (!aboutStats.length) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-3 sm:grid-cols-2"
    >
      {aboutStats.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.08 }}
          whileHover={{ y: -4, scale: 1.01 }}
          className="rounded-[1.25rem] border border-white/10 bg-slate-950/60 px-4 py-4 backdrop-blur-xl"
        >
          <p className="text-2xl font-semibold tracking-tight text-white">{item.value}</p>
          <p className="mt-1 text-sm text-slate-400">{item.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
