import { motion, useReducedMotion } from 'framer-motion';
import TimelineItem from './TimelineItem';
import SectionHeading from '../ui/SectionHeading';
import { experienceContent, timelineItems } from '../../data/experience';

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="journey" className="relative border-b border-white/[0.06] py-24 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_34%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_46%,rgba(255,255,255,0.03)_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <SectionHeading eyebrow={experienceContent.eyebrow} title={experienceContent.heading} description={experienceContent.intro} />
        </motion.div>
        {timelineItems.length > 0 ? (
            <div className="relative mt-20">

  {/* Glow behind timeline */}
            <div className="absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-sm md:block" />

  {/* Main timeline */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-indigo-400 to-transparent md:block" />

            <div className="space-y-20">
            {timelineItems.map((item, index) => (
            <TimelineItem
            key={item.title}
            item={item}
            index={index}
        />
        ))}
        </div>

  </div>
) : (
          <div className="mt-12 rounded-[2rem] border border-white/10 bg-white/6 p-8 text-center shadow-[0_25px_90px_rgba(2,8,23,0.35)] backdrop-blur-2xl sm:p-10">
            <h3 className="text-2xl font-semibold text-white">{experienceContent.emptyTitle}</h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300/90">{experienceContent.emptyDescription}</p>
          </div>
        )}
      </div>
    </section>
  );
}
