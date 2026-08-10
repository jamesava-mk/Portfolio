import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { footerLinks, socialLinks } from '../../data/socials';
import { siteBrand } from '../../data/navigation';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-slate-950/40 py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_30%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-indigo-300/90 backdrop-blur-xl">
            {siteBrand}
          </div>

          <div className="flex flex-wrap gap-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-300/90 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 sm:items-end"
        >
          <div className="flex flex-wrap gap-2">
            {socialLinks.filter((item) => item.href).map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-300/90 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

          <p className="text-sm text-slate-400">© 2026 Portfolio. Crafted with care.</p>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToTop}
        whileHover={{ y: -3, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-6 right-6 z-40 rounded-full border border-white/10 bg-white/10 p-3 text-white shadow-[0_12px_35px_rgba(2,8,23,0.35)] backdrop-blur-xl transition-colors hover:bg-white/15"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  );
}
