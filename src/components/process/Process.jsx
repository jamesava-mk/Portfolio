import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { processContent, processSteps } from '../../data/process';

export default function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="relative isolate overflow-hidden bg-[#05070c] py-20 text-white sm:py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_46%,rgba(255,255,255,0.03)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <SectionHeading eyebrow={processContent.eyebrow} title={processContent.heading} description={processContent.intro} />
        </motion.div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {processSteps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 backdrop-blur-2xl"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-indigo-400/30 bg-indigo-500/10 text-sm font-semibold text-indigo-300">
                  0{index + 1}
                </span>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300/90">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
