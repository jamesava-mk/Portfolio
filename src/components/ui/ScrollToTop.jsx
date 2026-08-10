import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const showButton = scrollYProgress.get() > 0.08;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 16 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="fixed bottom-6 right-6 z-[95] rounded-full border border-white/10 bg-white/10 p-3 text-white shadow-[0_12px_35px_rgba(2,8,23,0.35)] backdrop-blur-xl transition-colors hover:bg-white/15"
      aria-label="Back to top"
      title="Scroll back to the top of the page"
    >
      <ArrowUp size={18} />
    </motion.button>
  );
}
