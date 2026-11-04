export const NAV_SECTIONS = ["About", "Experience", "Works", "Contact"];

// Optional public contact details. Leave empty to hide the link.
export const CONTACT_EMAIL = "";
export const CV_URL = ""; // e.g. "cv.pdf" once the file is added to /public

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/hmazi96/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hamza-lachqar/" },
  { label: "GitHub", href: "https://github.com/buflallo/" },
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
};

export const ABOUT =
  "I build the platform underneath products: Python and Django control planes, Kubernetes, OpenStack, identity and GitOps. For two years I led about ten engineers on AZUL Cloud, a sovereign cloud for Mohammed VI Polytechnic University. I trained at 1337 Coding School, hold a degree in computer science, and also ship interfaces in React and Vue. Looking for a Python backend, DevOps or platform engineering role.";

export const EXPERIENCE = {
  name: "AZUL Cloud",
  period: "2024 – 2026",
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

// Each project may also set `repo` and/or `demo` URLs; links render only when present.
export const PROJECTS = [
  {
    title: "AZUL Cloud",
    category: "Platform engineering · 2024–2026",
    diagram: true,
    note: "Private repositories, so the story is told as a diagram.",
  },
  {
    title: "Minishell",
    category: "Software Development",
    media: "projects/minishell",
    ratio: "564 / 468",
    alt: "Terminal session running the Minishell shell written in C",
  },
  {
    title: "Webserv",
    category: "Server Development",
    media: "projects/webserv",
    ratio: "1917 / 1025",
    alt: "Webserv HTTP server handling requests",
  },
  {
    title: "Cube3d",
    category: "Game Development",
    media: "projects/cub3d",
    ratio: "640 / 448",
    alt: "Cube3d raycasting game demo",
  },
  {
    title: "Transcendence",
    category: "Web Development",
    media: "projects/trandandan",
    ratio: "600 / 330",
    alt: "Transcendence real-time multiplayer Pong web app",
  },
];

export const SKILLS = [
  {
    id: "backend",
    title: "Backend",
    color: "#FFD100",
    description:
      "Resilient APIs and control planes in Python: Django, DRF and Celery, with PostgreSQL, Redis and RabbitMQ.",
    stack: ["Python", "Django", "Celery", "PostgreSQL", "RabbitMQ"],
  },
  {
    id: "platform",
    title: "Platform",
    color: "#61DAFB",
    description:
      "Kubernetes, OpenStack and the layers under them: Cilium, Rook-Ceph, Harbor, Vault and per-tenant networking.",
    stack: ["Kubernetes", "OpenStack", "Cilium", "Rook-Ceph", "Vault"],
  },
  {
    id: "devops",
    title: "DevOps",
    color: "#E0234E",
    description:
      "Delivery as code: GitOps with ArgoCD, Terraform, Ansible, kpack buildpacks and GitLab CI.",
    stack: ["ArgoCD", "Terraform", "Ansible", "GitLab CI", "Helm"],
  },
  {
    id: "frontend",
    title: "Frontend",
    color: "#E1FF00",
    description:
      "Interfaces when the product needs them: React, TypeScript and Vue.js, shaped in Figma.",
    stack: ["React", "TypeScript", "Vue", "Figma"],
  },
];
