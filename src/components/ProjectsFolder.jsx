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

/** A Finder folder that opens on hover: the front flap tips forward and the
    project's mockup slides up out of it */
function Folder({ color, mockup }) {
  return (
    <span
      className="pf-folder"
      style={{ '--fc': color, '--fc-dark': shadeColor(color, -30), '--fc-mid': shadeColor(color, -12) }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 240 200" className="pf-folder-back">
        <path d="M0 34 Q0 20 14 20 L82 20 Q94 20 102 32 L114 50 L226 50 Q240 50 240 64 L240 186 Q240 200 226 200 L14 200 Q0 200 0 186 Z" />
      </svg>
      <img className="pf-folder-peek" src={mockup} alt="" loading="lazy" decoding="async" />
      <span className="pf-folder-front" />
    </span>
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

  const countFor = (key) => (key === 'all' ? projects.length : projects.filter(p => getCategories(p).includes(key)).length);

  // the folder shown in the Quick Look panel: the one you point at, else the first one showing
  const [previewId, setPreviewId] = useState(projects[0]?.id);
  const preview = visibleProjects.find(p => p.id === previewId) || visibleProjects[0];

  // the Quick Look picture tilts towards the mouse
  const tiltRef = useRef(null);
  const tilt = (event) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (event.clientX - r.left) / r.width - 0.5;
    const y = (event.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
  };
  const untilt = () => {
    tiltRef.current?.style.setProperty('--rx', '0deg');
    tiltRef.current?.style.setProperty('--ry', '0deg');
  };

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
      // remember to come back to this section (also for the browser's back button)
      navigate('/', { replace: true, state: { scrollTo: 'projects-folder' } });
      navigate(`/project/${project.id}`);
    }, 900);
  };

  const finderEase = 1 - Math.pow(1 - progress, 3);
  const itemCount = visibleProjects.length;

  return (
    <>
      <section id="projects-folder" className={`pf-section ${progress > 0.97 ? 'pf-section--landed' : ''}`} ref={sectionRef}>
        <div className="pf-layout">

          {/* ── Heading ── */}
          <div
            className="pf-intro"
            style={{
              opacity: finderEase,
              transform: `translateY(${(1 - finderEase) * 30}px)`,
            }}
          >
            <h2 className="pf-title">
              {tr('projects.title', 'Things I’ve')} <em>{tr('projects.titleEnd', 'cooked up.')}</em>
            </h2>
            <p className="pf-lead">
              {tr('projects.lead', 'Apps, websites and a few happy accidents, built with too much coffee and just enough patience. Open a folder and have a snoop.')}
            </p>

            {/* the same filters as the sidebar, as chips (on phones, where the sidebar is hidden) */}
            <div className="pf-chips" role="group" aria-label={tr('projects.favourites', 'Favourites')}>
              {SIDEBAR_LOCATIONS.map(loc => (
                <button
                  key={loc.key}
                  type="button"
                  className={`pf-chip ${activeLoc === loc.key ? 'is-active' : ''}`}
                  aria-pressed={activeLoc === loc.key}
                  onClick={() => setActiveLoc(loc.key)}
                >
                  {tr(loc.trKey, loc.label)}
                  <span className="pf-chip-count">{countFor(loc.key)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Mac Finder window ── */}
          <div className="pf-finder-wrap">
            <div
              className="pf-sticky-note"
              style={{
                opacity: finderEase,
                transform: `translateY(${(1 - finderEase) * 20}px) rotate(5deg)`,
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
                      <span className="pf-sidebar-count">{countFor(loc.key)}</span>
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
                            '--i': i,
                            opacity: cardEase,
                            transform: `translateY(${(1 - cardEase) * 24}px) scale(${0.94 + cardEase * 0.06})`,
                          }}
                          onClick={(e) => openProject(e, proj)}
                          onMouseEnter={() => setPreviewId(proj.id)}
                          onFocus={() => setPreviewId(proj.id)}
                          data-previewing={preview?.id === proj.id || undefined}
                        >
                          <Folder color={proj.color} mockup={proj.mockup} />
                          <span className="pf-card-name">{proj.name}</span>
                          {proj.type && <span className="pf-card-type">{proj.type}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Look: the folder you point at, in more detail */}
                {preview && (
                  <aside className="pf-preview" style={{ '--fc': preview.color }} aria-live="polite">
                    <div className="pf-preview-media" ref={tiltRef} onMouseMove={tilt} onMouseLeave={untilt}>
                      <img key={preview.id} src={preview.mockup} alt="" />
                    </div>
                    <div className="pf-preview-info" key={`info-${preview.id}`}>
                      <p className="pf-preview-meta">
                        <span>{preview.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{t(preview.platformKey)}</span>
                      </p>
                      <h3 className="pf-preview-name">{preview.name}</h3>
                      <p className="pf-preview-tagline">{t(preview.taglineKey)}</p>
                      <ul className="pf-preview-tags">
                        {preview.tags.slice(0, 5).map(tag => <li key={tag}>{tag}</li>)}
                      </ul>
                      <button type="button" className="pf-preview-open" onClick={(e) => openProject(e, preview)}>
                        {tr('projects.open', 'Open project')}
                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </aside>
                )}
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