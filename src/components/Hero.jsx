import { useEffect, useRef, useState } from 'react';
import Folder from './Folder';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import './Hero.scss';

const NAV_FOLDERS = [
  { folderKey: 'projects', scrollTo: 'projects-folder', color: '#4A7FB5', key: 'nav.projects' },
  { folderKey: 'about',    scrollTo: 'about',            color: '#4A7FB5', key: 'nav.aboutMe' },
  { folderKey: 'skills',   scrollTo: 'about-notes', presetTab: 'skills', color: '#4A7FB5', key: 'nav.superpowers' },
  { folderKey: 'contact',  scrollTo: 'contact',           color: '#4A7FB5', key: 'nav.contact' },
];

const FOLDER_SIZE = 0.9;

export default function Hero() {
  const sectionRef        = useRef(null);
  const stickyRef         = useRef(null);
  const bgRef             = useRef(null);
  const stickyContentRef  = useRef(null);
  const loginScreenRef    = useRef(null); 
  const navFoldersRef     = useRef(null);
  const dockRef           = useRef(null);

  const { t, lang, setLang } = useLanguage();
  const LANGUAGE_NAMES = Object.fromEntries(LANGUAGES.map(l => [l.code, l.label]));
  const LANGUAGE_FLAGS = Object.fromEntries(
    LANGUAGES.map(l => [l.code, l.flag])
  );

  const [langTransition, setLangTransition] = useState(null);

  const [revealed, setRevealed] = useState(false);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const CLOCK_LOCALES = { en: 'en-GB', pl: 'pl-PL', it: 'it-IT', de: 'de-DE', ja: 'ja-JP' };
  const clockLocale = CLOCK_LOCALES[lang] || 'en-GB';
  const widgetTime = now.toLocaleTimeString(clockLocale, { hour: '2-digit', minute: '2-digit' });
  const [weather, setWeather] = useState(null); // { tempC, emoji } | null
  useEffect(() => {
    const codeToEmoji = (code) => {
      if (code === 0) return '☀️';
      if ([1, 2, 3].includes(code)) return '⛅';
      if ([45, 48].includes(code)) return '🌫️';
      if ([51, 53, 55, 56, 57, 80, 81, 82].includes(code)) return '🌦️';
      if ([61, 63, 65, 66, 67].includes(code)) return '🌧️';
      if ([71, 73, 75, 77, 85, 86].includes(code)) return '❄️';
      if ([95, 96, 99].includes(code)) return '⛈️';
      return '🌤️';
    };
    fetch('https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current_weather=true')
      .then(r => r.json())
      .then(data => {
        if (data?.current_weather) {
          setWeather({
            tempC: Math.round(data.current_weather.temperature),
            emoji: codeToEmoji(data.current_weather.weathercode),
          });
        }
      })
      .catch(() => {}); // silent — widget just shows '--' if this fails
  }, []);
  const widgetDate = now.toLocaleDateString(clockLocale, { weekday: 'long', day: 'numeric', month: 'long' });
  const clockSeconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const clockMinutes = now.getMinutes() + clockSeconds / 60;
  const clockHours   = (now.getHours() % 12) + clockMinutes / 60;
  const secAngle  = clockSeconds * 6;
  const minAngle  = clockMinutes * 6;
  const hourAngle = clockHours * 30;

  // Per-nav-folder open state — keyed by folderKey now, not the (no
  // longer always-unique) scroll target.
  const [openNavFolders, setOpenNavFolders] = useState({});

  const openSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLangChange = (code) => {
    if (code === lang || langTransition) return; 
    setLangTransition(code);
    setTimeout(() => {
      setLang(code);
    }, 1820);
    setTimeout(() => {
      setLangTransition(null);
    }, 3700);
  };

  const handleNavFolderClick = (folder) => {
    setOpenNavFolders({ [folder.folderKey]: true });
    if (folder.presetTab) {
      sessionStorage.setItem('cbk-about-tab', folder.presetTab);
    }
    setTimeout(() => openSection(folder.scrollTo), 450);
  };

  const handleLoginSubmit = () => {
    window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const section = sectionRef.current;
    if (!section) return;

    if (dockRef.current) { dockRef.current.style.opacity = '0'; }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect     = section.getBoundingClientRect();
        const sectionH = section.offsetHeight;
        const vh       = window.innerHeight;
        const scrollDist = sectionH - vh;
        if (scrollDist <= 0) { ticking = false; return; }
        const p = Math.min(1, Math.max(0, -rect.top / scrollDist));

        // ── Phase 1 ──
        const p1 = Math.min(1, p / 0.40);

        // Login screen simply fades and scales out as phase 1
        // completes — there's no camera to drive anymore (the old 3D
        // laptop zoom is gone), so this is a plain opacity+scale wipe
        // that reads as "logging in" rather than an abrupt cut.
        if (loginScreenRef.current) {
          const loginOut = Math.min(1, Math.max(0, (p1 - 0.35) / 0.55));
          loginScreenRef.current.style.opacity   = String(1 - loginOut);
          loginScreenRef.current.style.transform = `scale(${1 + loginOut * 0.06})`;
          loginScreenRef.current.style.visibility = loginOut >= 0.999 ? 'hidden' : 'visible';
        }

        const isRevealed = p1 > 0.72;

        setRevealed(prev => (prev === isRevealed ? prev : isRevealed));

        // ── Phase 2 ──
        const p2 = isRevealed ? Math.max(0, (p - 0.55) / 0.45) : 0;

        // Background curtain fade (dark login/desktop scene → cream
        // reveal) still keys off scroll depth in general, independent
        // of the old dive-through folder (which has been removed —
        // nav folders now handle navigation via click instead).
        // Starts later (p2=0.75) than the original (0.6) for a
        // quicker, more compressed fade — but critically still
        // completes exactly AT p2=1.0, the same instant .lh-sticky
        // naturally un-sticks. Finishing early (which the previous
        // version of this line did, at p2=0.8) left a gap where the
        // sticky child was already hidden but .lh-section's own
        // static dark background (#1C1611, set in CSS, never touched
        // by JS) was still showing through for the remaining scroll
        // distance — that gap was the black bar.
        const diveP = isRevealed ? Math.min(1, Math.max(0, (p2 - 0.75) / 0.25)) : 0;

        if (stickyContentRef.current) {
          // Content fades out, lifts away, AND now scales down
          // slightly as it recedes — the scale is what actually
          // sells "sinking back behind the incoming Projects window"
          // rather than just fading in place, reinforcing the
          // parallax depth cue that .pf-section's -100vh overlap
          // (see ProjectsFolder.scss) is already doing structurally.
          // No blur: a blurred, semi-transparent layer sitting in
          // front of a sharp window underneath is exactly what read
          // as a washed-out, foggy double-exposure instead of a
          // clean reveal.
          const contentFade = Math.max(0, 1 - diveP / 0.7);
          stickyContentRef.current.style.opacity   = String(contentFade);
          stickyContentRef.current.style.transform = `translateY(${-diveP * 60}px) scale(${1 - diveP * 0.06})`;
        }

        if (stickyRef.current) {
          const rgb   = isRevealed ? '245,243,239' : '28,22,17';
          const alpha = 1 - diveP;
          stickyRef.current.style.background = `rgba(${rgb},${alpha})`;

          stickyRef.current.style.visibility = diveP >= 0.999 ? 'hidden' : 'visible';
        }

        if (bgRef.current) {
          bgRef.current.style.opacity = String(1 - diveP);
        }

        if (dockRef.current) {
          const dockIn  = Math.min(1, Math.max(0, (p1 - 0.72) / 0.15));
          const dockOut = Math.max(0, 1 - Math.max(0, (p2 - 0.5) / 0.2));
          dockRef.current.style.opacity   = dockIn * dockOut;
          dockRef.current.style.transform = `translateX(-50%) translateY(${(1 - dockIn) * 40}px)`;
        }

        // ── Parallax — folder column drifts slightly across the
        // whole scroll range. Combined into one transform string
        // alongside the vertical-centering translateY, since setting
        // .style.transform overwrites rather than merges with CSS.
        if (navFoldersRef.current) {
          navFoldersRef.current.style.transform = `translateY(calc(-50% - ${p * 30}px))`;
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="hero" className="lh-section" ref={sectionRef}>

      {langTransition && (
        <div className="lh-lang-overlay" aria-hidden="true">
          <div className="lh-lang-wave lh-lang-wave--1" />
          <div className="lh-lang-wave lh-lang-wave--2" />
          <div className="lh-lang-wave lh-lang-wave--3" />
          <span className="lh-lang-overlay-text">{LANGUAGE_NAMES[langTransition]}</span>
        </div>
      )}

      <div className="lh-sticky" ref={stickyRef}>

        <div className="lh-bg" ref={bgRef} aria-hidden="true">
          <div className="lh-blob lh-blob--1" />
          <div className="lh-blob lh-blob--2" />
          <div className="lh-blob lh-blob--3" />
          <div className="lh-blob lh-blob--4" />
          <div className="lh-grain" />
        </div>
        <div className={`lh-bg-wash ${revealed ? 'lh-bg-wash--visible' : ''}`} aria-hidden="true" />

        <div className="lh-sticky-content" ref={stickyContentRef}>

          <div className="lh-login-screen" ref={loginScreenRef} style={{ opacity: 1 }}>

            <div className="lh-login-wallpaper" aria-hidden="true">
              <div className="lh-login-wallpaper-blob lh-login-wallpaper-blob--1" />
              <div className="lh-login-wallpaper-blob lh-login-wallpaper-blob--2" />
              <div className="lh-login-wallpaper-blob lh-login-wallpaper-blob--3" />
            </div>

            {/* Top menu bar — purely decorative status icons, mirrors
                the real macOS lock-screen bar (input source, battery,
                power) rather than the site's own nav. */}
            <div className="lh-login-topbar">
              <div className="lh-login-topbar-left" />
              <div className="lh-login-topbar-right">
                <span className="lh-login-topbar-item lh-login-topbar-item--input">EN</span>
                <span className="lh-login-topbar-icon lh-login-topbar-icon--battery" aria-hidden="true">
                  <span className="lh-login-battery-fill" />
                </span>
                <span className="lh-login-topbar-icon lh-login-topbar-icon--power" aria-hidden="true">⏻</span>
              </div>
            </div>

            <div className="lh-login-content">
              <div className="lh-login-topgroup">
                <div className="lh-login-date">{widgetDate}</div>
                <div className="lh-login-time">{widgetTime}</div>
              </div>

              <div className="lh-login-user">
                <div className="lh-login-avatar">
                  <img src="/images/codedbyklaudia_logo_1.png" alt="CodedByKlaudia logo" />
                </div>
                <div className="lh-login-name">Klaudia Kulawik</div>

                <button
                  type="button"
                  className="lh-login-scroll-pill"
                  onClick={handleLoginSubmit}
                >
                  <span>{t('hero.scrollHint')}</span>
                  <span className="lh-login-scroll-pill-arrow" aria-hidden="true">↓</span>
                </button>
              </div>
            </div>
          </div>

          <div className={`lh-final ${revealed ? 'lh-final--visible' : ''}`}>
            <div className="lh-reveal-scene">

              {/* Top-left widget group — real analog clock (live,
                  locale-aware via clockLocale above), and a live
                  Weather card (real Open-Meteo fetch — see the
                  `weather` state above — shows actual temperature +
                  condition emoji for London, not asserted data), and
                  a language switcher. */}
              <div className="lh-reveal-topleft lh-anim lh-anim--1">

                <div className="lh-widget-grid">
                  <div className="lh-widget-card lh-widget-card--clock">
                    <svg className="lh-clock-face" viewBox="0 0 100 100" aria-hidden="true">
                      <circle cx="50" cy="50" r="47" className="lh-clock-ring" />
                      {Array.from({ length: 12 }).map((_, i) => (
                        <line
                          key={i}
                          className="lh-clock-tick"
                          x1="50" y1="6" x2="50" y2={i % 3 === 0 ? '13' : '10'}
                          transform={`rotate(${i * 30} 50 50)`}
                        />
                      ))}
                      <line className="lh-clock-hand lh-clock-hand--hour"
                            x1="50" y1="50" x2="50" y2="27"
                            transform={`rotate(${hourAngle} 50 50)`} />
                      <line className="lh-clock-hand lh-clock-hand--min"
                            x1="50" y1="50" x2="50" y2="16"
                            transform={`rotate(${minAngle} 50 50)`} />
                      <line className="lh-clock-hand lh-clock-hand--sec"
                            x1="50" y1="56" x2="50" y2="12"
                            transform={`rotate(${secAngle} 50 50)`} />
                      <circle cx="50" cy="50" r="2.4" className="lh-clock-pivot" />
                    </svg>
                    <div className="lh-widget-time">{widgetTime}</div>
                    <div className="lh-widget-date">{widgetDate}</div>
                  </div>

                  <div className="lh-widget-card lh-widget-card--weather">
                    <span className="lh-widget-weather-icon" aria-hidden="true">{weather?.emoji || '☀️'}</span>
                    <div className="lh-widget-weather-condition">{weather ? `${weather.tempC}°C` : '--'}</div>
                    <div className="lh-widget-weather-city">{t('hero.location')}</div>
                  </div>
                </div>

                <div className="lh-lang-switcher" role="group" aria-label="Language">
                  {LANGUAGES.map(({ code, flag, label }) => (
                    <button
                      key={code}
                      type="button"
                      className={`lh-lang-btn ${lang === code ? 'lh-lang-btn--active' : ''}`}
                      onClick={() => handleLangChange(code)}
                      aria-label={`Switch to ${label}`}
                    >
                      <img
                        src={flag}
                        alt=""
                        className="lh-lang-flag"
                        width={24}
                        height={16}
                      />
                      <span>{code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>

                <p className="lh-topleft-bio">{t('hero.bio')}</p>
              </div>

              {/* Center column — just the tagline + scroll hint now
                  that the widgets live top-left instead. */}
              <div className="lh-reveal-center lh-anim lh-anim--2">
                <p className="lh-reveal-quote">{t('hero.quote')}</p>

                <div className={`lh-scroll-hint ${revealed ? 'lh-scroll-hint--visible' : ''}`}>
                  <span className="lh-scroll-hint-arrow" aria-hidden="true">↓</span>
                  <span className="lh-scroll-hint-text">{t('hero.scrollHint')}</span>
                </div>
              </div>

              {/* Same <Folder/> component + fan-open animation the old
                  dive-through folder used, click-triggered, mirrored
                  (scaleX(-1) on the icon wrapper only, not the label)
                  so the papers fan to the left instead of the right —
                  stacked vertically on the right side. This is now the
                  ONLY folder-navigation element in the hero — the
                  separate scroll-driven dive-through folder has been
                  removed since the two were interfering with each
                  other whenever a nav-folder click caused real scroll
                  movement. */}
              <div className="lh-reveal-folders lh-anim lh-anim--2" ref={navFoldersRef}>
                {NAV_FOLDERS.map((f) => (
                  <button
                    key={f.folderKey}
                    type="button"
                    className="lh-reveal-folder-btn"
                    onClick={() => handleNavFolderClick(f)}
                    aria-label={`Open ${t(f.key)}`}
                  >
                    <span className="lh-reveal-folder-icon-mirror">
                      <Folder color={f.color} size={FOLDER_SIZE} open={!!openNavFolders[f.folderKey]} />
                    </span>
                    <span className="lh-reveal-folder-label">{t(f.key)}</span>
                  </button>
                ))}
              </div>

            </div>
          </div>

          <div className="lh-hero-dock" ref={dockRef} style={{ opacity: 0 }}>
            <div className="lh-dock-icon lh-dock-icon--finder">
              <img src="/images/finder.png" alt="Finder Icon" />
            </div>
            <div className="lh-dock-icon lh-dock-icon--safari">
              <img src="/images/safari.png" alt="Safari Icon" />
            </div>
            <div className="lh-dock-icon lh-dock-icon--mail">
              <img src="/images/mail1.png" alt="Mail Icon" />
            </div>
            <div className="lh-dock-icon lh-dock-icon--photos">
              <img src="/images/photos.png" alt="Photos Icon" />
            </div>
            <div className="lh-dock-icon lh-dock-icon--notes">
               <img src="/images/notes.png" alt="Notes Icon" />
            </div>
            <div className="lh-dock-icon lh-dock-icon--calendar">
               <img src="/images/calendar.png" alt="Calendar Icon" />
            </div>
            <div className="lh-dock-icon lh-dock-icon--settings">
               <img src="/images/camera.png" alt="Camera Icon" />
            </div>
            <div className="lh-dock-icon lh-dock-icon--terminal">
              <img src="/images/terminal1.png" alt="Terminal Icon" />
            </div>
            <div className="lh-dock-sep" />
            <div className="lh-dock-icon lh-dock-icon--trash">
              <img src="/images/trash.png" alt="Trash Icon" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}