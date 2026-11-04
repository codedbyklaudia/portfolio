import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import Footer from './Footer';
import Draggable from './Draggable';
import { StackIcon } from './StackWindow';
import { getStackItems } from './stackIcons';
import './ProjectPage.scss';

// The project page tells the project's story on a Mac desktop: the name and its
// details first, then the tools in a Dock, then a filmstrip of screenshots you
// can swipe through, and finally sticky notes and folders to the next project.

// captionKey (a translation key, e.g. 'project.barkbuddyAndroid.shot1')
// takes priority over the plain caption string when present. Plain `caption`
// is the fallback for any screenshot without a translation key yet.
function normalizeScreenshot(entry) {
  if (typeof entry === 'string') return { src: entry, caption: '', captionKey: null };
  return { src: entry?.src, caption: entry?.caption ?? '', captionKey: entry?.captionKey ?? null };
}

const CLOCK_LOCALES = { en: 'en-GB', pl: 'pl-PL', it: 'it-IT', de: 'de-DE', ja: 'ja-JP' };

function MenuClock() {
  const { lang } = useLanguage();
  const locale = CLOCK_LOCALES[lang] || 'en-GB';
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="pp-menubar-clock">
      {now.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' })}{' '}
      {now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}
    </span>
  );
}

/** A small folder icon in a given colour (the menu bar and the desktop icons) */
function FolderIcon({ color, size = 18 }) {
  return (
    <svg className="pp-folder-icon" viewBox="0 0 24 20" width={size} height={size * 0.84} aria-hidden="true" style={{ '--fc': color }}>
      <path className="pp-folder-icon-back" d="M1 3.5Q1 1.5 3 1.5h5.2q1 0 1.6.8l1.2 1.7H21q2 0 2 2V17q0 2-2 2H3q-2 0-2-2z" />
      <path className="pp-folder-icon-front" d="M1 7.5Q1 6 2.5 6h19Q23 6 23 7.5V17q0 2-2 2H3q-2 0-2-2z" />
    </svg>
  );
}

/** The filmstrip: every screenshot in a row you can swipe, drag or step
    through with the arrows; the one in the middle is in focus with its caption */
function Filmstrip({ shots, captionFor, name, phone, onOpen, labels }) {
  const trackRef = useRef(null);
  const drag = useRef(null);
  const [active, setActive] = useState(0);
  const [ratios, setRatios] = useState({}); // width / height of each screenshot, once loaded
  const count = shots.length;

  // the card nearest the middle of the strip is the one in focus
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    let ticking = false;
    const update = () => {
      ticking = false;
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      [...track.children].forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [count, ratios]);

  const goTo = (i) => {
    const track = trackRef.current;
    const card = track?.children[Math.max(0, Math.min(count - 1, i))];
    if (!card) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2,
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  // with a mouse you can grab the strip and drag it sideways
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      trackRef.current.classList.add('is-dragging');
    }
    if (d.moved) trackRef.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = d.moved ? { ...d, justDragged: true } : null;
    trackRef.current.classList.remove('is-dragging');
    if (d.moved) {
      goTo(active);
      setTimeout(() => { drag.current = null; }, 0);
    }
  };

  const onCardClick = (i) => {
    if (drag.current?.justDragged) return;
    if (i === active) onOpen(shots[i]);
    else goTo(i);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(active + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(active - 1); }
  };

  const pad = (n) => String(n).padStart(2, '0');
  const fallbackRatio = phone ? 1482 / 3072 : 1.95;

  return (
    <section className={`pp-strip ${phone ? 'pp-strip--phone' : ''}`} id="screenshots" data-reveal>
      <header className="pp-strip-head">
        <div>
          <p className="pp-strip-kicker">{labels.title}</p>
          <p className="pp-strip-count" aria-hidden="true">
            <span className="pp-strip-count-now" key={active}>{pad(active + 1)}</span>
            <span className="pp-strip-count-all">/ {pad(count)}</span>
          </p>
        </div>
        <p className="pp-strip-hint" aria-hidden="true">{labels.hint} →</p>
        <div className="pp-strip-arrows">
          <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={labels.prev}>←</button>
          <button type="button" onClick={() => goTo(active + 1)} disabled={active === count - 1} aria-label={labels.next}>→</button>
        </div>
      </header>

      <ol
        className="pp-strip-track"
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onKeyDown={onKeyDown}
      >
        {shots.map((s, i) => (
          <li
            key={s.src}
            className={`pp-strip-card ${i === active ? 'is-active' : ''}`}
            style={{ '--ar': ratios[s.src] || fallbackRatio }}
          >
            <button
              type="button"
              className="pp-strip-shot"
              onClick={() => onCardClick(i)}
              aria-label={`${i === active ? labels.open : `${i + 1} / ${count}`}: ${captionFor(s) || name}`}
            >
              <span className="pp-strip-num" aria-hidden="true">{pad(i + 1)}</span>
              <img
                src={s.src}
                alt=""
                draggable={false}
                loading={i < 3 ? 'eager' : 'lazy'}
                onLoad={(e) => {
                  const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                  if (w && h) setRatios((prev) => (prev[s.src] ? prev : { ...prev, [s.src]: w / h }));
                }}
              />
            </button>
            <p className="pp-strip-caption" aria-hidden={i !== active}>{captionFor(s)}</p>
          </li>
        ))}
      </ol>

      <ol className="pp-strip-dots">
        {shots.map((s, i) => (
          <li key={s.src}>
            <button
              type="button"
              className={i === active ? 'is-active' : ''}
              onClick={() => goTo(i)}
              aria-label={`${i + 1} / ${count}`}
              aria-current={i === active}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const project = projects.find(p => p.id === id);
  const currentIdx = projects.findIndex(p => p.id === id);
  const prev = projects[currentIdx - 1];
  const next = projects[currentIdx + 1];

  const rootRef = useRef(null);
  const cardRef = useRef(null);

  // Translation with an English fallback for keys that don't exist yet
  const tr = (key, fallback) => {
    const value = t(key);
    return !value || value === key ? fallback : value;
  };

  // Text from a translation key, else a plain string, else nothing
  const textFrom = (key, plain) => {
    if (key) {
      const value = t(key);
      if (value && value !== key) return value;
    }
    return plain || '';
  };

  // Caption for a screenshot: the translation if it exists, else the plain caption
  const captionFor = (shot) => {
    if (shot?.captionKey) {
      const translated = t(shot.captionKey);
      if (translated && translated !== shot.captionKey) return translated;
    }
    return shot?.caption || '';
  };

  // a new project always starts at the top
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  // ── Things pop in as they scroll into view. Marked with an attribute rather
  //    than a class, so React re-rendering an element's classes can't hide it again.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !project) return;
    root.classList.add('pp-js');
    const items = root.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.setAttribute('data-revealed', ''));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-revealed', '');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -3% 0px' });
    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [id, project]);

  // ── Reading progress, as a thin line under the menu bar
  useEffect(() => {
    const bar = rootRef.current?.querySelector('.pp-progress-bar');
    if (!bar) return;
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${p})`;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [id, project]);

  // A broken hero image falls back to a tinted gradient
  const [heroImgError, setHeroImgError] = useState(false);
  useEffect(() => { setHeroImgError(false); }, [id]);

  // Tilt the hero picture slightly towards the cursor
  const handleCardMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tilt-x', `${py * -8}deg`);
    el.style.setProperty('--tilt-y', `${px * 8}deg`);
  };
  const handleCardLeave = () => {
    cardRef.current?.style.setProperty('--tilt-x', '0deg');
    cardRef.current?.style.setProperty('--tilt-y', '0deg');
  };

  // ── Quick Look (the big picture viewer) ──
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const openLightbox = (index) => {
    setLightbox({ open: true, index });
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setLightbox(l => ({ ...l, open: false }));
    document.body.style.overflow = '';
  };
  const stepLightbox = (delta, total) => {
    setLightbox(l => ({ ...l, index: (l.index + delta + total) % total }));
  };

  const normalizedScreenshots = project
    ? (project.screenshots || []).map(normalizeScreenshot).filter(s => s.src && !s.src.endsWith('/'))
    : [];

  useEffect(() => {
    if (!lightbox.open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') stepLightbox(1, normalizedScreenshots.length);
      else if (e.key === 'ArrowLeft') stepLightbox(-1, normalizedScreenshots.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox.open, normalizedScreenshots.length]);

  if (!project) {
    return (
      <div className="pp-notfound">
        <p>{tr('project.notFound', 'Project not found.')}</p>
        <Link to="/">← {tr('project.backHome', 'Back home')}</Link>
      </div>
    );
  }

  const { name, platformKey, categoryKey, year, color, taglineKey, bodyKeys, tags, link, roleKey, credits, mockup } = project;
  const heroSrc = normalizedScreenshots[0]?.src;
  // the tour: every screenshot except the picture already shown at the top
  const heroIndex = normalizedScreenshots.findIndex((s) => s.src === (mockup || heroSrc));
  const storyShots = normalizedScreenshots.filter((_, i) => i !== heroIndex);
  const openShot = (shot) => {
    const index = normalizedScreenshots.findIndex((s) => s.src === shot?.src);
    if (index >= 0) openLightbox(index);
  };
  const activeShot = normalizedScreenshots[lightbox.index];
  const visualSrc = !heroImgError ? (mockup || heroSrc) : null;
  const stackItems = getStackItems(tags || []);
  const challengeText = textFrom(project.challengeKey, project.challenge);
  const learnedText = textFrom(project.learnedKey, project.learned);
  const paragraphs = (text) => text.split('\n\n');
  // Android apps: the screenshots already come in a phone, so no laptop around them
  const isPhone = platformKey === 'platform.android';

  const jump = (target) => (e) => {
    e.preventDefault();
    const el = document.getElementById(target);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 44, behavior: 'smooth' });
  };

  const info = [
    [tr('pp.info.kind', 'Kind'), t(platformKey)],
    [tr('pp.info.category', 'Category'), t(categoryKey)],
    [tr('pp.info.year', 'Year'), year],
    [tr('project.role', 'Role'), t(roleKey)],
    ...(credits?.length ? [[tr('project.with', 'With'), credits.join(' & ')]] : []),
  ];

  return (
    <div className="pp-root" ref={rootRef} style={{ '--proj-color': color }}>

      {/* ── Menu bar ── */}
      <header className="pp-menubar">
        <Link to="/" state={{ scrollTo: 'projects-folder' }} className="pp-menubar-back">
          <span aria-hidden="true">←</span> {tr('pp.allProjects', 'All projects')}
        </Link>
        <span className="pp-menubar-app">
          <FolderIcon color={color} size={16} />
          {name}
        </span>
        <nav className="pp-menubar-menu" aria-label={name}>
          <a href="#overview" onClick={jump('overview')}>{tr('pp.menu.overview', 'Overview')}</a>
          {storyShots.length > 0 && (
            <a href="#screenshots" onClick={jump('screenshots')}>{tr('pp.menu.screenshots', 'Gallery')}</a>
          )}
          {(challengeText || learnedText) && (
            <a href="#notes" onClick={jump('notes')}>{tr('pp.menu.notes', 'Notes')}</a>
          )}
        </nav>
        <MenuClock />
        <div className="pp-progress" aria-hidden="true"><div className="pp-progress-bar" /></div>
      </header>

      {/* the wallpaper's soft glow in the project's colour, staying put behind everything */}
      <span className="pp-desk-glow pp-desk-glow--1" aria-hidden="true" />
      <span className="pp-desk-glow pp-desk-glow--2" aria-hidden="true" />

      <main className="pp-desk">

        {/* ── Hello: the name, what it is, and the picture ── */}
        <section className="pp-hero" id="overview">
          <div className="pp-hero-text">
            <p className="pp-hero-kicker">
              <span className="pp-hero-kicker-dot" aria-hidden="true" />
              {t(categoryKey)} · {year}
            </p>
            <h1 className="pp-hero-title">{name}</h1>
            <p className="pp-hero-tagline">{t(taglineKey)}</p>

            <dl className="pp-info">
              {info.map(([label, value]) => (
                <div className="pp-info-row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="pp-hero-actions">
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="pp-btn pp-btn--primary">
                  {tr('project.viewLive', 'View live')} <span aria-hidden="true">↗</span>
                </a>
              )}
              {storyShots.length > 0 && (
                <a href="#screenshots" className="pp-btn" onClick={jump('screenshots')}>
                  {tr('pp.story.cta', 'Take the tour')} <span aria-hidden="true">↓</span>
                </a>
              )}
            </div>
          </div>

          <div
            ref={cardRef}
            className={`pp-hero-card ${heroSrc ? 'pp-hero-card--clickable' : ''}`}
            onClick={() => heroSrc && openLightbox(0)}
            onMouseMove={handleCardMove}
            onMouseLeave={handleCardLeave}
            role={heroSrc ? 'button' : undefined}
            tabIndex={heroSrc ? 0 : undefined}
            aria-label={heroSrc ? `${name}: ${t('project.openScreenshot')}` : undefined}
            onKeyDown={(e) => { if (heroSrc && (e.key === 'Enter' || e.key === ' ')) openLightbox(0); }}
          >
            {visualSrc ? (
              <img src={visualSrc} alt={name} className="pp-hero-img" onError={() => setHeroImgError(true)} />
            ) : (
              <div className="pp-hero-fallback" aria-hidden="true" />
            )}
          </div>
        </section>

        {/* ── About it, and its tools in a Dock ── */}
        <section className="pp-about" data-reveal>
          <h2 className="pp-section-title">{tr('pp.readme', 'About this project')}</h2>
          {bodyKeys.map((key, i) => (
            <p key={i} className="pp-para">{t(key)}</p>
          ))}

          {stackItems.length > 0 && (
            <div className="pp-dock-wrap">
              <p className="pp-dock-label">{tr('project.builtWith', 'Built with')}</p>
              <ul className="pp-dock">
                {stackItems.map((item) => (
                  <li key={item.name} className="pp-dock-item" tabIndex={0}>
                    <span className="pp-dock-name">{item.name}</span>
                    <span className="pp-dock-icon"><StackIcon item={item} size={34} /></span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>

      {/* ── The filmstrip (full width, outside the padded desk, so it runs edge to edge) ── */}
      {storyShots.length > 0 && (
        <Filmstrip
          shots={storyShots}
          captionFor={captionFor}
          name={name}
          phone={isPhone}
          onOpen={openShot}
          labels={{
            title: tr('pp.menu.screenshots', 'Gallery'),
            hint: tr('project.gallery.hint', 'Drag or use the arrows to explore'),
            open: tr('project.gallery.open', 'Open large'),
            prev: tr('project.gallery.prev', 'Previous screenshot'),
            next: tr('project.gallery.next', 'Next screenshot'),
          }}
        />
      )}

      <div className="pp-desk pp-desk--end">
        {/* ── What was hard, and what I learned: sticky notes you can drag around ── */}
        {(challengeText || learnedText) && (
          <section className="pp-notes" id="notes">
            <p className="pp-notes-hint">{tr('pp.dragNotes', '(psst, you can drag these around)')}</p>
            <div className={`pp-notes-row ${challengeText && learnedText ? '' : 'pp-notes-row--single'}`}>
              {challengeText && (
                <div data-reveal>
                  <Draggable id={`pp-note-challenge-${id}`} className="pp-note-drag">
                    <article className="pp-note">
                      <span className="pp-note-icon" aria-hidden="true">🧩</span>
                      <h2 className="pp-note-label">{tr('project.challengeLabel', 'The challenge')}</h2>
                      {paragraphs(challengeText).map((para, i) => <p className="pp-note-text" key={i}>{para}</p>)}
                    </article>
                  </Draggable>
                </div>
              )}
              {learnedText && (
                <div data-reveal style={{ '--d': '0.12s' }}>
                  <Draggable id={`pp-note-learned-${id}`} className="pp-note-drag">
                    <article className="pp-note pp-note--blue">
                      <span className="pp-note-icon" aria-hidden="true">💡</span>
                      <h2 className="pp-note-label">{tr('project.learnedLabel', 'What I learned')}</h2>
                      {paragraphs(learnedText).map((para, i) => <p className="pp-note-text" key={i}>{para}</p>)}
                    </article>
                  </Draggable>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Desktop icons: on to the next project ── */}
        <nav className="pp-icons" aria-label={tr('pp.allProjects', 'All projects')}>
          {prev ? (
            <Link to={`/project/${prev.id}`} className="pp-icon" data-reveal>
              <FolderIcon color={prev.color} size={84} />
              <span className="pp-icon-dir">← {tr('project.previous', 'Previous')}</span>
              <span className="pp-icon-name">{prev.name}</span>
            </Link>
          ) : <span />}
          <Link to="/" state={{ scrollTo: 'projects-folder' }} className="pp-icon pp-icon--all" data-reveal style={{ '--d': '0.08s' }}>
            <FolderIcon color="#4A7FB5" size={84} />
            <span className="pp-icon-dir">{tr('pp.allProjects', 'All projects')}</span>
            <span className="pp-icon-name">{projects.length}</span>
          </Link>
          {next ? (
            <Link to={`/project/${next.id}`} className="pp-icon" data-reveal style={{ '--d': '0.16s' }}>
              <FolderIcon color={next.color} size={84} />
              <span className="pp-icon-dir">{tr('project.next', 'Next')} →</span>
              <span className="pp-icon-name">{next.name}</span>
            </Link>
          ) : <span />}
        </nav>
      </div>

      <Footer />

      {/* Quick Look */}
      <div
        className={`pp-lightbox ${lightbox.open ? 'pp-lightbox--active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!lightbox.open}
        onClick={closeLightbox}
      >
        <button type="button" className="pp-lightbox-close" onClick={closeLightbox} aria-label={t('common.close')}>
          ✕
        </button>

        {normalizedScreenshots.length > 1 && (
          <>
            <button
              type="button"
              className="pp-lightbox-nav pp-lightbox-nav--prev"
              onClick={(e) => { e.stopPropagation(); stepLightbox(-1, normalizedScreenshots.length); }}
              aria-label={tr('project.gallery.prev', 'Previous screenshot')}
            >
              ←
            </button>
            <button
              type="button"
              className="pp-lightbox-nav pp-lightbox-nav--next"
              onClick={(e) => { e.stopPropagation(); stepLightbox(1, normalizedScreenshots.length); }}
              aria-label={tr('project.gallery.next', 'Next screenshot')}
            >
              →
            </button>
          </>
        )}

        <figure className="pp-lightbox-figure" onClick={(e) => e.stopPropagation()}>
          {activeShot && <img src={activeShot.src} alt={captionFor(activeShot) || name} />}
          {captionFor(activeShot) && <figcaption>{captionFor(activeShot)}</figcaption>}
        </figure>
      </div>

    </div>
  );
}
