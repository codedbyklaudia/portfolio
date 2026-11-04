import { useEffect, useRef, useState } from 'react';
import { SONG, player } from './song';
import { useLanguage } from '../context/LanguageContext';
import './Dock.scss';

// ── The dock, and the site's navigation ──
// On the desktop it sits at the bottom of the screen, like on a Mac. Once you scroll down to
// the projects, it glides up to the top of the page and becomes the navbar (the menu bar
// steps aside). Every icon does what it looks like: Finder opens the projects, Notes the
// about me, VS Code the toolbox, Mail the contact form; GitHub, LinkedIn and Instagram open
// those profiles, Phone calls, Calendar books a call, and Music plays the desktop's song.
// A dot marks the section you're reading. Icons grow towards the
// cursor and nudge their neighbours aside, like the real dock.

const GITHUB = 'https://github.com/codedbyklaudia';
const INSTAGRAM = 'https://www.instagram.com/codedbyklaudia';
const LINKEDIN = 'https://www.linkedin.com/in/klaudia-kulawik-886b952bb/';
const PHONE = 'tel:+447376698047';
const EMAIL = 'hello@codedbyklaudia.co.uk';

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function Dock() {
  const { t } = useLanguage();
  const tr = (key, fallback) => {
    const v = t(key);
    return !v || v === key ? fallback : v;
  };

  const [playing, setPlaying] = useState(player.playing);
  useEffect(() => player.subscribe((st) => setPlaying(st.playing)), []);

  const ITEMS = [
    { id: 'finder', img: '/images/finder.png', label: tr('nav.projects', 'Projects'), section: 'projects-folder' },
    { id: 'notes', img: '/images/notes.png', label: tr('nav.aboutMe', 'About me'), section: 'about' },
    { id: 'vscode', img: '/images/vsc.png', label: tr('dock.toolbox', 'Toolbox'), section: 'skills' },
    { id: 'mail', img: '/images/mail1.png', label: tr('nav.contact', 'Contact'), section: 'contact' },
    { sep: true },
    { id: 'github', img: '/images/github.png', label: 'GitHub', href: GITHUB },
    { id: 'linkedin', img: '/images/linkedin.png', label: 'LinkedIn', href: LINKEDIN },
    { id: 'instagram', img: '/images/instagram.png', label: 'Instagram', href: INSTAGRAM },
    { id: 'phone', img: '/images/phone.png', label: tr('dock.phone', 'Call me'), href: PHONE },
    { id: 'calendar', img: '/images/calendar.png', label: tr('dock.call', 'Book a call'), href: `mailto:${EMAIL}?subject=${encodeURIComponent("Let's book a call")}` },
    { sep: true },
    { id: 'music', label: playing ? `${tr('dock.pause', 'Pause')} · ${SONG.title}` : `${tr('dock.play', 'Play')} · ${SONG.title}`, action: () => player.toggle(), music: true },
  ];

  const [mode, setMode] = useState('hidden'); // hidden | bottom | top
  const [current, setCurrent] = useState('');
  const list = useRef(null);

  // where the dock lives: hidden on the lock screen, at the bottom of the desktop, at the top from the projects on
  useEffect(() => {
    let ticking = false;
    const check = () => {
      ticking = false;
      const vh = window.innerHeight;
      const hero = document.getElementById('hero');
      const projects = document.getElementById('projects-folder');
      let next = 'top';
      if (hero && projects) {
        const r = hero.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, hero.offsetHeight - vh)));
        const pastHero = projects.getBoundingClientRect().top < vh * 0.55;
        next = pastHero ? 'top' : p > 0.29 ? 'bottom' : 'hidden';
      }
      setMode(next);
      document.documentElement.classList.toggle('dock-on-top', next === 'top');
      // the section being read
      const ids = ['contact', 'skills', 'about', 'projects-folder'];
      const here = ids.find((id) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top < vh * 0.45;
      });
      setCurrent(next === 'top' ? here ?? '' : '');
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    check();
    const late = window.setTimeout(check, 300);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearTimeout(late);
      document.documentElement.classList.remove('dock-on-top');
    };
  }, []);

  // icons grow towards the cursor (mouse only)
  const onMove = (e) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    list.current?.querySelectorAll('.dock-icon').forEach((icon) => {
      const r = icon.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      const s = 1 + 0.4 * Math.max(0, 1 - d / 120);
      icon.style.setProperty('--s', s.toFixed(3));
    });
  };
  const onLeave = () => list.current?.querySelectorAll('.dock-icon').forEach((icon) => icon.style.setProperty('--s', '1'));

  return (
    <nav className={`dock dock--${mode}`} aria-label={tr('dock.label', 'Main')} aria-hidden={mode === 'hidden' || undefined}>
      <ul ref={list} className="dock-list" onPointerMove={onMove} onPointerLeave={onLeave}>
        {ITEMS.map((item, i) =>
          item.sep ? (
            <li key={`sep-${i}`} className="dock-sep" aria-hidden="true" />
          ) : (
            <li key={item.id} className="dock-item">
              {item.href ? (
                <a
                  className="dock-icon"
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  tabIndex={mode === 'hidden' ? -1 : undefined}
                  aria-label={item.label}
                >
                  <img src={item.img} alt="" draggable={false} />
                </a>
              ) : (
                <button
                  type="button"
                  className={`dock-icon ${item.section && current === item.section ? 'is-current' : ''} ${item.music && playing ? 'is-current' : ''}`}
                  onClick={() => (item.section ? scrollToId(item.section) : item.action())}
                  tabIndex={mode === 'hidden' ? -1 : undefined}
                  aria-label={item.label}
                  aria-current={item.section && current === item.section ? 'true' : undefined}
                  aria-pressed={item.music ? playing : undefined}
                >
                  {item.music ? (
                    <span className="dock-music" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d="M9 17.5V6.8l9-2.3v10.4" />
                        <circle cx="7" cy="17.5" r="2.4" />
                        <circle cx="16" cy="15" r="2.4" />
                      </svg>
                    </span>
                  ) : (
                    <img src={item.img} alt="" draggable={false} />
                  )}
                </button>
              )}
              <span className="dock-label" aria-hidden="true">
                {item.label}
              </span>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
