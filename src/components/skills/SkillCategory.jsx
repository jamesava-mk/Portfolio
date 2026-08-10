import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SkillCard from './SkillCard';

export default function SkillCategory({
  title,
  description,
  icon: Icon,
  accent,
  skills,
  isOpen,
  onToggle,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-[0_25px_90px_rgba(2,8,23,0.35)] backdrop-blur-2xl transition-[border-color,box-shadow] duration-300 hover:border-white/20"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-white/[0.03] sm:px-6"
        aria-expanded={isOpen}
        aria-controls={`skill-panel-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg shadow-black/20`}>
            <Icon size={18} strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-slate-400">{description}</p>
          </div>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`skill-panel-${title.toLowerCase().replace(/\s+/g, '-')}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-4 py-4 sm:px-5 sm:py-5">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {skills.map((skill) => (
                  <SkillCard key={skill.title} {...skill} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
