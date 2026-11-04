import { useEffect, useRef, useState } from 'react';
import Folder from './Folder';
import Draggable from './Draggable';
import SkillsWindow from './SkillsWindow';
import { CalendarWidget, ClockWidget, MusicWidget, PhotoWidget, WeatherWidget } from './DesktopWidgets';
import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import { cv } from '../data/content';
import './Hero.scss';

const NAV_FOLDERS = [
  { folderKey: 'projects', scrollTo: 'projects-folder', color: '#4A7FB5', key: 'nav.projects' },
  { folderKey: 'about',    scrollTo: 'about',            color: '#4A7FB5', key: 'nav.aboutMe' },
  { folderKey: 'contact',  scrollTo: 'contact',           color: '#4A7FB5', key: 'nav.contact' },
];

const FOLDER_SIZE = 0.9;




// Document icon for the CV file on the desktop
function CvIcon() {
  return (
    <svg className="lh-reveal-file-icon" viewBox="0 0 64 80" aria-hidden="true">
      <path
        d="M6 6a6 6 0 0 1 6-6h28l18 18v56a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z"
        fill="#fff"
        stroke="rgba(0,0,0,0.14)"
        strokeWidth="1"
      />
      <path d="M40 0v12a6 6 0 0 0 6 6h12z" fill="#dce4ef" />
      <rect x="14" y="28" width="30" height="3" rx="1.5" fill="#cfd6e0" />
      <rect x="14" y="36" width="36" height="3" rx="1.5" fill="#cfd6e0" />
      <rect x="14" y="44" width="24" height="3" rx="1.5" fill="#cfd6e0" />
      <rect x="10" y="56" width="30" height="14" rx="3" fill="#4A7FB5" />
      <text x="25" y="66.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff" fontFamily="Helvetica, Arial, sans-serif">PDF</text>
    </svg>
  );
}

export default function Hero() {
  const sectionRef        = useRef(null);
  const stickyRef         = useRef(null);
  const bgRef             = useRef(null);
  const stickyContentRef  = useRef(null);
  const loginScreenRef    = useRef(null); 
  const navFoldersRef     = useRef(null);

  const { t, lang, switchLang } = useLanguage();
  // Translation with an English fallback, so the dictionary entry
  // works before the keys exist in every language file.
  const tr = (key, fallback) => {
    const value = t(key);
    return !value || value === key ? fallback : value;
  };


  const [revealed, setRevealed] = useState(false);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const CLOCK_LOCALES = { en: 'en-GB', pl: 'pl-PL', it: 'it-IT', de: 'de-DE', ja: 'ja-JP' };
  const clockLocale = CLOCK_LOCALES[lang] || 'en-GB';
  const widgetTime = now.toLocaleTimeString(clockLocale, { hour: '2-digit', minute: '2-digit' });
  const widgetDate = now.toLocaleDateString(clockLocale, { weekday: 'long', day: 'numeric', month: 'long' });

  // Per-nav-folder open state — keyed by folderKey now, not the (no
  // longer always-unique) scroll target.
  // Only one folder is open at a time: opening another one closes it
  const [openNavFolder, setOpenNavFolder] = useState(null);
  const navCloseTimer = useRef(null);
  useEffect(() => () => clearTimeout(navCloseTimer.current), []);

  // Toolbox (skills) window
  const [skillsOpen, setSkillsOpen] = useState(false);
  useEffect(() => {
    if (!revealed) {
      setSkillsOpen(false);
      setOpenNavFolder(null);
    }
  }, [revealed]);

  const toggleToolbox = () => {
    setOpenNavFolder(null);
    setSkillsOpen((open) => !open);
  };

  const openSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLangChange = (code) => switchLang(code);

  const handleNavFolderClick = (folder) => {
    setSkillsOpen(false);
    setOpenNavFolder(folder.folderKey);
    // it closes again once you've gone to its section
    clearTimeout(navCloseTimer.current);
    navCloseTimer.current = setTimeout(() => setOpenNavFolder(null), 1600);
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
          const loginOut = Math.min(1, Math.max(0, (p1 - 0.3) / 0.4)); // fully gone before the desktop appears
          loginScreenRef.current.style.opacity   = String(1 - loginOut);
          loginScreenRef.current.style.transform = `scale(${1 + loginOut * 0.06})`;
          loginScreenRef.current.style.visibility = loginOut >= 0.999 ? 'hidden' : 'visible';
        }

        const isRevealed = p1 > 0.72;

        setRevealed(prev => (prev === isRevealed ? prev : isRevealed));
        // under the fading desktop, the section turns light like Projects (no dark strip)
        section.style.background = isRevealed ? 'var(--bg)' : '';

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
          // fade the whole layer (the light wash included) so Projects shows
          // through as the desktop recedes, instead of a blank screen first
          stickyRef.current.style.opacity = String(alpha);

          stickyRef.current.style.visibility = diveP >= 0.999 ? 'hidden' : 'visible';
        }

        if (bgRef.current) {
          bgRef.current.style.opacity = String(1 - diveP);
        }

        // ── Parallax — folder column drifts slightly across the
        // whole scroll range. Combined into one transform string
        // alongside the vertical-centering translateY, since setting
        // .style.transform overwrites rather than merges with CSS.
        if (navFoldersRef.current) {
          navFoldersRef.current.style.transform = `translateY(${-p * 30}px)`;
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

              {/* Dictionary entry — fills the middle of the lock screen */}
              <div className="lh-login-entry">
                <h2 className="lh-login-headword">
                  {tr('hero.dictWord', 'software developer')}
                </h2>
                <p className="lh-login-pron">
                  <span>{tr('hero.dictPron', '/ˈsɒft.weə dɪˈvel.ə.pər/')}</span>
                  <em>{tr('hero.dictPos', 'noun')}</em>
                </p>
                <p className="lh-login-def">
                  {tr(
                    'hero.dictDef',
                    'a digital wizard who turns caffeine into code, transforms bugs into features, and sometimes speaks in a secret language only computers understand. They make your apps work like magic… most of the time.'
                  )}
                </p>
              </div>

              <div className="lh-login-user">
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

              {/* Top-left: the widgets, like a Mac desktop */}
              <div className="lh-reveal-topleft lh-anim lh-anim--1">
                <div className="lh-widget-grid">
                  <ClockWidget locale={clockLocale} />
                  <CalendarWidget locale={clockLocale} />
                  <MusicWidget />
                  <WeatherWidget locale={clockLocale} />
                  <PhotoWidget src="/images/nox_widget.jpg" caption={tr('hero.photoCaption', 'My manager, Nox')} />
                </div>
              </div>

              {/* Bottom-right: who I am */}
              <div className="lh-reveal-intro lh-anim lh-anim--2">
                <h1 className="lh-intro-title">
                  <span>{tr('hero.introHello', 'I’m Klaudia.')}</span>
                  <span>
                    <span className="lh-intro-underline">{tr('hero.introRole', 'Web & App')}</span> {tr('hero.introRole2', 'Developer.')}
                  </span>
                </h1>
                <p className="lh-intro-text">
                  {tr('hero.introText', 'Creating websites, apps and building creative immersive digital experiences.')}
                </p>
              </div>

              {/* Bottom-right corner: the languages */}
              <div className="lh-lang-switcher lh-lang-switcher--corner lh-anim lh-anim--2" role="group" aria-label={tr('footer.language', 'Language')}>
                {LANGUAGES.map(({ code, flag, label }) => (
                  <button
                    key={code}
                    type="button"
                    className={`lh-lang-btn ${lang === code ? 'lh-lang-btn--active' : ''}`}
                    onClick={() => handleLangChange(code)}
                    aria-label={label}
                    aria-pressed={lang === code}
                  >
                    <img src={flag} alt="" className="lh-lang-flag" width={24} height={16} />
                    <span>{code.toUpperCase()}</span>
                  </button>
                ))}
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

                {/* Extra desktop items: Toolbox folder + CV file */}
                <div className="lh-reveal-col lh-reveal-col--extra">
                  <Draggable
                    as="button"
                    type="button"
                    id="folder-toolbox"
                    className="lh-reveal-folder-btn"
                    onClick={toggleToolbox}
                    aria-label={tr('hero.toolbox', 'Toolbox')}
                  >
                    <span className="lh-reveal-folder-icon-mirror">
                      <Folder color="#4A7FB5" size={FOLDER_SIZE} open={skillsOpen} />
                    </span>
                    <span className="lh-reveal-folder-label">{tr('hero.toolbox', 'Toolbox')}</span>
                  </Draggable>

                  {/* hidden until the CV is ready (see cv in data/content.js) */}
                  {cv.ready && (
                    <Draggable
                      as="a"
                      id="file-cv"
                      className="lh-reveal-folder-btn lh-reveal-file"
                      href={cv.url}
                      download={cv.fileName}
                      draggable={false}
                      aria-label={tr('hero.cvDownload', 'Download CV')}
                    >
                      <CvIcon />
                      <span className="lh-reveal-folder-label">{tr('hero.cv', 'CV.pdf')}</span>
                    </Draggable>
                  )}
                </div>

                <div className="lh-reveal-col">
                  {NAV_FOLDERS.map((f) => (
                    <Draggable
                      as="button"
                      type="button"
                      id={`folder-${f.folderKey}`}
                      key={f.folderKey}
                      className="lh-reveal-folder-btn"
                      onClick={() => handleNavFolderClick(f)}
                      aria-label={t(f.key)}
                    >
                      <span className="lh-reveal-folder-icon-mirror">
                        <Folder color={f.color} size={FOLDER_SIZE} open={openNavFolder === f.folderKey} />
                      </span>
                      <span className="lh-reveal-folder-label">{t(f.key)}</span>
                    </Draggable>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      <SkillsWindow
        open={skillsOpen}
        onClose={() => setSkillsOpen(false)}
        title={tr('hero.toolbox', 'Toolbox')}
        languagesLabel={tr('hero.toolboxLanguages', 'Languages')}
        softwareLabel={tr('hero.toolboxSoftware', 'Software')}
      />
    </section>
  );
}