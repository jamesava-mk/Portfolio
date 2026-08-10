import { motion } from 'framer-motion';
import { ArrowUpRight, GitBranch } from 'lucide-react';
import TechBadge from './TechBadge';

const statusStyles = {
  Live: 'border-emerald-400/30 bg-emerald-500/15 text-emerald-200',
  'In Progress': 'border-amber-400/30 bg-amber-500/15 text-amber-200',
  Archived: 'border-slate-400/30 bg-slate-500/15 text-slate-200',
};

export default function ProjectCard({ project, index, onOpen }) {
  const statusClassName = statusStyles[project.status] ?? statusStyles.Live;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.01, rotateX: 1, rotateY: -2, transition: { duration: 0.25 } }}
      className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/6 p-3 shadow-[0_30px_100px_rgba(2,8,23,0.4)] backdrop-blur-2xl transition-[border-color,transform,box-shadow] duration-300 hover:border-white/20 hover:shadow-[0_35px_120px_rgba(2,8,23,0.5)]"
      onClick={() => onOpen(project)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen(project);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open case study for ${project.title}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_42%)]" />
      <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-950/60">
        <img
          src={project.coverImage ?? project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105 sm:aspect-[4/3]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] ${statusClassName}`}>
            {project.status}
          </span>
          <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-slate-200 backdrop-blur-xl">
            Case Study
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-300/90">{project.description}</p>
        </div>
      </div>

      <div className="relative px-2 pt-5 pb-2">
        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <TechBadge key={item} label={item} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/90 transition-colors duration-200 hover:border-white/20 hover:bg-white/10"
          >
            <GitBranch size={15} />
            View Live
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-slate-950 transition-transform duration-200 hover:scale-[1.02]"
          >
            Live Demo
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
