import { motion, useReducedMotion } from 'framer-motion';
import ContactForm from './ContactForm';
import SocialLinks from './SocialLinks';
import SectionHeading from '../ui/SectionHeading';
import { contactContent } from '../../data/contact';

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="contact" className="relative border-b border-white/[0.06] py-24 sm:py-28 lg:py-32">
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
          <SectionHeading
            eyebrow={contactContent.eyebrow}
            title={contactContent.heading}
            description={contactContent.intro}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_30px_120px_rgba(2,8,23,0.4)] backdrop-blur-2xl sm:p-8 lg:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-white">Open for the right opportunity</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300/90">
                  {contactContent.supportingText}
                </p>
              </div>

              <div className="rounded-[1.4rem] border border-white/10 bg-slate-950/55 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Connect</p>
                <div className="mt-4">
                  <SocialLinks />
                </div>
                <a href={contactContent.ctaHref} className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition-colors duration-200 hover:bg-white/10">
                  {contactContent.ctaLabel}
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
