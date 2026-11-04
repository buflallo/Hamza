// The numbered index: the nav, and the number in front of every section label.
export const NAV = [
  { id: "About", label: "About" },
  { id: "Experience", label: "AZUL Cloud" },
  { id: "Works", label: "Projects" },
  { id: "Skills", label: "Skills" },
  { id: "Contact", label: "Contact" },
];
export const NAV_IDS = NAV.map(({ id }) => id);
// "01", "02"... for a section id.
export const sectionNumber = (id) =>
  String(NAV_IDS.indexOf(id) + 1).padStart(2, "0");

// Optional public contact details. Leave empty to hide the link.
export const CONTACT_EMAIL = "";
export const CV_URL = ""; // e.g. "cv.pdf" once the file is added to /public

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hamza-lachqar/" },
  { label: "GitHub", href: "https://github.com/buflallo/" },
  { label: "Instagram", href: "https://www.instagram.com/hmazi96/" },
];

export const TAGS = [
  "Python backend",
  "DevOps",
  "Platform engineering",
  "Kubernetes",
  "OpenStack",
  "IAM & security",
];

export const OPEN_TO = "Open to junior / mid roles";

export const HERO = {
  lead: "Platform",
  rest: "& backend engineer",
  text: "Python, Kubernetes and OpenStack. I led about ten engineers building a sovereign cloud for a university.",
  open: "Open to backend · DevOps · platform roles",
  // The one line the rest of the page proves.
  voice: "Everyone looks up at the ceiling. I build what holds it up.",
  scroll: "Scroll · see what holds it up",
};

export const ABOUT = {
  title: "Hello, I am Hamza.",
  line: "I work on the side of the product nobody sees.",
  text: "Python and Django control planes, Kubernetes, OpenStack, identity and GitOps. For two years I led about ten engineers on AZUL Cloud, a sovereign cloud for Mohammed VI Polytechnic University. I also ship interfaces in React and Vue, so I know what the platform is for.",
  facts: [
    { label: "Now", value: OPEN_TO },
    { label: "Focus", value: "Python backend · DevOps · platform" },
    { label: "Trained", value: "1337 Coding School · CS degree" },
  ],
  surface: "React · TS · Vue",
  underneath: "Python · Django · Kubernetes · OpenStack",
};

export const EXPERIENCE = {
  name: "AZUL Cloud",
  period: "2024 – 2026",
  label: "Underneath",
  role: "Technical lead",
  org: "Mohammed VI Polytechnic University",
  summary:
    "A sovereign, multi-tenant cloud built on-premises: IaaS, PaaS, managed databases, networking, identity and billing behind one account.",
  nodes: [
    "IAM",
    "OpenStack",
    "Kubernetes",
    "Databases",
    "Network",
    "Billing",
    "Notify",
    "GitOps",
  ],
  numbers: [
    { value: "10", label: "engineers" },
    { value: "13", label: "repositories" },
    { value: "2,900", label: "commits" },
    { value: "22+", label: "written decisions" },
  ],
  details: [
    {
      title: "Platform control plane",
      text: "Led the Django/Celery control plane that turns tenant requests into Kubernetes resources: builds from source with kpack, deploys through ArgoCD, provisions managed PostgreSQL (CloudNativePG) and MongoDB (Percona), with per-tenant Cilium network policies.",
    },
    {
      title: "IaaS on OpenStack",
      text: "Oversaw the VM service (create, power, resize, snapshots, SSH keys) on Nova, Keystone and Vault, with a transactional outbox on RabbitMQ so no operation is lost or duplicated.",
    },
    {
      title: "Identity and authorization",
      text: "Drove the shared IAM layer: Keycloak, an authorize API and OPA/Rego policies across compute, network, storage, PaaS and IAM, with provider credentials held per organization in Vault.",
    },
    {
      title: "Onboarding, billing, notifications",
      text: "Delivered a saga-based onboarding service with compensation and idempotent retries, billing on OpenCost data, and event-driven notifications on RabbitMQ.",
    },
    {
      title: "Infrastructure and delivery",
      text: "Oversaw Terraform and Ansible for OpenStack-Ansible and RKE2, GitOps with ArgoCD and Kustomize, and a cluster stack of Cilium, Rook-Ceph, Vault, Harbor, Prometheus and Tetragon.",
    },
    {
      title: "Engineering rigor",
      text: "Set the architecture rules (one owner per piece of state, no provider call without explicit authority, Postgres as source of truth), recorded in 22+ ADRs and enforced by guardrail and end-to-end tests.",
    },
  ],
};

export const PROJECTS_HEAD = {
  title: "What it stands on",
  line: "Before the cloud: a shell, a web server, a game engine, a multiplayer game. Built from scratch at 1337.",
};

// Each project may also set `repo` and/or `demo` URLs; links render only when present.
// `layer` places it in the building: the structure, or the foundation under it.
export const PROJECTS = [
  {
    title: "AZUL Cloud",
    category: "Platform engineering · 2024–2026",
    layer: "Structure",
    diagram: true,
    note: "Private repositories, so the story is told as a diagram.",
  },
  {
    title: "Minishell",
    category: "A Unix shell in C",
    layer: "Foundation",
    media: "projects/minishell",
    ratio: "564 / 468",
    alt: "Terminal session running the Minishell shell written in C",
  },
  {
    title: "Webserv",
    category: "An HTTP server from scratch",
    layer: "Foundation",
    media: "projects/webserv",
    ratio: "1917 / 1025",
    alt: "Webserv HTTP server handling requests",
  },
  {
    title: "Cube3d",
    category: "A raycasting engine",
    layer: "Foundation",
    media: "projects/cub3d",
    ratio: "640 / 448",
    alt: "Cube3d raycasting game demo",
  },
  {
    title: "Transcendence",
    category: "Real-time multiplayer Pong",
    layer: "Foundation",
    media: "projects/trandandan",
    ratio: "600 / 330",
    alt: "Transcendence real-time multiplayer Pong web app",
  },
];

export const SKILLS_HEAD = {
  title: "The stack, top to bottom",
  top: "What people see",
  bottom: "what holds it up",
};

// Top to bottom, like a cross-section: the surface first, the ground last.
export const SKILLS = [
  {
    id: "frontend",
    title: "Frontend",
    layer: "Surface",
    color: "#E1FF00",
    description:
      "Interfaces when the product needs them: React, TypeScript and Vue.js, shaped in Figma.",
    stack: ["React", "TypeScript", "Vue", "Figma"],
  },
  {
    id: "backend",
    title: "Backend",
    layer: "APIs",
    color: "#FFD100",
    description:
      "Resilient APIs and control planes in Python: Django, DRF and Celery, with PostgreSQL, Redis and RabbitMQ.",
    stack: ["Python", "Django", "Celery", "PostgreSQL", "RabbitMQ"],
  },
  {
    id: "devops",
    title: "DevOps",
    layer: "Delivery",
    color: "#E0234E",
    description:
      "Delivery as code: GitOps with ArgoCD, Terraform, Ansible, kpack buildpacks and GitLab CI.",
    stack: ["ArgoCD", "Terraform", "Ansible", "GitLab CI", "Helm"],
  },
  {
    id: "platform",
    title: "Platform",
    layer: "Ground",
    color: "#61DAFB",
    description:
      "Kubernetes, OpenStack and the layers under them: Cilium, Rook-Ceph, Harbor, Vault and per-tenant networking.",
    stack: ["Kubernetes", "OpenStack", "Cilium", "Rook-Ceph", "Vault"],
  },
];

export const CONTACT = {
  title: ["Hiring for", "the platform?"],
  line: "You have seen the ceiling. Let’s talk about what holds yours up.",
  back: "Back to the ceiling",
};
