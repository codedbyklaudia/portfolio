import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { projects } from '../data/content';
import { useLanguage } from '../context/LanguageContext';
import Footer from './Footer';
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

export default function ProjectPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const project = projects.find(p => p.id === id);
  const currentIdx = projects.findIndex(p => p.id === id);
  const prev = projects[currentIdx - 1];
  const next = projects[currentIdx + 1];

  const rootRef = useRef(null);

  // Kept in a ref (not state) so the lightbox open/close handlers —
  // which live outside the GSAP layout effect — can stop/start the
  // same Lenis instance the scroll-trigger animations use, the same
  // pattern Contact.jsx uses for its own scroll lock.
  const lenisRef = useRef(null);

  useLayoutEffect(() => {
    if (!project) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: reduceMotion ? 0 : 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduceMotion,
    });
    lenis.scrollTo(0, { immediate: true });
    lenis.on('scroll', ScrollTrigger.update);
    lenisRef.current = lenis;

    const raf = time => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set('.pp-hero-title, .pp-intro-eyebrow, .pp-intro-tagline, .pp-hero-cta, .pp-hero-bg, .pp-meta-item, .pp-para, .pp-gallery-item, .pp-next-link', { opacity: 1, y: 0, scale: 1, clipPath: 'none' });
        return;
      }

      gsap.fromTo(
        '.pp-progress-bar',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom bottom', scrub: true },
        }
      );

      // ── Hero entrance — just the title mask-reveal now, since
      // eyebrow/tagline/CTA moved out of the hero into .pp-intro
      // (which gets its own scroll-triggered reveal below, same
      // pattern as the meta strip).
      gsap.from('.pp-hero-title', { yPercent: 115, duration: 1.1, ease: 'power4.out' });

      // ── Intro row — eyebrow, tagline, CTA. Plain scroll reveal,
      // same pattern as .pp-meta-item below.
      gsap.from('.pp-intro-eyebrow, .pp-intro-tagline, .pp-hero-cta', {
        opacity: 0,
        y: 22,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-intro', start: 'top 90%' },
      });

      // ── Hero parallax — 3 depth layers, translateY only, all
      // scrubbed against the SAME .pp-hero start/end range so their
      // speeds stay in a clean 0.2 : 0.4 : 0.6 ratio. Because these
      // are scrub tweens (not one-shot .from() calls), they
      // inherently move in both directions as you scroll — that's
      // what makes it read as parallax rather than a reveal. The
      // one-shot entrance animations above are plain timelines with
      // no scrollTrigger at all, so they only ever play once and
      // never re-trigger on scroll-up.
      //
      // start:'top top' (not 'top bottom') — the hero is the very
      // first section on the page and is already fully visible at
      // scroll position 0. 'top bottom' is the right trigger for
      // elements below the fold that need to enter the viewport as
      // you scroll down to them, but for a section already in view
      // at rest it means that trigger point has already elapsed the
      // instant the page loads, so the scrub starts at some non-zero
      // progress immediately — which would push the foreground title
      // up and out of view before any scrolling happened. 'top top'
      // fires right at scroll=0, so progress is correctly 0 at rest
      // and only grows as the page actually scrolls.
      const heroParallax = { trigger: '.pp-hero', start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.pp-hero-bg-img, .pp-hero-bg-frame', { yPercent: -20, ease: 'none', scrollTrigger: { ...heroParallax } });
      gsap.to('.pp-hero-layer--mid', { yPercent: -40, ease: 'none', scrollTrigger: { ...heroParallax } });
      gsap.to('.pp-hero-layer--fg',  { yPercent: -60, ease: 'none', scrollTrigger: { ...heroParallax } });

      // meta strip
      gsap.from('.pp-meta-item', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-meta', start: 'top 90%' },
      });

      // body paragraphs
      gsap.utils.toArray('.pp-para').forEach(p => {
        gsap.from(p, {
          opacity: 0,
          y: 36,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: p, start: 'top 90%' },
        });
      });

      // ── Gallery — each item's mockup scales in from 1.12→1 as it
      // enters (a proper reveal, not just a fade), then a slower
      // scrub parallax continues on the image while its section is
      // in view. The description text (when present) parallaxes at
      // roughly half the image's range and in the OPPOSITE
      // direction — real two-speed depth between the two columns,
      // not just one element drifting on its own.
      gsap.utils.toArray('.pp-gallery-item').forEach((item, i) => {
        const img = item.querySelector('img');
        const text = item.querySelector('.pp-gallery-text');

        gsap.from(item, {
          opacity: 0,
          y: 70,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
        });

        if (img) {
          gsap.from(img, {
            scale: 1.12,
            duration: 1.25,
            ease: 'power4.out',
            scrollTrigger: { trigger: item, start: 'top 82%' },
          });

          const dir = i % 2 === 0 ? 1 : -1;
          gsap.fromTo(
            img,
            { yPercent: -5 * dir },
            {
              yPercent: 5 * dir,
              ease: 'none',
              scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );

          if (text) {
            gsap.fromTo(
              text,
              { yPercent: 6 * dir },
              {
                yPercent: -6 * dir,
                ease: 'none',
                scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true },
              }
            );
          }
        }
      });

      gsap.from('.pp-next-link', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pp-next', start: 'top 92%' },
      });
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      gsap.ticker.remove(raf);
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [id, project]);

  // ── Lightbox ──
  // Tracks a failed hero image load (broken/missing file — common
  // cause: case-sensitive hosts, since a path like '/images/Foo.jpeg'
  // 404s if the actual deployed file is 'foo.jpeg'). Falls back to
  // the plain gradient instead of leaving a blank/broken image with
  // just the scrim showing over it. Reset whenever the project
  // changes so navigating between projects retries cleanly.
  const [heroImgError, setHeroImgError] = useState(false);
  useEffect(() => { setHeroImgError(false); }, [id]);

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const openLightbox = (index) => {
    setLightbox({ open: true, index });
    document.body.style.overflow = 'hidden';
    lenisRef.current?.stop();
  };
  const closeLightbox = () => {
    setLightbox(l => ({ ...l, open: false }));
    document.body.style.overflow = '';
    lenisRef.current?.start();
  };
  const stepLightbox = (delta, total) => {
    setLightbox(l => ({ ...l, index: (l.index + delta + total) % total }));
  };

  const normalizedScreenshots = project
    ? (project.screenshots || []).map(normalizeScreenshot).filter(s => s.src)
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
        <p>Project not found.</p>
        <Link to="/">← Back home</Link>
      </div>
    );
  }

  const { name, platformKey, categoryKey, year, color, taglineKey, bodyKeys, tags, link, roleKey, credits, mockup } = project;
  const heroSrc = normalizedScreenshots[0]?.src;
  const galleryShots = normalizedScreenshots.slice(1);
  const activeShot = normalizedScreenshots[lightbox.index];

  return (
    <div className="pp-root" ref={rootRef} style={{ '--proj-color': color }}>

      <div className="pp-progress"><div className="pp-progress-bar" /></div>

      <nav className="pp-nav">
        <Link to="/" className="pp-back">← Back</Link>
      </nav>

      {/* Hero — full-viewport cinematic section. The mockup (or the
          CSS device frame, for projects without a custom mockup
          image yet) fills the entire screen as a background layer;
          a dark gradient scrim sits above it for legibility; only
          the project title sits at the bottom, large. Eyebrow,
          tagline, and the "View live" CTA moved to .pp-intro
          directly below — the information isn't gone, it's just not
          crowding the big visual moment anymore.

          Same three-layer parallax structure as before, now applied
          to this full-bleed layout:
          1. .pp-hero-bg     (mockup/frame background) — 0.2x
          2. .pp-hero-layer--mid (floating decorative shapes) — 0.4x
          3. .pp-hero-layer--fg  (title)                — 0.6x
          .pp-hero stays position:relative + overflow:hidden so the
          0.2x background's extra buffer height (see .pp-hero-bg-img
          in ProjectPage.scss) never exposes a gap at its edges. */}
      <header className="pp-hero">
        <div
          className={`pp-hero-bg ${heroSrc ? 'pp-hero-bg--clickable' : ''}`}
          onClick={() => heroSrc && openLightbox(0)}
          role={heroSrc ? 'button' : undefined}
          tabIndex={heroSrc ? 0 : undefined}
          onKeyDown={(e) => { if (heroSrc && (e.key === 'Enter' || e.key === ' ')) openLightbox(0); }}
        >
          {mockup && !heroImgError ? (
            // Author-supplied composed mockup (e.g. a phone-in-hand
            // photo, or a designed full-canvas composition like a
            // diagonal-split background with device renders) —
            // rendered full-bleed as the hero's background. Clicking
            // it still opens the lightbox on the plain screenshot
            // (heroSrc), not this presentation image, so people can
            // still zoom into the actual UI cleanly.
            <img
              src={mockup}
              alt={name}
              className="pp-hero-bg-img"
              onError={() => setHeroImgError(true)}
            />
          ) : heroSrc && !heroImgError ? (
            // No custom mockup yet — the raw screenshot itself,
            // full-bleed, no device chrome. Same treatment as the
            // mockup path above; just not composed into a hardware
            // mockup yet.
            <img
              src={heroSrc}
              alt={name}
              className="pp-hero-bg-img"
              onError={() => setHeroImgError(true)}
            />
          ) : (
            // No screenshots at all, OR the image failed to load —
            // plain tinted gradient so the full-screen layout still
            // holds together instead of showing a blank/broken image.
            <div className="pp-hero-bg-frame" />
          )}
          <div className="pp-hero-scrim" aria-hidden="true" />
        </div>

        <div className="pp-hero-layer pp-hero-layer--mid" aria-hidden="true">
          <span className="pp-hero-float pp-hero-float--1" />
          <span className="pp-hero-float pp-hero-float--2" />
        </div>

        <div className="pp-hero-layer pp-hero-layer--fg">
          <div className="pp-hero-title-mask">
            <h1 className="pp-hero-title">{name}</h1>
          </div>
        </div>

        <span className="pp-hero-scrollcue" aria-hidden="true" />
      </header>

      {/* Intro — eyebrow, tagline, and the live-link CTA, relocated
          out of the hero itself so the full-screen visual stays
          uncluttered. Shares the same alignment container as meta/
          body below it. */}
      <div className="pp-intro">
        <p className="pp-intro-eyebrow">{t(platformKey)} · {t(categoryKey)} · {year}</p>
        <p className="pp-intro-tagline">{t(taglineKey)}</p>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="pp-hero-cta">
            View live ↗
          </a>
        )}
      </div>

      {/* Meta strip */}
      <div className="pp-meta">
        <div className="pp-meta-card">
          <div className="pp-meta-item">
            <span className="pp-meta-label">Role</span>
            <span className="pp-meta-value">{t(roleKey)}</span>
          </div>
          <div className="pp-meta-item">
            <span className="pp-meta-label">Year</span>
            <span className="pp-meta-value">{year}</span>
          </div>
          {credits && (
            <div className="pp-meta-item">
              <span className="pp-meta-label">With</span>
              <span className="pp-meta-value">{credits.join(' & ')}</span>
            </div>
          )}
          <div className="pp-meta-item pp-meta-stack">
            <span className="pp-meta-label">Stack</span>
            <span className="pp-meta-value">{tags.join(', ')}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <section className="pp-body">
        <div className="pp-body-inner">
          {bodyKeys.map((key, i) => (
            <p key={i} className="pp-para">{t(key)}</p>
          ))}
        </div>
      </section>

      {/* Gallery — every shot rendered inside the same device mockup
          as the hero, alternating sides with its own description
          text (when the shot has a caption), same alternating-block
          pattern used in About.jsx's Story/Life tabs. */}
      {galleryShots.length > 0 && (
        <section className="pp-gallery">
          {galleryShots.map((shot, i) => {
            // captionKey (translated) takes priority; plain caption
            // is the fallback for any screenshot not yet migrated to
            // a translation key.
            const captionText = shot.captionKey ? t(shot.captionKey) : shot.caption;
            return (
              <figure
                key={i}
                className={`pp-gallery-item ${captionText ? 'pp-gallery-item--text' : ''} ${i % 2 === 1 ? 'pp-gallery-item--reverse' : ''}`}
              >
                <div className="pp-gallery-visual">
                  <div
                    className="pp-gallery-frame"
                    onClick={() => openLightbox(i + 1)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(i + 1); }}
                  >
                    <img src={shot.src} alt={captionText || name} className="pp-gallery-img" />
                  </div>
                </div>
                {captionText && (
                  <div className="pp-gallery-text">
                    <span className="pp-gallery-num">{String(i + 1).padStart(2, '0')}</span>
                    {captionText.split('\n\n').map((para, pi) => (
                      <p className="pp-gallery-caption" key={pi}>{para}</p>
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

      {/* Next / prev */}
      <nav className="pp-next">
        {prev ? (
          <Link
            to={`/project/${prev.id}`}
            className="pp-next-link pp-next-prev"
            style={{ '--link-color': prev.color }}
          >
            <span className="pp-next-dir">← Previous</span>
            <span className="pp-next-name">{prev.name}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link
            to={`/project/${next.id}`}
            className="pp-next-link pp-next-next"
            style={{ '--link-color': next.color }}
          >
            <span className="pp-next-dir">Next →</span>
            <span className="pp-next-name">{next.name}</span>
          </Link>
        ) : <span />}
      </nav>

      <Footer />

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
          {activeShot && <img src={activeShot.src} alt={(activeShot.captionKey ? t(activeShot.captionKey) : activeShot.caption) || name} />}
          {(activeShot?.captionKey || activeShot?.caption) && (
            <figcaption>{activeShot.captionKey ? t(activeShot.captionKey) : activeShot.caption}</figcaption>
          )}
        </figure>
      </div>

    </div>
  );
}