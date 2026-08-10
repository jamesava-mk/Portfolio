import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AboutCard from './AboutCard';
import Stats from './Stats';
import SectionHeading from '../ui/SectionHeading';
import { aboutCards, aboutContent } from '../../data/about';

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative border-b border-white/[0.06] py-24 sm:py-28 lg:py-32">
    
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <SectionHeading eyebrow={aboutContent.eyebrow} title={aboutContent.heading} description={aboutContent.intro} />

            <p className="mt-4 max-w-xl text-base leading-8 text-slate-400">
              {aboutContent.mission}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={aboutContent.primaryHref}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold !text-slate-950 transition-transform duration-200 hover:scale-[1.02]">
                {aboutContent.primaryCta}
                <ArrowRight size={16} className="text-slate-950 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={aboutContent.secondaryHref}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition-colors duration-200 hover:bg-white/10"
              >
                {aboutContent.secondaryCta}
              </a>
            </div>
          </motion.div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {aboutCards.map((card, index) => (
                <AboutCard key={card.title} {...card} index={index} />
              ))}
            </div>

            <Stats />
          </div>
        </div>
      </div>
    </section>
  );
}
