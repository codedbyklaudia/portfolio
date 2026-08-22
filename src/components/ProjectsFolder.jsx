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

// ── Mac "Get Info" dialog — restyled to read as an extension of the Finder
// window itself (same title-bar/toolbar chrome, same fonts/greys/pill tags)
// rather than a separate glassy modal design. ──
function MacDialog({ project, onClose }) {
  const { id, name, type, color, tagline, tags, credits } = project;
  const navigate = useNavigate();

  // "Open Project" — instead of navigating instantly, an expanding
  // circle in the project's own color grows from the exact spot you
  // clicked, covers the screen, and only THEN navigates — same
  // "themed transition before the real thing happens" pattern as the
  // language-switch wave on Hero.jsx, just click-triggered instead of
  // scroll-triggered.
  const [opening, setOpening] = useState(null);   // { x, y } or null
  const [expanded, setExpanded] = useState(false);

  const handleOpenProject = (e) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setOpening({ x: clientX, y: clientY });
    // Double rAF: paints the 0px circle first, THEN triggers the
    // transition to full size on the next frame — without this the
    // browser can collapse the 0→full change into a single paint and
    // the transition never visibly plays.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setExpanded(true));
    });
    setTimeout(() => {
      navigate(`/project/${id}`);
    }, 900);
  };

  return (
    <div className="mac-overlay" onClick={onClose}>
      {opening && (
        <div
          className="pf-open-overlay"
          aria-hidden="true"
          style={{
            background: color,
            clipPath: expanded
              ? `circle(150% at ${opening.x}px ${opening.y}px)`
              : `circle(0px at ${opening.x}px ${opening.y}px)`,
          }}
        />
      )}
      <div className="mac-win" style={{'--mc': color}} onClick={e => e.stopPropagation()}>

        <div className="pf-titlebar">
          <div className="pf-traffic">
            <span className="pf-dot pf-dot--r" onClick={onClose} style={{ cursor: 'pointer' }} />
            <span className="pf-dot pf-dot--y" />
            <span className="pf-dot pf-dot--g" />
          </div>
          <span className="pf-titlebar-title">{name}</span>
        </div>

        <div className="pf-toolbar mac-toolbar">
          <div className="pf-breadcrumb">
            <span className="pf-breadcrumb-icon">📁</span>
            Projects / {name}
          </div>
          <span className="mac-type-pill">{type}</span>
        </div>

        <div className="mac-body">
          <div className="mac-row">
            <div className="mac-ico"><FolderSVG color={color} isOpen/></div>
            <div className="mac-msg">
              <p className="mac-tag">"{tagline}"</p>
              {credits && <p className="mac-cred">🤝 {credits.join(' & ')}</p>}
            </div>
          </div>

          <div className="mac-sep"/>

          <div className="mac-chips">
            {tags.map(t => (
              <span key={t} className="mac-chip">
                <span className="mac-chip-dot" style={{ background: color }} />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="pf-statusbar mac-statusbar">
          <button className="mac-btn mac-cancel" onClick={onClose}>Cancel</button>
          <button className="mac-btn mac-ok" style={{ background: color }} onClick={handleOpenProject}>
            Open Project →
          </button>
        </div>

      </div>
    </div>
  );
}

const SIDEBAR_LOCATIONS = [
  { key: 'all',    label: 'All Projects' },
  { key: 'web',    label: 'Web' },
  { key: 'app',    label: 'Apps' },
  { key: 'collab', label: 'Collaborative' },
];

function getCategories(project) {
  if (Array.isArray(project.categories)) return project.categories;
  if (project.category) return [project.category];
  return [];
}

export default function ProjectsFolder() {
  const { t } = useLanguage();
  const sectionRef                 = useRef(null);
  const [openId, setOpenId]       = useState(null);
  const [activeLoc, setActiveLoc] = useState('all');
  const [progress, setProgress]   = useState(0);

  const openProject = projects.find(p => p.id === openId);
  const visibleProjects = activeLoc === 'all'
    ? projects
    : projects.filter(p => getCategories(p).includes(activeLoc));

  useEffect(() => {
    document.body.style.overflow = openId ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [openId]);

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

  const finderEase  = 1 - Math.pow(1 - progress, 3);

  return (
    <>
      <section id="projects-folder" className="pf-section" ref={sectionRef}>

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

          {/* ── Window chrome ── */}
          <div className="pf-titlebar">
            <div className="pf-traffic">
              <span className="pf-dot pf-dot--r" />
              <span className="pf-dot pf-dot--y" />
              <span className="pf-dot pf-dot--g" />
            </div>
            <span className="pf-titlebar-title">CodedByKlaudia - Projects</span>
          </div>

          <div className="pf-toolbar">
            <div className="pf-nav-btns">
              <button className="pf-nav-btn" aria-hidden="true">‹</button>
              <button className="pf-nav-btn" aria-hidden="true">›</button>
            </div>
            <div className="pf-breadcrumb">
              <span className="pf-breadcrumb-icon">📁</span>
              Projects — {activeLoc === 'all' ? 'All' : SIDEBAR_LOCATIONS.find(l => l.key === activeLoc)?.label}
            </div>
            <div className="pf-search">
              <span>🔍</span>
              <span className="pf-search-placeholder">Search</span>
            </div>
          </div>

          {/* ── Body: sidebar + grid ── */}
          <div className="pf-body">
            <aside className="pf-sidebar">
              <p className="pf-sidebar-label">Favourites</p>
              {SIDEBAR_LOCATIONS.map(loc => (
                <button
                  key={loc.key}
                  className={`pf-sidebar-item ${activeLoc === loc.key ? 'pf-sidebar-item--active' : ''}`}
                  onClick={() => setActiveLoc(loc.key)}
                >
                  <span className="pf-sidebar-dot" />
                  {loc.label}
                </button>
              ))}
              <p className="pf-sidebar-label">Tags</p>
              <div className="pf-sidebar-tags">
                <span className="pf-tag-dot" style={{ background: '#6B4FA0' }} />
                <span className="pf-tag-dot" style={{ background: '#C95B2A' }} />
                <span className="pf-tag-dot" style={{ background: '#3A7A6A' }} />
              </div>
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
                      onClick={() => setOpenId(proj.id)}
                    >
                      <FolderSVG color={proj.color} isOpen={false} />
                      <span className="pf-card-name">{proj.name}</span>
                      <span className="pf-card-type">{proj.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pf-statusbar">
            {visibleProjects.length} item{visibleProjects.length !== 1 ? 's' : ''}
          </div>
        </div>
        </div>
      </section>

      {openProject && (
        <MacDialog project={openProject} onClose={() => setOpenId(null)} />
      )}
    </>
  );
}