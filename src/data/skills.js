import { Bot, Brain, Code2, Cpu, Database, GitBranch, Palette, Sparkles, TerminalSquare, Workflow } from 'lucide-react';

export const skillCategories = [
  {
    title: 'Frontend',
    description: 'Interfaces that feel refined, fast, and intuitive.',
    icon: Palette,
    accent: 'from-indigo-500/45 via-violet-500/25 to-fuchsia-500/20',
    skills: [
      {
        title: 'React',
        description: 'Component-driven UI with clear architecture and clean state flow.',
        icon: Code2,
        accent: 'from-indigo-500/35 via-sky-500/20 to-cyan-500/20',
      },
      {
        title: 'Tailwind CSS',
        description: 'Design systems and responsive styling with high-speed iteration.',
        icon: Sparkles,
        accent: 'from-cyan-500/30 via-sky-500/20 to-indigo-500/20',
      },
      {
        title: 'Framer Motion',
        description: 'Subtle motion language that elevates interaction without clutter.',
        icon: Workflow,
        accent: 'from-fuchsia-500/30 via-rose-500/20 to-orange-500/20',
      },
    ],
  },
  {
    title: 'Backend',
    description: 'Reliable services and APIs designed to support modern products.',
    icon: Database,
    accent: 'from-emerald-500/40 via-teal-500/20 to-cyan-500/20',
    skills: [
      {
        title: 'Node.js',
        description: 'Scalable runtime for APIs, tooling, and product-facing services.',
        icon: TerminalSquare,
        accent: 'from-emerald-500/25 via-teal-500/20 to-cyan-500/20',
      },
      {
        title: 'REST APIs',
        description: 'Thoughtful endpoint design with clear contracts and maintainability.',
        icon: Cpu,
        accent: 'from-slate-500/25 via-slate-400/15 to-slate-500/20',
      },
      {
        title: 'Data Modeling',
        description: 'Clean schemas and durable structures that support product growth.',
        icon: Database,
        accent: 'from-cyan-500/25 via-sky-500/20 to-indigo-500/20',
      },
    ],
  },
  {
    title: 'Programming',
    description: 'A strong foundation for building elegant, dependable software.',
    icon: Code2,
    accent: 'from-amber-500/35 via-orange-500/20 to-rose-500/20',
    skills: [
      {
        title: 'JavaScript',
        description: 'Modern, expressive code with a focus on clarity and maintainability.',
        icon: Code2,
        accent: 'from-amber-500/25 via-orange-500/20 to-rose-500/20',
      },
      {
        title: 'TypeScript',
        description: 'Safer component and API development with better developer ergonomics.',
        icon: Brain,
        accent: 'from-blue-500/25 via-indigo-500/20 to-violet-500/20',
      },
      {
        title: 'Problem Solving',
        description: 'Breaking complex work into thoughtful loops, systems, and trade-offs.',
        icon: Sparkles,
        accent: 'from-fuchsia-500/25 via-violet-500/20 to-indigo-500/20',
      },
    ],
  },
  {
    title: 'Tools',
    description: 'The workflow layer that keeps projects polished and moving.',
    icon: GitBranch,
    accent: 'from-sky-500/35 via-cyan-500/20 to-emerald-500/20',
    skills: [
      {
        title: 'Git & GitHub',
        description: 'Version control and collaboration habits that keep shipping smooth.',
        icon: GitBranch,
        accent: 'from-sky-500/25 via-cyan-500/20 to-emerald-500/20',
      },
      {
        title: 'Docker',
        description: 'Consistent local and deployment environments with less friction.',
        icon: TerminalSquare,
        accent: 'from-cyan-500/25 via-slate-500/20 to-sky-500/20',
      },
      {
        title: 'VS Code',
        description: 'A fast, ergonomic editor for focused build and iteration cycles.',
        icon: Code2,
        accent: 'from-indigo-500/25 via-violet-500/20 to-fuchsia-500/20',
      },
    ],
  },
  {
    title: 'AI',
    description: 'Using intelligent tooling to accelerate thoughtful product development.',
    icon: Bot,
    accent: 'from-violet-500/40 via-fuchsia-500/25 to-indigo-500/20',
    skills: [
      {
        title: 'Prompt Design',
        description: 'Clear, structured prompts that turn ideas into reliable output.',
        icon: Bot,
        accent: 'from-violet-500/25 via-fuchsia-500/20 to-indigo-500/20',
      },
      {
        title: 'AI-Assisted Workflows',
        description: 'Integrating emerging tools into product loops without losing craftsmanship.',
        icon: Brain,
        accent: 'from-fuchsia-500/25 via-rose-500/20 to-orange-500/20',
      },
      {
        title: 'Automation',
        description: 'Reducing repetitive execution so more energy goes into strategy and polish.',
        icon: Cpu,
        accent: 'from-cyan-500/25 via-sky-500/20 to-violet-500/20',
      },
    ],
  },
];

export const skillsContent = {
  eyebrow: 'Skills',
  heading: 'A modern toolkit shaped by craft, curiosity, and product focus.',
  intro: 'The work is grounded in thoughtful execution — from polished interfaces to dependable systems — with a strong emphasis on clarity, speed, and detail.',
};
