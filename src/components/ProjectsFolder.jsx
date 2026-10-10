import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import './ProjectsFolder.scss';

export function shadeColor(hex, pct) {
  const n = parseInt(hex.replace('#',''), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + pct));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + pct));
  const b = Math.min(255, Math.max(0, (n & 0xff) + pct));
  return `#${((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}`;
}

export function FolderSVG({ color, isOpen }) {
  const dark = shadeColor(color, -30);
  const mid  = shadeColor(color, -12);
  if (isOpen) return (
    <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" className="pf-svg">
      <rect x="0" y="30" width="240" height="170" rx="14" fill={dark}/>
      <path d="M0 30 Q0 16 14 16 L82 16 Q94 16 102 28 L114 46 L0 46 Z" fill={dark}/>
      <rect x="26" y="26" width="178" height="110" rx="7" fill="#E2DED8"/>
      <rect x="18" y="34" width="178" height="102" rx="7" fill="#EDEBE6"/>
      <rect x="10" y="42" width="178" height="94"  rx="7" fill="#F8F6F2"/>
      <path d="M0 106 L0 186 Q0 200 14 200 L226 200 Q240 200 240 186 L240 106 Z" fill={color}/>
    </svg>
  );
  return (
    <svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" className="pf-svg">
      <rect x="0" y="34" width="240" height="166" rx="14" fill={dark}/>
      <path d="M0 34 Q0 20 14 20 L82 20 Q94 20 102 32 L114 50 L0 50 Z" fill={dark}/>
      <rect x="0" y="50" width="240" height="150" rx="14" fill={mid}/>
      <rect x="0" y="56" width="240" height="144" rx="14" fill={color}/>
    </svg>
  );
}

// trKey is the translation key, label the English fallback
const SIDEBAR_LOCATIONS = [
  { key: 'all',    trKey: 'projects.all',    label: 'All Projects' },
  { key: 'web',    trKey: 'projects.web',    label: 'Web' },
  { key: 'app',    trKey: 'projects.apps',   label: 'Apps' },
  { key: 'collab', trKey: 'projects.collab', label: 'Collaborative' },
];

function getCategories(project) {
  if (Array.isArray(project.categories)) return project.categories;
  if (project.category) return [project.category];
  return [];
}

export default function ProjectsFolder() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Translation with an English fallback for keys that don't exist yet
  const tr = (key, fallback) => {
    const value = t(key);
    return !value || value === key ? fallback : value;
  };

  const sectionRef                 = useRef(null);
  const timerRef                   = useRef(null);
  const [activeLoc, setActiveLoc] = useState('all');
  const [progress, setProgress]   = useState(0);
  const [opening, setOpening]     = useState(null);   // { x, y, color } or null
  const [expanded, setExpanded]   = useState(false);

  const visibleProjects = activeLoc === 'all'
    ? projects
    : projects.filter(p => getCategories(p).includes(activeLoc));

  // ── Own scroll-driven parallax reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const raw = 1 - rect.top / (vh * 0.7);
        const p = Math.min(1, Math.max(0, raw));
        setProgress(prev => (Math.abs(prev - p) < 0.002 ? prev : p));
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Click a folder: a circle in the project's colour grows from the click,
  // covers the screen, and then the project page opens.
  const openProject = (event, project) => {
    if (opening) return;

    let x = event.clientX;
    let y = event.clientY;
    if (!x && !y) {
      // Opened with the keyboard: grow from the middle of the folder
      const rect = event.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }

    setOpening({ x, y, color: project.color });
    // Double rAF: paint the 0px circle first, then start the transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setExpanded(true));
    });
    timerRef.current = setTimeout(() => {
      navigate(`/project/${project.id}`);
    }, 900);
  };

  const finderEase = 1 - Math.pow(1 - progress, 3);
  const itemCount = visibleProjects.length;

  return (
    <>
      <section id="projects-folder" className="pf-section" ref={sectionRef}>
        <div className="pf-layout">

          {/* ── Left: title ── */}
          <div
            className="pf-intro"
            style={{
              opacity: finderEase,
              transform: `translateY(${(1 - finderEase) * 30}px)`,
            }}
          >
            <h2 className="pf-title">{tr('projects.title', 'Selected work')}</h2>
            <p className="pf-lead">
              {tr('projects.lead', "A few things I've designed and built. Open a folder to see the full story.")}
            </p>
          </div>

          {/* ── Right: Mac Finder window ── */}
          <div className="pf-finder-wrap">
            <div
              className="pf-sticky-note"
              style={{
                opacity: finderEase,
                transform: `translateY(${(1 - finderEase) * 20}px) rotate(6deg)`,
              }}
            >
              {t('projects.stickyNote')}
            </div>

            <div
              className="pf-finder"
              style={{
                opacity: finderEase,
                transform: `translateY(${(1 - finderEase) * 70}px) scale(${0.94 + finderEase * 0.06})`,
              }}
            >

              {/* Title bar: traffic lights, back/forward, title */}
              <div className="pf-titlebar">
                <div className="pf-traffic">
                  <span className="pf-dot pf-dot--r" />
                  <span className="pf-dot pf-dot--y" />
                  <span className="pf-dot pf-dot--g" />
                </div>
                <div className="pf-nav-btns" aria-hidden="true">
                  <span className="pf-nav-btn">‹</span>
                  <span className="pf-nav-btn">›</span>
                </div>
                <span className="pf-titlebar-title">
                  <span className="pf-titlebar-icon" aria-hidden="true">📁</span>
                  {tr('projects.windowTitle', 'Projects')}
                </span>
              </div>

              {/* Body: sidebar + grid */}
              <div className="pf-body">
                <aside className="pf-sidebar">
                  <p className="pf-sidebar-label">{tr('projects.favourites', 'Favourites')}</p>
                  {SIDEBAR_LOCATIONS.map(loc => (
                    <button
                      key={loc.key}
                      className={`pf-sidebar-item ${activeLoc === loc.key ? 'pf-sidebar-item--active' : ''}`}
                      onClick={() => setActiveLoc(loc.key)}
                    >
                      <span className="pf-sidebar-dot" />
                      {tr(loc.trKey, loc.label)}
                    </button>
                  ))}
                </aside>

                <div className="pf-grid-wrap">
                  <div className="pf-grid">
                    {visibleProjects.map((proj, i) => {
                      const cardP    = Math.min(1, Math.max(0, (progress - 0.45 - i * 0.05) / 0.4));
                      const cardEase = 1 - Math.pow(1 - cardP, 3);
                      return (
                        <button
                          key={proj.id}
                          className="pf-card"
                          style={{
                            '--fc': proj.color,
                            opacity: cardEase,
                            transform: `translateY(${(1 - cardEase) * 24}px) scale(${0.94 + cardEase * 0.06})`,
                          }}
                          onClick={(e) => openProject(e, proj)}
                        >
                          <FolderSVG color={proj.color} isOpen={false} />
                          <span className="pf-card-name">{proj.name}</span>
                          {proj.type && <span className="pf-card-type">{proj.type}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Status bar, like Finder */}
              <div className="pf-statusbar">
                {tr('projects.itemsLabel', 'Items')}: {itemCount}
              </div>
            </div>
          </div>

        </div>
      </section>

      {opening && (
        <div
          className="pf-open-overlay"
          aria-hidden="true"
          style={{
            background: opening.color,
            clipPath: expanded
              ? `circle(150% at ${opening.x}px ${opening.y}px)`
              : `circle(0px at ${opening.x}px ${opening.y}px)`,
          }}
        />
      )}
    </>
  );
}