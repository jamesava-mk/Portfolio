import { defaultSiteSettings, seedProjects } from '../data/portfolio';

const PROJECTS_KEY = 'james_portfolio_projects';
const SETTINGS_KEY = 'james_portfolio_settings';

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    const parsed = JSON.parse(value);

    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function createSlug(value = '') {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function generateId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  return `project-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

export function getProjects() {
  const projects = read(PROJECTS_KEY, null);

  if (!Array.isArray(projects)) {
    return seedProjects;
  }

  return projects;
}

export function saveProjects(projects) {
  if (!Array.isArray(projects)) {
    return getProjects();
  }

  write(PROJECTS_KEY, projects);

  return projects;
}

export function getProject(slug) {
  if (!slug) {
    return undefined;
  }

  return getProjects().find(
    (project) => project.slug === slug
  );
}

export function createProject(project = {}) {
  const projects = getProjects();

  const title = project.title?.trim() || 'Untitled Project';

  const baseSlug =
    project.slug?.trim() || createSlug(title);

  let slug = baseSlug;
  let suffix = 2;

  while (projects.some((item) => item.slug === slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const newProject = {
    id: project.id || generateId(),
    slug,
    title,
    shortTitle:
      project.shortTitle?.trim() ||
      title.toUpperCase(),
    category:
      project.category?.trim() ||
      'WEB / BUILD',
    year:
      project.year?.toString() ||
      new Date().getFullYear().toString(),
    status:
      project.status?.trim() ||
      'BUILDING',
    featured:
      Boolean(project.featured),

    description:
      project.description?.trim() || '',

    problem:
      project.problem?.trim() || '',

    why:
      project.why?.trim() || '',

    tried:
      project.tried?.trim() || '',

    changed:
      project.changed?.trim() || '',

    broke:
      project.broke?.trim() || '',

    learned:
      project.learned?.trim() || '',

    stack: Array.isArray(project.stack)
      ? project.stack
      : [],

    liveUrl:
      project.liveUrl?.trim() || '',

    githubUrl:
      project.githubUrl?.trim() || '',

    heroImage:
      project.heroImage?.trim() || '',

    gallery: Array.isArray(project.gallery)
      ? project.gallery
      : [],

    stages: Array.isArray(project.stages)
      ? project.stages
      : ['IDEA', 'BUILD', 'REFINE'],
  };

  saveProjects([...projects, newProject]);

  return newProject;
}

export function updateProject(id, updates = {}) {
  if (!id) {
    return undefined;
  }

  const projects = getProjects();

  const currentProject = projects.find(
    (project) => project.id === id
  );

  if (!currentProject) {
    return undefined;
  }

  const nextTitle =
    updates.title !== undefined
      ? updates.title?.trim() || 'Untitled Project'
      : currentProject.title;

  let nextSlug =
    updates.slug !== undefined
      ? updates.slug?.trim() || createSlug(nextTitle)
      : currentProject.slug;

  const slugTaken = projects.some(
    (project) =>
      project.id !== id &&
      project.slug === nextSlug
  );

  if (slugTaken) {
    const baseSlug = nextSlug;
    let suffix = 2;

    while (
      projects.some(
        (project) =>
          project.id !== id &&
          project.slug === nextSlug
      )
    ) {
      nextSlug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }
  }

  const updatedProject = {
    ...currentProject,
    ...updates,

    id: currentProject.id,

    title: nextTitle,

    slug: nextSlug,

    shortTitle:
      updates.shortTitle !== undefined
        ? updates.shortTitle?.trim() ||
          nextTitle.toUpperCase()
        : currentProject.shortTitle,

    category:
      updates.category !== undefined
        ? updates.category?.trim() || 'WEB / BUILD'
        : currentProject.category,

    year:
      updates.year !== undefined
        ? updates.year?.toString() ||
          new Date().getFullYear().toString()
        : currentProject.year,

    status:
      updates.status !== undefined
        ? updates.status?.trim() || 'BUILDING'
        : currentProject.status,

    stack:
      updates.stack !== undefined &&
      Array.isArray(updates.stack)
        ? updates.stack
        : currentProject.stack,

    gallery:
      updates.gallery !== undefined &&
      Array.isArray(updates.gallery)
        ? updates.gallery
        : currentProject.gallery,

    stages:
      updates.stages !== undefined &&
      Array.isArray(updates.stages)
        ? updates.stages
        : currentProject.stages,

    featured:
      updates.featured !== undefined
        ? Boolean(updates.featured)
        : currentProject.featured,
  };

  const updatedProjects = projects.map((project) =>
    project.id === id
      ? updatedProject
      : project
  );

  saveProjects(updatedProjects);

  return updatedProject;
}

export function deleteProject(id) {
  if (!id) {
    return getProjects();
  }

  const projects = getProjects().filter(
    (project) => project.id !== id
  );

  saveProjects(projects);

  return projects;
}

export function getSettings() {
  const settings = read(SETTINGS_KEY, null);

  if (!settings || typeof settings !== 'object') {
    return defaultSiteSettings;
  }

  return {
    ...defaultSiteSettings,
    ...settings,
  };
}

export function saveSettings(settings = {}) {
  const nextSettings = {
    ...defaultSiteSettings,
    ...settings,
  };

  write(SETTINGS_KEY, nextSettings);

  return nextSettings;
}

export function resetPortfolio() {
  try {
    localStorage.removeItem(PROJECTS_KEY);
    localStorage.removeItem(SETTINGS_KEY);
  } catch {
    // Ignore storage errors.
  }
}

export function seedPortfolio() {
  saveProjects(seedProjects);
  saveSettings(defaultSiteSettings);

  return {
    projects: seedProjects,
    settings: defaultSiteSettings,
  };
}