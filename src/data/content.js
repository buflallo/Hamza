export const NAV_SECTIONS = ["About", "Works", "Contact"];

// Optional public contact details. Leave empty to hide the link.
export const CONTACT_EMAIL = "";
export const CV_URL = ""; // e.g. "cv.pdf" once the file is added to /public

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/hmazi96/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hamza-lachqar/" },
  { label: "GitHub", href: "https://github.com/buflallo/" },
];

export const TAGS = [
  "Web Development",
  "Software Engineering",
  "IT Solutions",
  "UI/UX Design",
  "Mathematics",
  "Cyber Security",
];

// Each project may also set `repo` and/or `demo` URLs; links render only when present.
export const PROJECTS = [
  {
    title: "Minishell",
    category: "Software Development",
    media: "projects/minishell",
    alt: "Terminal session running the Minishell shell written in C",
  },
  {
    title: "Webserv",
    category: "Server Development",
    media: "projects/webserv",
    alt: "Webserv HTTP server handling requests",
  },
  {
    title: "Cube3d",
    category: "Game Development",
    media: "projects/cub3d",
    alt: "Cube3d raycasting game demo",
  },
  {
    title: "Transcendence",
    category: "Web Development",
    media: "projects/trandandan",
    alt: "Transcendence real-time multiplayer Pong web app",
  },
];

export const SKILLS = [
  {
    id: "software",
    title: "Software Development",
    color: "#FFD100",
    viewBox: "0 -3 46 46",
    description:
      "With a solid foundation in software development, I excel in languages like C, C++, and TypeScript. My expertise extends to implementing efficient design patterns to enhance performance and scalability, ensuring that each project I undertake operates seamlessly and effectively.",
  },
  {
    id: "frontend",
    title: "Frontend Development",
    color: "#61DAFB",
    viewBox: "0 0 24 24",
    description:
      "Proficiency in crafting captivating user interfaces using technologies like React, Vue.js, HTML, and CSS. With a keen eye for design and usability, I leverage tools like Figma to create intuitive and visually appealing experiences that engage users effectively.",
  },
  {
    id: "backend",
    title: "Backend Development",
    color: "#E0234E",
    viewBox: "0 0 24 24",
    description:
      "Crafting resilient server-side systems using frameworks like Nest.js and Laravel. Proficient in database management with MySQL and PostgreSQL, I excel in creating efficient data architectures. My expertise in server-side programming and API development ensures the creation of robust, scalable web solutions.",
  },
];

export const QUOTE = {
  text: "Sometimes the best way to solve a problem is to help others.",
  author: "Uncle Iroh, 'Avatar: The Last Airbender'",
};
