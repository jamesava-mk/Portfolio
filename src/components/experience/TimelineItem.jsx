import { motion } from "framer-motion";
import {
  GraduationCap,
  Laptop,
  Bot,
  Rocket,
} from "lucide-react";

const ICONS = {
  education: GraduationCap,
  development: Laptop,
  ai: Bot,
  future: Rocket,
};

export default function TimelineItem({ item, index }) {
  const Icon = ICONS[item.type] || GraduationCap;
  const isLeft = index % 2 !== 0;

  const Card = (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 30px 90px rgba(79,70,229,.25)",
        borderColor: "rgba(129,140,248,.45)",
      }}
      transition={{ duration: 0.25 }}
      className="relative rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-[0_20px_80px_rgba(2,8,23,0.35)]"
    >
      {/* Connector */}
      <div
        className={`absolute top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-indigo-400/60 to-transparent md:block ${
          isLeft ? "right-[-32px]" : "left-[-32px] rotate-180"
        }`}
      />

      <span className="inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
        {item.badge}
      </span>

      <h3 className="mt-4 text-3xl font-semibold text-white">
        {item.title}
      </h3>

      <p className="mt-2 text-sm font-medium text-slate-400">
        {item.company}
      </p>

      <p className="mt-4 leading-8 text-slate-300">
        {item.description}
      </p>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative py-10"
    >
      <div className="grid items-center md:grid-cols-[1fr_90px_1fr]">

        {/* LEFT */}
        <div className="hidden md:block md:pr-8">
          {isLeft && Card}
        </div>

        {/* CENTER */}
        <div className="relative flex flex-col items-center">

          <div className="z-10 mb-4 rounded-full border border-white/10 bg-slate-900/90 px-4 py-1 text-sm font-semibold text-slate-300 backdrop-blur-xl">
            {item.period}
          </div>

          <motion.div
            whileHover={{
            scale: 1.12,
            rotate: 3,
        }}
            transition={{ duration: 0.2 }}
            className="z-20 flex h-16 w-16 items-center justify-center rounded-full border border-indigo-400/40 bg-slate-900 shadow-[0_0_45px_rgba(99,102,241,0.45)]"
        >
            <Icon size={24} className="text-indigo-300" />
          </motion.div>

        </div>

        {/* RIGHT */}
        <div className="hidden md:block md:pl-8">
          {!isLeft && Card}
        </div>

        {/* MOBILE */}
        <div className="mt-6 md:hidden col-span-full">
          {Card}
        </div>

      </div>
    </motion.div>
  );
}