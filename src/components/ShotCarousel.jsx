import { useCallback, useEffect, useRef, useState } from 'react';

// ── The screenshot gallery on a project page ──
// One row of screenshots that slides sideways: drag it with the mouse, swipe it on touch,
// use the arrow buttons or the arrow keys, or scroll sideways on a trackpad. It snaps to
// each picture. A click (not a drag) opens the picture big. Entries without an image yet
// (a src that's just a folder, like '/images/') show as an empty "coming soon" slot.

const isPlaceholder = (src) => !src || src.endsWith('/');

/** One screenshot, framed by its shape: a browser window for wide ones, a phone for tall ones */
function Shot({ src, alt, onOpen, label, onReady }) {
  const [shape, setShape] = useState(null); // 'wide' | 'tall'
  return (
    <button type="button" className={`pp-slide-frame ${shape ? `pp-slide-frame--${shape}` : ''}`} onClick={onOpen} aria-label={label}>
      {shape === 'wide' && (
        <span className="pp-slide-chrome" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      )}
      <img
        src={src}
        alt={alt}
        draggable={false}
        decoding="async"
        onLoad={(e) => {
          setShape(e.currentTarget.naturalWidth >= e.currentTarget.naturalHeight * 1.05 ? 'wide' : 'tall');
          // the row's width changes as pictures arrive: measure again
          requestAnimationFrame(onReady);
        }}
      />
    </button>
  );
}

export default function ShotCarousel({ shots, captionFor, name, onOpen, labels }) {
  const track = useRef(null);
  const drag = useRef(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [edges, setEdges] = useState({ start: true, end: false });

  // which picture is nearest the left edge, and how far along the row we are
  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
    const slides = [...el.children];
    let best = 0;
    let bestDist = Infinity;
    slides.forEach((s, i) => {
      const d = Math.abs(s.offsetLeft - el.offsetLeft - el.scrollLeft - parseFloat(getComputedStyle(el).paddingLeft));
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(max > 0 && el.scrollLeft > max - 4 ? slides.length - 1 : best);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const go = (index) => {
    const el = track.current;
    const slide = el?.children[Math.max(0, Math.min(shots.length - 1, index))];
    if (!el || !slide) return;
    el.scrollTo({ left: slide.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: 'smooth' });
  };

  // dragging with the mouse (touch already swipes natively)
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true;
      setDragging(true);
      track.current.setPointerCapture?.(e.pointerId);
    }
    if (d.moved) track.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const d = drag.current;
    if (!d) return;
    if (d.moved) {
      setDragging(false);
      // let go: settle on the nearest picture
      requestAnimationFrame(() => go(active));
    }
    // keep the flag a moment so the click that ends a drag doesn't open the picture
    setTimeout(() => {
      drag.current = null;
    }, 0);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(active - 1);
    }
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="pp-carousel" aria-roledescription="carousel" aria-label={labels.title}>
      <div className="pp-carousel-head">
        <h2 className="pp-carousel-title">{labels.title}</h2>
        <div className="pp-carousel-nav">
          <span className="pp-carousel-count" aria-live="polite">
            <strong>{pad(active + 1)}</strong> / {pad(shots.length)}
          </span>
          <button type="button" className="pp-carousel-arrow" onClick={() => go(active - 1)} disabled={edges.start} aria-label={labels.prev}>
            ←
          </button>
          <button type="button" className="pp-carousel-arrow" onClick={() => go(active + 1)} disabled={edges.end} aria-label={labels.next}>
            →
          </button>
        </div>
      </div>

      <div
        ref={track}
        className={`pp-carousel-track ${dragging ? 'is-dragging' : ''}`}
        onScroll={measure}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onKeyDown={onKeyDown}
        tabIndex={0}
        aria-label={labels.hint}
      >
        {shots.map((shot, i) => {
          const caption = captionFor(shot);
          const empty = isPlaceholder(shot.src);
          return (
            <figure key={i} className={`pp-slide ${i === active ? 'is-active' : ''}`} aria-roledescription="slide" aria-label={`${i + 1} / ${shots.length}`}>
              {empty ? (
                <div className="pp-slide-frame pp-slide-frame--empty">
                  <span>{labels.soon}</span>
                </div>
              ) : (
                <Shot
                  src={shot.src}
                  alt={caption || name}
                  label={`${labels.open}: ${caption || name}`}
                  onReady={measure}
                  onOpen={() => {
                    if (!drag.current?.moved) onOpen(shot);
                  }}
                />
              )}
              {caption && (
                <figcaption className="pp-slide-caption">
                  <span className="pp-slide-num">{pad(i + 1)}</span>
                  {caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>

      <div className="pp-carousel-foot" aria-hidden="true">
        <span className="pp-carousel-bar">
          <span style={{ transform: `scaleX(${Math.max(progress, 1 / shots.length)})` }} />
        </span>
        <span className="pp-carousel-hint">{labels.hint}</span>
      </div>
    </section>
  );
}
