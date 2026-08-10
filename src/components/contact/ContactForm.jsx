import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { contactFormContent } from '../../data/contact';

export default function ContactForm() {
  return (
    <motion.form
  action="https://formspree.io/f/myegzzko"
  method="POST"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  className="space-y-4"
>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="group block">
          <span className="mb-2 block text-sm font-medium text-slate-300">{contactFormContent.nameLabel}</span>
          <input
            type="text"
            name="name"
            placeholder={contactFormContent.namePlaceholder}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
          />
        </label>

        <label className="group block">
          <span className="mb-2 block text-sm font-medium text-slate-300">{contactFormContent.emailLabel}</span>
          <input
            type="email"
            name="email"
            placeholder={contactFormContent.emailPlaceholder}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
          />
        </label>
      </div>

      <label className="group block">
        <span className="mb-2 block text-sm font-medium text-slate-300">{contactFormContent.messageLabel}</span>
        <textarea
          name="message"
          rows="5"
          placeholder={contactFormContent.messagePlaceholder}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-500 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition-transform duration-200 hover:scale-[1.02]"
      >
        {contactFormContent.submitLabel}
        <ArrowRight size={15} />
      </button>
    </motion.form>
  );
}
