import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function SkillCard({ title, description, icon: Icon, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/55 p-4 backdrop-blur-xl"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-70`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_45%)]" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-lg shadow-black/20">
          <Icon size={18} strokeWidth={1.8} />
        </div>
        <ArrowUpRight
          size={16}
          className="text-slate-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      <div className="relative mt-4">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300/90">{description}</p>
      </div>
    </motion.div>
  );
}
