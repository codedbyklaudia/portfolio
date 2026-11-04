import { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Pause,
  Play,
  SkipBack,
} from 'lucide-react';

import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import {
  readFontScale,
  setFontScale as saveFontScale,
  readFlag,
  setFlag,
} from '../accessibility';
import { SONG, player } from './song';
import './Footer.scss';

// One on/off switch in the Control Centre
const A11yToggle = ({ label, checked, onChange }) => (
  <label className="footer-switch">
    <span>{label}</span>
    <input
      type="checkbox"
      role="switch"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
    <span className="footer-switch-track" aria-hidden="true" />
  </label>
);

const EMAIL = 'hello@codedbyklaudia.co.uk';

/** The time in London, updated every few seconds */
function useLondonTime() {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 10000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const fmt = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

/** The desktop's song, as a small music widget: a record that spins while it plays */
function FooterMusic() {
  const { t } = useLanguage();
  const [playing, setPlaying] = useState(player.playing);
  const [time, setTime] = useState(() => player.time());
  useEffect(() => player.subscribe((st) => setPlaying(st.playing)), []);
  useEffect(() => {
    if (!playing) return undefined;
    const id = window.setInterval(() => setTime(player.time()), 250);
    return () => window.clearInterval(id);
  }, [playing]);
  const duration = player.duration();
  const restart = () => {
    player.restart();
    setTime(0);
  };
  return (
    <section className={`footer-music ${playing ? 'is-playing' : ''}`} aria-label={SONG.title}>
      <div className="footer-music-top">
        <div className="footer-music-art" aria-hidden="true">
          <span className="footer-music-record" />
        </div>
        <div className="footer-music-info">
          <p className="footer-music-title">{SONG.title}</p>
          <p className="footer-music-artist">{SONG.artist}</p>
        </div>
      </div>
      <div className="footer-music-progress" aria-hidden="true">
        <span style={{ width: `${Math.min(100, (time / duration) * 100)}%` }} />
      </div>
      <div className="footer-music-bottom">
        <span className="footer-music-time" aria-hidden="true">{fmt(time)}</span>
        <div className="footer-music-controls">
          <button type="button" onClick={restart} aria-label={t('music.restart')}>
            <SkipBack size={15} strokeWidth={2.25} />
          </button>
          <button
            type="button"
            className="footer-music-play"
            onClick={() => player.toggle()}
            aria-label={`${t(playing ? 'music.pause' : 'music.play')}: ${SONG.title}`}
            aria-pressed={playing}
          >
            {playing ? <Pause size={16} strokeWidth={2.5} /> : <Play size={16} strokeWidth={2.5} />}
          </button>
        </div>
        <span className="footer-music-time" aria-hidden="true">-{fmt(Math.max(0, duration - time))}</span>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   All on one dark brown: a sticky note of what I'm available for, three
   columns of links (navigation, contact, socials), two widgets (Control
   Centre with languages and accessibility, always open, and the song), a
   hairline, the small print, and a big serif wordmark with a round logo in
   the corner. The wordmark's letters rise in and hop.
   ============================================================ */

export default function Footer() {
  const { lang, switchLang, t } = useLanguage();

  // Translation with an English fallback for keys that don't exist yet
  const tr = (key, fallback) => {
    const value = t(key);
    return !value || value === key ? fallback : value;
  };

  // the first time the footer scrolls into view, the wordmark's letters rise out of the floor
  const footerRef = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const [fontScale, setFontScale] = useState(readFontScale);
  const [dyslexia, setDyslexia] = useState(() => readFlag('dyslexia'));
  const [textSpacing, setTextSpacing] = useState(() => readFlag('spacing'));
  const [underlineLinks, setUnderlineLinks] = useState(() => readFlag('links'));
  const [highContrast, setHighContrast] = useState(() => readFlag('contrast'));

  /* ============================================================
     APPLY SETTINGS (saved and set on <html> by accessibility.js)
     ============================================================ */

  useEffect(() => saveFontScale(fontScale), [fontScale]);
  useEffect(() => setFlag('dyslexia', dyslexia), [dyslexia]);
  useEffect(() => setFlag('spacing', textSpacing), [textSpacing]);
  useEffect(() => setFlag('links', underlineLinks), [underlineLinks]);
  useEffect(() => setFlag('contrast', highContrast), [highContrast]);

  /* ============================================================
     ACTIONS
     ============================================================ */

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  const resetA11y = () => {
    setFontScale(1);
    setDyslexia(false);
    setTextSpacing(false);
    setUnderlineLinks(false);
    setHighContrast(false);
  };

  // London time, for the small print
  const londonTime = useLondonTime();

  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const SHORTCUTS = [
    { label: t('nav.projects'), href: '#projects-folder' },
    { label: t('nav.aboutMe'), href: '#about' },
    { label: tr('dock.toolbox', 'Toolbox'), href: '#skills' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const SOCIALS = [
    { label: 'GitHub', href: 'https://github.com/codedbyklaudia' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/klaudia-kulawik-886b952bb/' },
    { label: 'Instagram', href: 'https://www.instagram.com/codedbyklaudia' },
  ];

  return (
    <footer className={`footer ${inView ? 'footer--in' : ''}`} ref={footerRef}>
      <div className="footer-inner">

        {/* ── The name, and the columns ── */}
        <div className="footer-top">
          <div className="footer-brand">
            {/* availability, on a sticky note like the one on the Projects window */}
            <ul className="footer-note">
              <li className="footer-status">
                <span className="footer-status-dot" aria-hidden="true" />
                {t('footer.availableWorldwide')}
              </li>
              <li className="footer-status">
                <span className="footer-status-dot" aria-hidden="true" />
                {t('footer.availableFullTime')}
              </li>
            </ul>
          </div>

          <div className="footer-cols">

            {/* Navigation */}
            <nav className="footer-col" aria-labelledby="footer-nav">
              <p className="footer-heading footer-heading--circle" id="footer-nav">{t('footer.navigationLabel')}</p>
              <ul className="footer-list">
                {SHORTCUTS.map((s) => (
                  <li key={s.href}>
                    <a className="footer-link" href={s.href}>{s.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Say hello */}
            <section className="footer-col" aria-labelledby="footer-hello">
              <p className="footer-heading footer-heading--square" id="footer-hello">{tr('footer.sayHello', 'Say hello')}</p>
              <ul className="footer-list">
                <li>
                  <a className="footer-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </li>
                <li>
                  <a className="footer-link" href="tel:+447376698047">+44 737 669 8047</a>
                </li>
                <li>
                  <button type="button" className="footer-link footer-link--btn" onClick={copyEmail} aria-label={tr('footer.copyEmail', 'Copy the email address')}>
                    {copied ? <Check size={13} strokeWidth={2.5} /> : <Copy size={13} strokeWidth={2.25} />}
                    <span>{copied ? tr('footer.copied', 'Copied!') : tr('footer.copy', 'Copy')}</span>
                  </button>
                </li>
              </ul>
            </section>

            {/* Find me online */}
            <section className="footer-col" aria-labelledby="footer-social">
              <p className="footer-heading footer-heading--star" id="footer-social">{tr('footer.socials', 'Find me online')}</p>
              <ul className="footer-list">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a className="footer-link" href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                      <ArrowUpRight size={13} strokeWidth={2.25} className="footer-link-arrow" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>

          </div>

          {/* ── Widgets, like the ones on the desktop ── */}
          <div className="footer-widgets">

            {/* Control Centre: languages and accessibility, always open */}
            <section className="footer-control" aria-labelledby="footer-control">
              <p className="footer-heading footer-heading--triangle" id="footer-control">{t('footer.settingsLabel')}</p>

              <div className="footer-langs" role="group" aria-label={tr('footer.language', 'Language')}>
                {LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    className={`footer-lang ${lang === language.code ? 'is-active' : ''}`}
                    onClick={() => switchLang(language.code)}
                    aria-pressed={lang === language.code}
                    aria-label={language.label}
                    title={language.label}
                  >
                    <img src={language.flag} alt="" />
                    <span>{language.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              <div className="footer-size">
                <span>{t('footer.fontSize')}</span>
                <div className="footer-size-steppers">
                  <button
                    type="button"
                    onClick={() => setFontScale((scale) => Math.max(0.85, +(scale - 0.1).toFixed(2)))}
                    aria-label={t('a11y.textSmaller')}
                  >
                    A−
                  </button>
                  <output aria-live="polite">{Math.round(fontScale * 100)}%</output>
                  <button
                    type="button"
                    onClick={() => setFontScale((scale) => Math.min(1.4, +(scale + 0.1).toFixed(2)))}
                    aria-label={t('a11y.textBigger')}
                  >
                    A+
                  </button>
                </div>
              </div>

              <div className="footer-switches">
                <A11yToggle label={tr('footer.dyslexiaFont', 'Dyslexia-friendly font')} checked={dyslexia} onChange={setDyslexia} />
                <A11yToggle label={tr('footer.textSpacing', 'Text spacing')} checked={textSpacing} onChange={setTextSpacing} />
                <A11yToggle label={tr('footer.underlineLinks', 'Underline links')} checked={underlineLinks} onChange={setUnderlineLinks} />
                <A11yToggle label={t('footer.highContrast')} checked={highContrast} onChange={setHighContrast} />
              </div>

              <button type="button" className="footer-reset" onClick={resetA11y}>
                {t('footer.reset')}
              </button>
            </section>

            {/* The song */}
            <FooterMusic />
          </div>
        </div>

        {/* ── The small print ── */}
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} codedbyklaudia. {t('footer.allRightsReserved')}</span>
          <span>{t('footer.builtWith')}</span>
          <span className="footer-legal-right">
            <span>{t('common.londonUk')} · {londonTime}</span>
            <button type="button" className="footer-top-btn" onClick={scrollToTop}>
              {t('footer.backToTop')}
              <span className="footer-top-circle" aria-hidden="true">
                <ArrowUp size={15} strokeWidth={2.25} />
              </span>
            </button>
          </span>
        </div>

        {/* ── The wordmark, big and elegant, with a round logo in the corner.
            Its letters rise in when the footer arrives, and hop in colour when
            you point at them. ── */}
        <div className="footer-sign">
          <div className="footer-wordmark" aria-hidden="true">
            <span className="footer-wordmark-text">
              {[...'codedbyklaudia'].map((ch, i) => (
                <span key={i} className="footer-wordmark-char" style={{ '--i': i }}>{ch}</span>
              ))}
            </span>
          </div>

          <div className="footer-badge" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="footer-badge-ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text>
                <textPath href="#footer-badge-ring" textLength="236">CODEDBYKLAUDIA ® CODEDBYKLAUDIA ®</textPath>
              </text>
              <circle cx="50" cy="50" r="19" />
            </svg>
          </div>
        </div>

      </div>
    </footer>
  );
}
