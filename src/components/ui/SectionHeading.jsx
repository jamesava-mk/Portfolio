import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  descriptionClassName = '',
  eyebrowClassName = '',
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`.trim()}
    >
      <div className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-indigo-300/90 backdrop-blur-xl ${eyebrowClassName}`.trim()}>
        <Sparkles size={14} />
        <span>{eyebrow}</span>
      </div>

      <h2 className={`mt-6 text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl ${align === 'center' ? 'mx-auto' : ''}`.trim()}>
        {title}
      </h2>

      {description ? (
        <p className={`mt-5 text-base leading-7 text-slate-300/90 sm:text-lg ${descriptionClassName}`.trim()}>{description}</p>
      ) : null}
    </motion.div>
  );
}
