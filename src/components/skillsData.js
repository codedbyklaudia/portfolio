// Your tools and languages, shared by the Toolbox window and the skills strip.
// Edit this list in one place and both update.
//
// Icons come from Devicon via CDN. To use your own files instead, replace
// the `icon` value with a path like '/images/skills/react.svg'.
const dev = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

export const CODE_LANGUAGES = [
  { name: 'HTML',       icon: dev('html5') },
  { name: 'CSS',        icon: dev('css3') },
  { name: 'Sass',       icon: dev('sass') },
  { name: 'JavaScript', icon: dev('javascript') },
  { name: 'TypeScript', icon: dev('typescript') },
  { name: 'Java',       icon: dev('java') },
];

export const SOFTWARE = [
  { name: 'React',          icon: dev('react') },
  { name: 'Node.js',        icon: dev('nodejs') },
  { name: 'Express',        icon: dev('express') },
  { name: 'PostgreSQL',     icon: dev('postgresql') },
  { name: 'Vite',           icon: dev('vitejs') },
  { name: 'Tailwind CSS',   icon: dev('tailwindcss') },
  { name: 'Git',            icon: dev('git') },
  { name: 'GitHub',         icon: dev('github') },
  { name: 'VS Code',        icon: dev('vscode') },
  { name: 'Android Studio', icon: dev('androidstudio') },
  { name: 'Figma',          icon: dev('figma') },
  { name: 'Postman',        icon: dev('postman') },
];