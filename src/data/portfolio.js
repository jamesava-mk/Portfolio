export const seedProjects = [
  {
    id: 'beunique',
    slug: 'beunique',
    title: 'BeUnique Wears',
    shortTitle: 'BEUNIQUE',
    category: 'PRODUCT / ECOMMERCE',
    year: '2026',
    status: 'BUILDING',
    featured: true,

    description:
      'An ecommerce build I started to understand what actually happens behind a modern online store.',

    problem:
      'I had built websites before, but mostly around presentation. BeUnique became the point where I wanted to understand what happens underneath an online store.',

    why:
      'I wanted to move beyond designing pages and learn how products, carts, accounts, orders, inventory and checkout fit together.',

    tried:
      'I started from the shopping experience and gradually pushed deeper into the application architecture.',

    changed:
      'The project became less about making another portfolio piece and more about understanding how several parts of a product depend on each other.',

    broke:
      'The checkout and account flow exposed problems that were invisible when I was only thinking about the interface.',

    learned:
      'A polished interface can hide a lot of complexity. Building the system underneath it is where the real learning started.',

    stack: [
      'React',
      'Vite',
      'Tailwind',
      'Framer Motion',
      'JavaScript',
      'Vercel',
    ],

    liveUrl: 'https://beunique-store.vercel.app',
    githubUrl: '',

    heroImage: '/projects/beunique.png',
    gallery: [],

    stages: [
      'IDEA',
      'DESIGN',
      'CODE',
      'BREAK',
      'FIX',
      'STORE',
    ],
  },

  {
    id: 'femdot',
    slug: 'femdot',
    title: 'Femdot Barbers',
    shortTitle: 'FEMDOT',
    category: 'CLIENT / WEB',
    year: '2026',
    status: 'SHIPPED',
    featured: true,

    description:
      'A focused website for a Lagos barbershop, built around clarity, identity and direct contact.',

    problem:
      'A local business does not necessarily need a complicated website. It needs to make the business understandable and make contacting it easy.',

    why:
      'I wanted to build something that felt more considered than a typical small-business template without adding unnecessary functionality.',

    tried:
      'I focused on the visual identity, services, business information and direct contact flow.',

    changed:
      'The experience became deliberately simple: understand the shop, see what they offer, then get in touch.',

    broke:
      'Some early ideas added too many calls to action and made the experience feel like it was trying too hard.',

    learned:
      'Sometimes removing functionality is the better product decision.',

    stack: [
      'React',
      'Vite',
      'Tailwind',
      'Framer Motion',
    ],

    liveUrl: '',
    githubUrl: 'https://github.com/jamesava-mk/femdot-barbers',

    heroImage: '/projects/femdot.png',
    gallery: [],

    stages: [
      'CLIENT',
      'CONTENT',
      'DESIGN',
      'BUILD',
      'REFINE',
      'LAUNCH',
    ],
  },

  {
    id: 'lala',
    slug: 'lala',
    title: 'Lala',
    shortTitle: 'LALA',
    category: 'SOFTWARE / SIWES',
    year: '2026',
    status: 'BUILDING',
    featured: true,

    description:
      'A project I worked on during my SIWES placement while learning what software development looks like inside an existing working environment.',

    problem:
      'Working on an existing project is different from starting something from an empty folder. You first have to understand what is already there.',

    why:
      'Lala gave me the opportunity to work within an existing project and learn from the people and processes around it.',

    tried:
      'I worked through project tasks, attended discussions, learned from colleagues and gradually became more familiar with how the work was organised.',

    changed:
      'My understanding of development became less focused on writing code in isolation and more focused on understanding the system before changing it.',

    broke:
      'Not every problem could be solved by immediately writing more code.',

    learned:
      'Understanding the existing system is often the first technical task.',

    stack: [
      'Web Development',
      'JavaScript',
      'Software Engineering',
    ],

    liveUrl: '',
    githubUrl: '',

    heroImage: '/projects/lala.png',
    gallery: [],

    stages: [
      'CONTEXT',
      'UNDERSTAND',
      'WORK',
      'DISCUSS',
      'ADAPT',
      'LEARN',
    ],
  },

  {
    id: 'omak',
    slug: 'omak',
    title: 'Omak',
    shortTitle: 'OMAK',
    category: 'WEB / BUILD',
    year: '2026',
    status: 'SHIPPED',
    featured: true,

    description:
      'A web project that became another step in figuring out how design decisions translate into actual interfaces.',

    problem:
      'Making a page look good in isolation is easy. Making the entire experience feel intentional is harder.',

    why:
      'I wanted to push myself beyond assembling sections and actually think about how the interface behaves as a whole.',

    tried:
      'I experimented with layout, typography, interaction and responsive behaviour while trying to keep the experience focused.',

    changed:
      'The project pushed me toward thinking about hierarchy and user flow instead of treating every section as equally important.',

    broke:
      'Some visual ideas looked interesting individually but weakened the overall experience when combined.',

    learned:
      'Good design is often more about what you leave out than what you add.',

    stack: [
      'React',
      'Vite',
      'Tailwind',
      'JavaScript',
    ],

    liveUrl: '',
    githubUrl: '',

    heroImage: '/projects/omak.png',
    gallery: [],

    stages: [
      'IDEA',
      'EXPLORE',
      'BUILD',
      'REFINE',
      'SHIP',
    ],
  },

  {
    id: 'kora',
    slug: 'kora',
    title: 'Kora',
    shortTitle: 'KORA',
    category: 'WEB / EXPERIMENT',
    year: '2026',
    status: 'EXPERIMENT',
    featured: true,

    description:
      'An experimental build where the main challenge was figuring out how far an interface could go without becoming noise.',

    problem:
      'Interactive websites can easily become demonstrations of effects instead of useful experiences.',

    why:
      'I wanted to explore interaction while keeping the actual purpose of the interface in control.',

    tried:
      'I experimented with movement, composition and interaction while constantly removing things that felt decorative rather than useful.',

    changed:
      'The project became an exercise in restraint as much as experimentation.',

    broke:
      'Some interactions looked good in isolation but distracted from the content.',

    learned:
      'Animation works best when it gives the user information, feedback or direction.',

    stack: [
      'React',
      'Framer Motion',
      'Tailwind',
      'JavaScript',
    ],

    liveUrl: '',
    githubUrl: '',

    heroImage: '/projects/kora.png',
    gallery: [],

    stages: [
      'QUESTION',
      'EXPLORE',
      'BREAK',
      'SIMPLIFY',
      'REFINE',
    ],
  },
];

export const defaultSiteSettings = {
  currentMode: 'BUILDING',

  availability: 'OPEN TO INTERESTING WORK',

  currentFocus:
    'Learning how real software systems fit together by building them.',
};