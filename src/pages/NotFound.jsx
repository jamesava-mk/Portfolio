import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center bg-[#08090b] text-[#f2f0eb]">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid gap-10 lg:grid-cols-[.28fr_1fr]"
        >
          <div className="flex items-start gap-3 text-[9px] uppercase tracking-[0.28em] text-white/25">
            <span>404</span>
            <span className="mt-[5px] h-px w-7 bg-white/15" />
            <span>Not found</span>
          </div>

          <div>
            <p className="text-[clamp(5rem,15vw,13rem)] font-medium leading-[0.75] tracking-[-0.09em] text-white/[0.08]">
              404
            </p>

            <h1 className="-mt-2 max-w-4xl text-5xl tracking-[-0.065em] sm:text-7xl lg:text-8xl">
              Nothing here yet.
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/35 sm:text-base">
              This page does not exist, or the project you were looking for
              has moved.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/"
                className="group inline-flex items-center gap-3 bg-white px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
              >
                <ArrowLeft
                  size={14}
                  className="transition-transform group-hover:-translate-x-1"
                />
                Go home
              </Link>

              <Link
                to="/work"
                className="group inline-flex items-center gap-3 border border-white/15 px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-white/50 transition hover:border-white/35 hover:text-white"
              >
                Browse the work
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}