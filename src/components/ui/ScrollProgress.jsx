import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[90] h-[2px] origin-left bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
