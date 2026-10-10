import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import Footer from './Footer';
import StackWindow, { StackIcon } from './StackWindow';
import { getStackItems } from './stackIcons';
import './ProjectPage.scss';

gsap.registerPlugin(ScrollTrigger);

// captionKey (a translation key, e.g. 'project.barkbuddyAndroid.shot1')
// takes priority over the plain caption string when present — see the
// t(shot.captionKey) calls below. Plain `caption` is kept as a
// fallback for any screenshot entry that hasn't been migrated to a
// translation key yet, so nothing breaks mid-migration.
function normalizeScreenshot(entry) {
  if (typeof entry === 'string') return { src: entry, caption: '', captionKey: null };
  return { src: entry?.src, caption: entry?.caption ?? '', captionKey: entry?.captionKey ?? null };
}

// The title is split into words and letters so every letter can
// bounce in one after the other (and hop when you hover over it).
function SplitTitle({ text }) {
  return (
    <h1 className="pp-hero-title" aria-label={text}>
      {text.split(' ').map((word, wi) => (
        <span className="pp-word" key={wi} aria-hidden="true">
          {[...word].map((char, ci) => (
            <span className="pp-char" key={ci}>{char}</span>
          ))}
        </span>
      ))}
    </h1>
  );
}

// One gallery picture. Phone screenshots (taller than wide) get a
// smaller, tidier frame so they don't tower over the page.
function GalleryFrame({ src, alt, onOpen, reveal }) {
  const [portrait, setPortrait] = useState(false);
  return (
    <div
      className={`pp-gallery-frame ${portrait ? 'pp-gallery-frame--portrait' : ''}`}
      data-reveal={reveal}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(); }}
    >
      <img
        src={src}
        alt={alt}
        className="pp-gallery-img"
        decoding="async"
        onLoad={(e) => setPortrait(e.target.naturalHeight > e.target.naturalWidth * 1.1)}
      />
    </div>
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

  // Caption for a screenshot: the translation if it exists, else the plain
  // caption, else nothing. A missing translation used to show the raw key
  // (like "project.pyramidNull.shot2") on the page.
  const captionFor = (shot) => {
    if (shot?.captionKey) {
      const translated = t(shot.captionKey);
      if (translated && translated !== shot.captionKey) return translated;
    }
    return shot?.caption || '';
  };


  useLayoutEffect(() => {
    if (!project) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Plain native scrolling: the mouse wheel and trackpad behave exactly
    // as expected (no smoothing layer to lag behind or over-scroll).
    window.scrollTo(0, 0);

    let removeHop = () => {};

    // Switches on the "hidden until scrolled to" styles (see the
    // data-reveal rules in ProjectPage.scss). Without this class
    // everything is simply visible.
    rootRef.current.classList.add('pp-js');

    const ctx = gsap.context(() => {
      // With reduced motion everything simply stays where it is.
      if (reduceMotion) return;

      // ── Hero entrance: one quick timeline (about 1.5s in total).
      //    The picture slides in from the LEFT, then the text arrives
      //    from the RIGHT: pills, letters bouncing in, tagline, buttons, tags.
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
      intro
        .from('.pp-hero-visual', { xPercent: -30, opacity: 0, duration: 0.9 }, 0)
        .from('.pp-pill', { x: 60, opacity: 0, duration: 0.5, stagger: 0.07 }, 0.2)
        .from('.pp-char', {
          yPercent: -120,
          rotation: () => gsap.utils.random(-14, 14),
          opacity: 0,
          duration: 0.7,
          stagger: 0.03,
          ease: 'back.out(1.7)',
        }, 0.35)
        .from('.pp-hero-tagline', { x: 60, opacity: 0, duration: 0.6 }, 0.75)
        .from('.pp-hero-info-item', { x: 50, opacity: 0, duration: 0.5, stagger: 0.07 }, 0.85)
        .from('.pp-hero-actions > *', { y: 24, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.95)
        .from('.pp-scrollcue', { opacity: 0, duration: 0.5 }, 1.2);

      // Hovering the title: a letter hops
      const title = rootRef.current.querySelector('.pp-hero-title');
      const hop = (e) => {
        const char = e.target.closest('.pp-char');
        if (!char || char._hopping) return;
        char._hopping = true;
        gsap.to(char, {
          yPercent: -22,
          rotation: gsap.utils.random(-12, 12),
          duration: 0.18,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            char._hopping = false;
            gsap.set(char, { clearProps: 'transform' });
          },
        });
      };
      title?.addEventListener('mouseover', hop);
      removeHop = () => title?.removeEventListener('mouseover', hop);

      // ── Light hero parallax: picture and text drift at slightly different speeds
      const heroScroll = { trigger: '.pp-hero', start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.pp-hero-visual', { yPercent: -4, ease: 'none', scrollTrigger: { ...heroScroll } });
      gsap.to('.pp-hero-text',   { yPercent: -8, ease: 'none', scrollTrigger: { ...heroScroll } });
    }, rootRef);

    return () => {
      removeHop();
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
      rootRef.current?.classList.remove('pp-js');
    };
  }, [id, project]);

  // ── Scroll reveals: a plain IntersectionObserver. Each element appears as
  //    soon as it enters the screen, wherever it is on the page. It can never
  //    get stuck hidden (the old scroll-position maths could, when the page
  //    height changed after pictures loaded).
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !project) return;
    const items = root.querySelectorAll('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -3% 0px' });

    items.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [id, project]);

  // ── Reading progress bar, from the real page height
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

  // Tracks a failed hero image load (broken/missing file — common
  // cause: case-sensitive hosts, since '/images/Foo.jpeg' 404s if the
  // deployed file is 'foo.jpeg'). Falls back to the plain gradient.
  // Reset whenever the project changes so navigating between
  // projects retries cleanly.
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
    el.style.setProperty('--tilt-x', `${py * -7}deg`);
    el.style.setProperty('--tilt-y', `${px * 7}deg`);
  };
  const handleCardLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  // ── Lightbox ──
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [stackOpen, setStackOpen] = useState(false);
  useEffect(() => { setStackOpen(false); }, [id]);

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
  const galleryShots = normalizedScreenshots.slice(1);
  const activeShot = normalizedScreenshots[lightbox.index];
  const visualSrc = !heroImgError ? (mockup || heroSrc) : null;
  const stackItems = getStackItems(tags || []);
  const challengeText = textFrom(project.challengeKey, project.challenge);
  const learnedText = textFrom(project.learnedKey, project.learned);
  const paragraphs = (text) => text.split('\n\n');

  return (
    <div className="pp-root" ref={rootRef} style={{ '--proj-color': color }}>

      <div className="pp-progress"><div className="pp-progress-bar" /></div>

      <Link to="/" className="pp-back">← {tr('project.back', 'Back')}</Link>

      {/* Hero: picture on the left, text on the right. Everything arrives
          one thing after another (see the intro timeline above). */}
      <header className="pp-hero">
        <span className="pp-hero-glow pp-hero-glow--1" aria-hidden="true" />
        <span className="pp-hero-glow pp-hero-glow--2" aria-hidden="true" />

        <div className="pp-hero-inner">

          <div className="pp-hero-visual">
            <div
              ref={cardRef}
              className={`pp-hero-card ${heroSrc ? 'pp-hero-card--clickable' : ''}`}
              onClick={() => heroSrc && openLightbox(0)}
              onMouseMove={handleCardMove}
              onMouseLeave={handleCardLeave}
              role={heroSrc ? 'button' : undefined}
              tabIndex={heroSrc ? 0 : undefined}
              aria-label={heroSrc ? `${name}: open screenshot` : undefined}
              onKeyDown={(e) => { if (heroSrc && (e.key === 'Enter' || e.key === ' ')) openLightbox(0); }}
            >
              {visualSrc ? (
                // Author-supplied composed mockup if there is one, otherwise
                // the first screenshot. Clicking opens the plain screenshot
                // in the lightbox so people can zoom into the real UI.
                <img
                  src={visualSrc}
                  alt={name}
                  className="pp-hero-img"
                  onError={() => setHeroImgError(true)}
                />
              ) : (
                // No image at all, or it failed to load: a tinted gradient
                <div className="pp-hero-fallback" aria-hidden="true" />
              )}
            </div>
          </div>

          <div className="pp-hero-text">
            <div className="pp-pills">
              <span className="pp-pill">{t(platformKey)}</span>
              <span className="pp-pill">{t(categoryKey)}</span>
              <span className="pp-pill">{year}</span>
            </div>

            <SplitTitle text={name} />

            <p className="pp-hero-tagline">{t(taglineKey)}</p>

            <dl className="pp-hero-info">
              <div className="pp-hero-info-item">
                <dt>{tr('project.role', 'Role')}</dt>
                <dd>{t(roleKey)}</dd>
              </div>
              {credits?.length > 0 && (
                <div className="pp-hero-info-item">
                  <dt>{tr('project.with', 'With')}</dt>
                  <dd>{credits.join(' & ')}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {/* One centred row under the picture and text */}
        <div className="pp-hero-actions">
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="pp-hero-cta">
              {tr('project.viewLive', 'View live')} <span aria-hidden="true">↗</span>
            </a>
          )}
          {heroSrc && (
            <button type="button" className="pp-hero-ghost" onClick={() => openLightbox(0)}>
              {tr('project.openPreview', 'Open preview')}
            </button>
          )}
          {stackItems.length > 0 && (
            <button
              type="button"
              className="pp-stack-btn"
              onClick={() => setStackOpen(true)}
              aria-haspopup="dialog"
            >
              <span className="pp-stack-icons" aria-hidden="true">
                {stackItems.slice(0, 4).map(item => (
                  <span className="pp-stack-icon" key={item.name} title={item.name}>
                    <StackIcon item={item} size={20} />
                  </span>
                ))}
              </span>
              <span>{tr('project.builtWith', 'Built with')}</span>
              {stackItems.length > 4 && (
                <span className="pp-stack-more">+{stackItems.length - 4}</span>
              )}
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>

        <span className="pp-scrollcue" aria-hidden="true">
          <span className="pp-scrollcue-dot" />
        </span>
      </header>

      {/* Body */}
      <section className="pp-body">
        <div className="pp-body-inner">
          {bodyKeys.map((key, i) => (
            <p key={i} className="pp-para" data-reveal="right">{t(key)}</p>
          ))}
        </div>
      </section>

      {/* Gallery: pictures and text alternate sides */}
      {galleryShots.length > 0 && (
        <section className="pp-gallery">
          {galleryShots.map((shot, i) => {
            const captionText = captionFor(shot);
            return (
              <figure
                key={i}
                className={[
                  'pp-gallery-item',
                  captionText ? 'pp-gallery-item--text' : '',
                  i % 2 === 1 ? 'pp-gallery-item--flip' : '',
                ].join(' ')}
              >
                <GalleryFrame
                  src={shot.src}
                  alt={captionText || name}
                  onOpen={() => openLightbox(i + 1)}
                  reveal={i % 2 === 0 ? 'left' : 'right'}
                />

                {captionText && (
                  <div className="pp-gallery-text">
                    <span
                      className="pp-gallery-num"
                      data-reveal={i % 2 === 0 ? 'right' : 'left'}
                      style={{ '--d': '0.1s' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {captionText.split('\n\n').map((para, pi) => (
                      <p
                        className="pp-gallery-caption"
                        key={pi}
                        data-reveal={i % 2 === 0 ? 'right' : 'left'}
                        style={{ '--d': `${0.18 + pi * 0.1}s` }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </figure>
            );
          })}
        </section>
      )}

      {normalizedScreenshots.length === 0 && (
        <div className="pp-no-shots">
          <p>Add screenshots to <code>content.js</code></p>
          <p className="pp-no-shots-hint">
            e.g. <code>{'{ src: "/images/shot.jpg", caption: "Home screen" }'}</code>
          </p>
        </div>
      )}

      {/* What was hard, and what I learned */}
      {(challengeText || learnedText) && (
        <section className={`pp-reflect ${challengeText && learnedText ? '' : 'pp-reflect--single'}`}>
          {challengeText && (
            <article className="pp-reflect-card" data-reveal="left">
              <span className="pp-reflect-icon" aria-hidden="true">🧩</span>
              <h2 className="pp-reflect-label">{tr('project.challengeLabel', 'The challenge')}</h2>
              {paragraphs(challengeText).map((para, i) => (
                <p className="pp-reflect-text" key={i}>{para}</p>
              ))}
            </article>
          )}
          {learnedText && (
            <article
              className="pp-reflect-card pp-reflect-card--dark"
              data-reveal="right"
              style={{ '--d': '0.1s' }}
            >
              <span className="pp-reflect-icon" aria-hidden="true">💡</span>
              <h2 className="pp-reflect-label">{tr('project.learnedLabel', 'What I learned')}</h2>
              {paragraphs(learnedText).map((para, i) => (
                <p className="pp-reflect-text" key={i}>{para}</p>
              ))}
            </article>
          )}
        </section>
      )}

      {/* Next / prev */}
      <nav className="pp-next">
        {prev ? (
          <Link
            to={`/project/${prev.id}`}
            className="pp-next-link pp-next-prev"
            data-reveal="left"
            style={{ '--link-color': prev.color }}
          >
            <span className="pp-next-dir">← {tr('project.previous', 'Previous')}</span>
            <span className="pp-next-name">{prev.name}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link
            to={`/project/${next.id}`}
            className="pp-next-link pp-next-next"
            data-reveal="right"
            style={{ '--link-color': next.color }}
          >
            <span className="pp-next-dir">{tr('project.next', 'Next')} →</span>
            <span className="pp-next-name">{next.name}</span>
          </Link>
        ) : <span />}
      </nav>

      <Footer />

      <StackWindow
        open={stackOpen}
        onClose={() => setStackOpen(false)}
        title={tr('project.builtWith', 'Built with')}
        items={stackItems}
      />

      {/* Lightbox */}
      <div
        className={`pp-lightbox ${lightbox.open ? 'pp-lightbox--active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!lightbox.open}
        onClick={closeLightbox}
      >
        <button type="button" className="pp-lightbox-close" onClick={closeLightbox} aria-label="Close">
          ✕
        </button>

        {normalizedScreenshots.length > 1 && (
          <>
            <button
              type="button"
              className="pp-lightbox-nav pp-lightbox-nav--prev"
              onClick={(e) => { e.stopPropagation(); stepLightbox(-1, normalizedScreenshots.length); }}
              aria-label="Previous screenshot"
            >
              ←
            </button>
            <button
              type="button"
              className="pp-lightbox-nav pp-lightbox-nav--next"
              onClick={(e) => { e.stopPropagation(); stepLightbox(1, normalizedScreenshots.length); }}
              aria-label="Next screenshot"
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