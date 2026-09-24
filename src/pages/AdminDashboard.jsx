import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  Eye,
  LogOut,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from '../lib/portfolioStore';

const EMPTY_PROJECT = {
  title: '',
  shortTitle: '',
  category: 'WEB / BUILD',
  year: new Date().getFullYear().toString(),
  status: 'BUILDING',
  featured: false,

  description: '',

  problem: '',
  why: '',
  tried: '',
  changed: '',
  broke: '',
  learned: '',

  stack: [],
  liveUrl: '',
  githubUrl: '',

  heroImage: '',
  gallery: [],
  stages: ['IDEA', 'BUILD', 'REFINE'],
};

const STATUS_OPTIONS = [
  'BUILDING',
  'SHIPPED',
  'EXPERIMENT',
  'PAUSED',
];

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
  rows = 5,
}) {
  const commonClass =
    'mt-2 w-full border border-white/10 bg-[#08090b] px-3 py-3 text-sm text-white outline-none transition placeholder:text-white/15 focus:border-white/30';

  return (
    <label className="block">
      <span className="text-[8px] uppercase tracking-[0.22em] text-white/30">
        {label}
      </span>

      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`${commonClass} resize-y leading-7`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={commonClass}
        />
      )}
    </label>
  );
}

function ArrayField({
  label,
  values,
  onChange,
  placeholder,
}) {
  const [input, setInput] = useState('');

  const addItem = () => {
    const value = input.trim();

    if (!value) return;

    onChange([...values, value]);
    setInput('');
  };

  const removeItem = (index) => {
    onChange(values.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div>
      <span className="text-[8px] uppercase tracking-[0.22em] text-white/30">
        {label}
      </span>

      <div className="mt-2 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              addItem();
            }
          }}
          placeholder={placeholder}
          className="min-w-0 flex-1 border border-white/10 bg-[#08090b] px-3 py-3 text-sm text-white outline-none transition placeholder:text-white/15 focus:border-white/30"
        />

        <button
          type="button"
          onClick={addItem}
          className="flex w-11 shrink-0 items-center justify-center border border-white/10 text-white/40 transition hover:border-white/30 hover:text-white"
          aria-label={`Add ${label}`}
        >
          <Plus size={15} />
        </button>
      </div>

      {values.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {values.map((value, index) => (
            <span
              key={`${value}-${index}`}
              className="group flex items-center gap-2 border border-white/10 px-3 py-2 text-[8px] uppercase tracking-[0.14em] text-white/45"
            >
              {value}

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-white/20 transition hover:text-white"
                aria-label={`Remove ${value}`}
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectEditor({
  project,
  onChange,
  onSave,
  onCancel,
  isNew,
}) {
  const update = (field, value) => {
    onChange({
      ...project,
      [field]: value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-white/10 bg-[#0c0d0f]"
    >
      <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <div>
          <p className="text-[8px] uppercase tracking-[0.25em] text-white/25">
            {isNew ? '01 / New project' : 'Edit / Project'}
          </p>

          <h2 className="mt-2 text-2xl tracking-[-0.045em]">
            {project.title || 'Untitled project'}
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-[8px] uppercase tracking-[0.18em] text-white/35 transition hover:border-white/25 hover:text-white"
          >
            <X size={13} />
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="inline-flex items-center gap-2 bg-white px-4 py-3 text-[8px] uppercase tracking-[0.18em] text-black transition hover:bg-white/90"
          >
            <Save size={13} />
            Save project
          </button>
        </div>
      </div>

      <div className="space-y-12 p-5 sm:p-7">
        <section>
          <div className="mb-6">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Identity
            </p>

            <p className="mt-2 text-xs text-white/25">
              The information used to identify the project throughout the
              portfolio.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Project title"
              value={project.title}
              onChange={(value) => update('title', value)}
              placeholder="BeUnique Wears"
            />

            <Field
              label="Short title"
              value={project.shortTitle}
              onChange={(value) => update('shortTitle', value)}
              placeholder="BEUNIQUE"
            />

            <Field
              label="Category"
              value={project.category}
              onChange={(value) => update('category', value)}
              placeholder="PRODUCT / ECOMMERCE"
            />

            <Field
              label="Year"
              value={project.year}
              onChange={(value) => update('year', value)}
              placeholder="2026"
            />

            <label className="block">
              <span className="text-[8px] uppercase tracking-[0.22em] text-white/30">
                Status
              </span>

              <div className="relative mt-2">
                <select
                  value={project.status}
                  onChange={(event) =>
                    update('status', event.target.value)
                  }
                  className="w-full appearance-none border border-white/10 bg-[#08090b] px-3 py-3 text-sm text-white outline-none focus:border-white/30"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="bg-[#08090b]"
                    >
                      {status}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/25"
                />
              </div>
            </label>

            <label className="flex items-center gap-3 self-end border border-white/10 px-3 py-3">
              <input
                type="checkbox"
                checked={Boolean(project.featured)}
                onChange={(event) =>
                  update('featured', event.target.checked)
                }
                className="h-4 w-4 accent-white"
              />

              <span>
                <span className="block text-[8px] uppercase tracking-[0.2em] text-white/50">
                  Featured project
                </span>

                <span className="mt-1 block text-[9px] text-white/20">
                  Show this project prominently on the home page.
                </span>
              </span>
            </label>
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Story
            </p>

            <p className="mt-2 text-xs text-white/25">
              This is the material used to build the project story page.
            </p>
          </div>

          <div className="space-y-5">
            <Field
              label="Short description"
              value={project.description}
              onChange={(value) => update('description', value)}
              placeholder="What is this project?"
              textarea
              rows={4}
            />

            <div className="grid gap-5 lg:grid-cols-2">
              <Field
                label="The problem"
                value={project.problem}
                onChange={(value) => update('problem', value)}
                placeholder="What problem or question started it?"
                textarea
              />

              <Field
                label="Why I built it"
                value={project.why}
                onChange={(value) => update('why', value)}
                placeholder="Why did you decide to build it?"
                textarea
              />

              <Field
                label="First build"
                value={project.tried}
                onChange={(value) => update('tried', value)}
                placeholder="What did you try first?"
                textarea
              />

              <Field
                label="The decision"
                value={project.changed}
                onChange={(value) => update('changed', value)}
                placeholder="What changed and why?"
                textarea
              />

              <Field
                label="What broke"
                value={project.broke}
                onChange={(value) => update('broke', value)}
                placeholder="What went wrong?"
                textarea
              />

              <Field
                label="What I learned"
                value={project.learned}
                onChange={(value) => update('learned', value)}
                placeholder="What did the project teach you?"
                textarea
              />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Visuals
            </p>

            <p className="mt-2 text-xs text-white/25">
              Use paths from the public folder for now. A proper media
              uploader can replace this later.
            </p>
          </div>

          <div className="space-y-5">
            <Field
              label="Hero image"
              value={project.heroImage}
              onChange={(value) => update('heroImage', value)}
              placeholder="/projects/project.png"
            />

            <ArrayField
              label="Gallery images"
              values={project.gallery || []}
              onChange={(value) => update('gallery', value)}
              placeholder="/projects/project-detail.png"
            />
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Technical
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <ArrayField
              label="Stack"
              values={project.stack || []}
              onChange={(value) => update('stack', value)}
              placeholder="React"
            />

            <ArrayField
              label="Story stages"
              values={project.stages || []}
              onChange={(value) => update('stages', value)}
              placeholder="DESIGN"
            />
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
              Links
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Live URL"
              value={project.liveUrl}
              onChange={(value) => update('liveUrl', value)}
              placeholder="https://..."
            />

            <Field
              label="GitHub URL"
              value={project.githubUrl}
              onChange={(value) => update('githubUrl', value)}
              placeholder="https://github.com/..."
            />
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState(() => getProjects());
  const [editingProject, setEditingProject] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notice, setNotice] = useState('');

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      if (Boolean(a.featured) !== Boolean(b.featured)) {
        return Number(b.featured) - Number(a.featured);
      }

      return String(b.year).localeCompare(String(a.year));
    });
  }, [projects]);

  const showNotice = (message) => {
    setNotice(message);

    window.setTimeout(() => {
      setNotice('');
    }, 2500);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingProject({
      ...EMPTY_PROJECT,
      gallery: [],
      stack: [],
      stages: ['IDEA', 'BUILD', 'REFINE'],
    });
  };

  const handleEdit = (project) => {
    setIsCreating(false);

    setEditingProject({
      ...EMPTY_PROJECT,
      ...project,
      stack: Array.isArray(project.stack)
        ? [...project.stack]
        : [],
      gallery: Array.isArray(project.gallery)
        ? [...project.gallery]
        : [],
      stages: Array.isArray(project.stages)
        ? [...project.stages]
        : [],
    });
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsCreating(false);
  };

  const handleSave = () => {
    if (!editingProject?.title?.trim()) {
      showNotice('A project title is required.');
      return;
    }

    if (isCreating) {
      const created = createProject(editingProject);

      setProjects(getProjects());
      setEditingProject(null);
      setIsCreating(false);

      showNotice(`"${created.title}" created.`);
      return;
    }

    const updated = updateProject(
      editingProject.id,
      editingProject
    );

    if (!updated) {
      showNotice('Project could not be updated.');
      return;
    }

    setProjects(getProjects());
    setEditingProject(null);

    showNotice(`"${updated.title}" updated.`);
  };

  const handleDelete = (project) => {
    const confirmed = window.confirm(
      `Delete "${project.title}"?\n\nThis removes it from the local portfolio data.`
    );

    if (!confirmed) {
      return;
    }

    deleteProject(project.id);

    setProjects(getProjects());

    if (editingProject?.id === project.id) {
      setEditingProject(null);
    }

    showNotice(`"${project.title}" deleted.`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('james_admin');

    navigate('/admin', {
      replace: true,
    });
  };

  return (
    <main className="min-h-screen bg-[#08090b] text-[#f2f0eb]">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex h-9 w-9 items-center justify-center border border-white/15 text-xs transition hover:border-white/35"
              aria-label="Return home"
            >
              J
            </Link>

            <div>
              <p className="text-[8px] uppercase tracking-[0.25em] text-white/25">
                Portfolio
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/60">
                Control room
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/work"
              target="_blank"
              className="hidden items-center gap-2 border border-white/10 px-4 py-2.5 text-[8px] uppercase tracking-[0.18em] text-white/35 transition hover:border-white/25 hover:text-white sm:inline-flex"
            >
              View portfolio
              <ArrowUpRight size={12} />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 border border-white/10 px-4 py-2.5 text-[8px] uppercase tracking-[0.18em] text-white/35 transition hover:border-white/25 hover:text-white"
            >
              <LogOut size={12} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mb-10 flex flex-col gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-white/25">
              <span>01</span>
              <span className="h-px w-6 bg-white/15" />
              <span>Publishing system</span>
            </div>

            <h1 className="mt-5 text-5xl tracking-[-0.065em] sm:text-7xl">
              Your work.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/30">
              Add projects, shape their story, attach visuals and decide what
              appears on the public portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="group inline-flex items-center justify-center gap-3 bg-white px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
          >
            <Plus size={14} />
            New project
          </button>
        </div>

        <AnimatePresence>
          {notice && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed right-5 top-5 z-[100] flex items-center gap-3 border border-white/15 bg-[#111214] px-4 py-3 shadow-2xl sm:right-8"
            >
              <Check
                size={14}
                className="text-emerald-300/70"
              />

              <span className="text-[9px] uppercase tracking-[0.15em] text-white/60">
                {notice}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {editingProject ? (
          <ProjectEditor
            project={editingProject}
            onChange={setEditingProject}
            onSave={handleSave}
            onCancel={handleCancel}
            isNew={isCreating}
          />
        ) : (
          <section>
            <div className="mb-4 grid grid-cols-[1fr_auto] gap-4 px-4 text-[8px] uppercase tracking-[0.22em] text-white/20 sm:grid-cols-[70px_1fr_130px_100px_90px] sm:px-5">
              <span className="hidden sm:block">No.</span>
              <span>Project</span>
              <span className="hidden sm:block">Status</span>
              <span className="hidden sm:block">Year</span>
              <span />
            </div>

            <div className="border-t border-white/10">
              {sortedProjects.map((project, index) => (
                <motion.article
                  layout
                  key={project.id || project.slug}
                  className="group grid grid-cols-[1fr_auto] gap-4 border-b border-white/10 px-4 py-6 sm:grid-cols-[70px_1fr_130px_100px_90px] sm:items-center sm:px-5"
                >
                  <span className="hidden text-[9px] tracking-[0.18em] text-white/20 sm:block">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl tracking-[-0.04em] sm:text-2xl">
                        {project.title}
                      </h2>

                      {project.featured && (
                        <span className="border border-orange-400/20 px-2 py-1 text-[7px] uppercase tracking-[0.15em] text-orange-300/60">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-2 line-clamp-1 text-[10px] leading-5 text-white/25">
                      {project.category}
                    </p>
                  </div>

                  <span
                    className={`hidden text-[8px] uppercase tracking-[0.16em] sm:block ${
                      project.status === 'SHIPPED'
                        ? 'text-emerald-300/60'
                        : project.status === 'BUILDING'
                          ? 'text-orange-300/60'
                          : 'text-white/30'
                    }`}
                  >
                    {project.status}
                  </span>

                  <span className="hidden text-[9px] tracking-[0.15em] text-white/25 sm:block">
                    {project.year}
                  </span>

                  <div className="flex items-center gap-1">
                    <Link
                      to={`/work/${project.slug}`}
                      target="_blank"
                      className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/25 transition hover:border-white/25 hover:text-white"
                      aria-label={`Preview ${project.title}`}
                    >
                      <Eye size={14} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleEdit(project)}
                      className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/25 transition hover:border-white/25 hover:text-white"
                      aria-label={`Edit ${project.title}`}
                    >
                      <ArrowUpRight size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(project)}
                      className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/20 transition hover:border-red-400/30 hover:text-red-300/70"
                      aria-label={`Delete ${project.title}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.article>
              ))}

              {!sortedProjects.length && (
                <div className="border-b border-white/10 py-24 text-center">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-white/25">
                    No projects yet
                  </p>

                  <button
                    type="button"
                    onClick={handleCreate}
                    className="mt-6 inline-flex items-center gap-2 border-b border-white/20 pb-2 text-[9px] uppercase tracking-[0.2em] text-white/40 transition hover:text-white"
                  >
                    Create the first project
                    <Plus size={13} />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-col gap-2 text-[8px] uppercase tracking-[0.18em] text-white/15 sm:flex-row sm:items-center sm:justify-between">
              <span>
                {projects.length}{' '}
                {projects.length === 1 ? 'project' : 'projects'}
              </span>

              <span>
                Local publishing mode
              </span>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}