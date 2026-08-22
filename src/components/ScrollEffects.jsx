import { useEffect, useRef } from 'react';
import './ScrollEffects.scss';

export function PacmanRow({ color = '#C95B2A', bg = '#F7F7F7' }) {
  const ref = useRef(null);
  const pacRef = useRef(null);
  const dotsRef = useRef([]);

  useEffect(() => {
    const row = ref.current;
    if (!row) return;

    const onScroll = () => {
      const rect = row.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, 1 - rect.top / vh));

      if (pacRef.current) {
        // Pacman moves from 0% to 90% of the row width
        pacRef.current.style.left = `${progress * 88}%`;
        // Mouth opens/closes — chomping animation driven by progress
        pacRef.current.style.setProperty('--chomp', progress > 0.05 ? '1' : '0');
      }

      // Dots get eaten as pacman passes them
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const dotProgress = (i + 1) / dotsRef.current.length;
        if (progress > dotProgress - 0.05) {
          dot.style.opacity = '0';
          dot.style.transform = 'scale(0)';
        } else {
          dot.style.opacity = '1';
          dot.style.transform = 'scale(1)';
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const dots = Array.from({ length: 18 });

  return (
    <div className="pacman-row" ref={ref} style={{ '--pac-color': color, '--pac-bg': bg }}>
      {/* Pacman */}
      <div className="pacman" ref={pacRef}>
        <div className="pac-body">
          <div className="pac-mouth-top" />
          <div className="pac-mouth-bottom" />
        </div>
      </div>

      {/* Dots */}
      <div className="pac-dots">
        {dots.map((_, i) => (
          <span
            key={i}
            className="pac-dot"
            ref={el => { dotsRef.current[i] = el; }}
            style={{ left: `${(i / dots.length) * 95 + 2}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// Text that slides in from left/right on scroll
export function SlideInText({ children, direction = 'left', delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add('slide-visible'), delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`slide-in slide-${direction} ${className}`}>
      {children}
    </div>
  );
}

// Big text that drifts horizontally as you scroll
export function DriftText({ children, speed = 0.08, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = el.parentElement.getBoundingClientRect();
          const offset = -rect.top * speed;
          el.style.transform = `translateX(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`drift-text ${className}`}>
      {children}
    </div>
  );
}

// Reveal block — fades + slides up as it enters viewport
export function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => el.classList.add('reveal-visible'), delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-block ${className}`}>
      {children}
    </div>
  );
}