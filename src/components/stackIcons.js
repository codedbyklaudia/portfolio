// Finds an icon for each tool listed on a project (its `tags`).
// Icons for your own skills come from skillsData.js. A few more common
// tools are added below. Anything without an icon gets a lettered badge.
import { CODE_LANGUAGES, SOFTWARE } from './skillsData';

const normalize = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

const dev = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

const ICONS = {};
[...CODE_LANGUAGES, ...SOFTWARE].forEach(({ name, icon }) => {
  ICONS[normalize(name)] = icon;
});

// Extra tools that are not in your skills list
Object.assign(ICONS, {
  android: dev('android'),
  firebase: dev('firebase'),
  firebasefcm: dev('firebase'),
  socketio: dev('socketio'),
  mongodb: dev('mongodb'),
  php: dev('php'),
  python: dev('python'),
  kotlin: dev('kotlin'),
  swift: dev('swift'),
  docker: dev('docker'),
  mysql: dev('mysql'),
});

// Other spellings that mean the same tool
const ALIASES = {
  scss: 'sass',
  tailwind: 'tailwindcss',
  node: 'nodejs',
  postgres: 'postgresql',
  reactjs: 'react',
  ts: 'typescript',
  js: 'javascript',
};

export function getStackItems(tags = []) {
  return tags.map((name) => {
    const key = normalize(name);
    return {
      name,
      icon: ICONS[key] || ICONS[ALIASES[key]] || null,
      initial: name.trim().charAt(0).toUpperCase() || '?',
    };
  });
}