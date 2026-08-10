import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

const statusStyles = {
  Live: 'border-emerald-400/30 bg-emerald-500/15 text-emerald-200',
  'In Progress': 'border-amber-400/30 bg-amber-500/15 text-amber-200',
  Archived: 'border-slate-400/30 bg-slate-500/15 text-slate-200',
};

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const detailSections = project.sections ?? [];
  const galleryItems = project.gallery ?? [];
  const statusClassName = statusStyles[project.status] ?? statusStyles.Live;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 px-4 py-6 backdrop-blur-xl sm:px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#060812]/95 shadow-[0_35px_140px_rgba(2,8,23,0.55)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-${project.slug ?? 'details'}`}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-full border border-white/10 bg-white/10 p-2 text-white/90 transition-colors hover:bg-white/15"
              aria-label="Close project details"
            >
              <X size={18} />
            </button>

            <div className="max-h-[90vh] overflow-y-auto">
              <div className="relative h-72 sm:h-80 lg:h-[26rem]">
                <img src={project.coverImage ?? project.image} alt={`${project.title} showcase`} loading="eager" decoding="async" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060812] via-[#060812]/20 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-8">
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] ${statusClassName}`}>
                    {project.status}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-slate-200 backdrop-blur-xl">
                    Case Study
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-indigo-300/90">Featured Project</p>
                  <h3 id={`project-${project.slug ?? 'details'}`} className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{project.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300/90 sm:text-base">{project.description}</p>
                </div>
              </div>

              <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-10">
                <div className="space-y-6">
                  {detailSections.map((section) => (
                    <div key={section.title} className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-300/90">{section.title}</h4>
                      <p className="mt-3 text-sm leading-7 text-slate-300/90">{section.content}</p>
                    </div>
                  ))}

                  {galleryItems.length > 0 && (
                    <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-300/90">Gallery</h4>
                        <span className="text-xs uppercase tracking-[0.24em] text-slate-400">{galleryItems.length} images</span>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {galleryItems.map((item) => (
                          <img key={item.alt} src={item.image} alt={item.alt} loading="lazy" decoding="async" className="h-40 w-full rounded-[1rem] object-cover" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-5">
                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Architecture</p>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-slate-300/90">
                        System
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-300/90">{project.architecture}</p>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Tech Stack</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tech.map((item) => (
                        <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-slate-300/90 backdrop-blur-xl">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Links</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
                      >
                        GitHub
                        <ArrowUpRight size={15} />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-slate-950 transition-transform hover:scale-[1.02]"
                      >
                        Live Demo
                        <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
