import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';

export default function SiteLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090b] text-[#f2f0eb]">
      <Navbar />

      <div className="relative z-10">
        <AnimatePresence
          mode="wait"
          initial={false}
        >
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: 'easeOut',
            }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
}