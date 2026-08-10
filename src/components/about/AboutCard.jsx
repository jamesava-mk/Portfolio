import { motion, useReducedMotion } from 'framer-motion';

export default function AboutCard({ title, description, icon: Icon, accent, index }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.1 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -8, scale: 1.01, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/8 p-5 shadow-[0_20px_70px_rgba(2,8,23,0.45)] backdrop-blur-2xl transition-[border-color,transform,box-shadow] duration-300 hover:border-white/20 hover:shadow-[0_24px_90px_rgba(2,8,23,0.55)]"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-85`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_42%)]" />

      <div className="relative flex h-full flex-col">
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white shadow-lg shadow-black/20">
          <Icon size={18} strokeWidth={1.8} />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-300/90">{description}</p>
      </div>
    </motion.article>
  );
}
