import { motion, useReducedMotion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { services, servicesContent } from '../../data/services';

export default function Services() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative isolate overflow-hidden bg-[#05070c] py-20 text-white sm:py-24 lg:py-32">
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
          <SectionHeading eyebrow={servicesContent.eyebrow} title={servicesContent.heading} description={servicesContent.intro} />
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[1.6rem] border border-white/10 bg-white/6 p-6 shadow-[0_25px_90px_rgba(2,8,23,0.35)] backdrop-blur-2xl"
            >
              <h3 className="text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300/90">{service.description}</p>
              <ul className="mt-5 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-indigo-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
