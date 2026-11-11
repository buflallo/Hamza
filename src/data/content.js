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
  text: "Python, Kubernetes and OpenStack. I built the managed services and the identity layer of AZUL Cloud, UM6P’s sovereign cloud.",
  open: "Open to backend · DevOps · platform roles",
  // The one line the rest of the page proves.
  voice: "Everyone looks up at the ceiling. I build what holds it up.",
  scroll: "Scroll · see what holds it up",
};

export const ABOUT = {
  title: "Hello, I am Hamza.",
  line: "I work on the side of the product nobody sees.",
  text: "Python and Django control planes, Kubernetes, OpenStack, identity and GitOps. I joined AZUL Cloud, the sovereign cloud of Mohammed VI Polytechnic University, as an intern and built its first app platform. I came back as a backend developer with a plan to grow it into CI/CD, managed databases, object storage and one IAM, and AZUL Cloud opened to public beta in June 2026. The architecture and designs are mine; coding agents help me write the code. I also ship interfaces in React and Vue, so I know what the platform is for.",
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
  role: "Intern, then backend developer",
  org: "Mohammed VI Polytechnic University",
  summary:
    "A sovereign, multi-tenant cloud built on-premises by a five-person team, opened to public beta in June 2026: compute, apps, managed databases, networking and identity behind one account.",
  press: {
    label: "Read the launch",
    href: "https://www.moroccoworldnews.com/2026/06/325594/azul-cloud-moroccos-first-b2c-sovereign-cloud-platform-built-for-builders/",
  },
  // The whole platform, on a ring. `mine` lights the parts I built; the rest
  // were my teammates' (frontend, Kubernetes, OpenStack).
  nodes: [
    "IAM",
    "Apps",
    "Databases",
    "Network",
    "Storage",
    "OpenStack",
    "Kubernetes",
    "Compute",
    "Onboarding",
  ],
  mine: ["IAM", "Apps", "Databases", "Network", "Storage"],
  numbers: [
    { value: "5", label: "people on the team" },
    { value: "2 of 8", label: "platform services I owned" },
    { value: "22", label: "architecture decisions" },
    { value: "2026", label: "public beta" },
  ],
  details: [
    {
      title: "The first app platform",
      text: "As an intern: apps from source to running on raw Kubernetes (deployments, services, Traefik ingress), built with kpack buildpacks, with build and runtime logs and a web terminal into the app.",
    },
    {
      title: "From hosting to CI/CD",
      text: "Came back with a plan to make it a CI/CD platform, and built it: Helm templates rendered by the Django control plane and deployed through Argo CD, with Celery carrying releases and events so nothing is lost on a restart.",
    },
    {
      title: "Managed databases and networking",
      text: "PostgreSQL on CloudNativePG and MongoDB on Percona: provisioning, storage resize, scaling, hibernate and resume. Tenant networks on Cilium policies.",
    },
    {
      title: "Object storage",
      text: "S3 buckets on OpenStack Swift, with per-project S3 credentials and signed temporary URLs.",
    },
    {
      title: "Identity and authorization",
      text: "An IAM service built from scratch: organizations, invitations and membership, one authorize API on OPA, provider credentials per organization in Vault. It mirrors Kubernetes RBAC and OpenStack roles, so people share resources without adding load on the infrastructure.",
    },
    {
      title: "One home for the docs",
      text: "The team’s central documentation: a scheduled GitLab job pulls each repository’s docs when they change and publishes them in one place.",
    },
    {
      title: "How I work",
      text: "I design the service and write the decision down (22 ADRs), then build and prove it on my own dev cluster before handing it to infra to run. Coding agents help write the code; the architecture and designs are mine.",
    },
  ],
};

export const PROJECTS_HEAD = {
  title: "What it stands on",
  line: "Before the cloud, and alongside it: shells, servers and engines, then clusters and deploys. Built from scratch at 1337.",
  hint: "Hover a row to see it run",
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
    press:
      "https://www.moroccoworldnews.com/2026/06/325594/azul-cloud-moroccos-first-b2c-sovereign-cloud-platform-built-for-builders/",
  },
  // No preview yet: add `repo` once the repositories are public.
  {
    title: "Inception-of-Things",
    category: "Kubernetes with K3s, K3d and Argo CD",
    layer: "Foundation",
  },
  {
    title: "Cloud-1",
    category: "A web stack deployed to the cloud with Ansible",
    layer: "Foundation",
  },
  {
    title: "Cybersecurity piscine",
    category: "Offensive and defensive security exercises",
    layer: "Foundation",
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
    id: "design",
    title: "Design",
    layer: "Frame",
    color: "#FFFFFF",
    description:
      "How the services are shaped: bounded contexts with one owner for each piece of state, reconcile loops that bring the real world back to what was asked, idempotent APIs with an outbox so nothing is lost or done twice, fail-closed authorization, and every decision written down.",
    stack: [
      "Bounded contexts",
      "Reconcile loops",
      "Idempotency",
      "Outbox",
      "ADRs",
    ],
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
