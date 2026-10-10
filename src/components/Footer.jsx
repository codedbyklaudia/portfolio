import { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  Accessibility,
  Mail,
  Compass,
  SlidersHorizontal,
  MapPin,
  X,
} from 'lucide-react';

import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import {
  readFontScale,
  setFontScale as saveFontScale,
  readFlag,
  setFlag,
} from '../accessibility';
import { InstagramIcon, LinkedinIcon, GithubIcon } from './SocialIcons';
import './Footer.scss';

// One on/off row in the accessibility menu
const A11yToggle = ({ label, checked, onChange }) => (
  <label className="footer-a11y-row footer-a11y-toggle">
    <span>{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
    />
  </label>
);

/* ============================================================
   FOOTER
   ============================================================ */

export default function Footer() {
  const { lang, setLang, t } = useLanguage();

  // Translation with an English fallback for keys that don't exist yet
  const tr = (key, fallback) => {
    const value = t(key);
    return !value || value === key ? fallback : value;
  };

  const [showA11y, setShowA11y] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const a11yRef = useRef(null);
  const langRef = useRef(null);

  const [fontScale, setFontScale] = useState(readFontScale);
  const [dyslexia, setDyslexia] = useState(() => readFlag('dyslexia'));
  const [textSpacing, setTextSpacing] = useState(() => readFlag('spacing'));
  const [underlineLinks, setUnderlineLinks] = useState(() => readFlag('links'));
  const [highContrast, setHighContrast] = useState(() => readFlag('contrast'));

  /* ============================================================
     CLOSE POPUPS: click outside, or Escape
     ============================================================ */

  useEffect(() => {
    if (!showA11y && !showLangDropdown) return;

    const onPointerDown = (event) => {
      if (showA11y && a11yRef.current && !a11yRef.current.contains(event.target)) {
        setShowA11y(false);
      }
      if (showLangDropdown && langRef.current && !langRef.current.contains(event.target)) {
        setShowLangDropdown(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowA11y(false);
        setShowLangDropdown(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [showA11y, showLangDropdown]);

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

  /* ============================================================
     NAVIGATION
     ============================================================ */

  // Same targets and labels as the main navbar
  const NAV_LINKS = [
    {
      label: t('nav.projects'),
      href: '#projects-folder',
    },
    {
      label: t('nav.aboutMe'),
      href: '#about',
    },
    {
      label: t('nav.contact'),
      href: '#contact',
    },
  ];

  const currentLanguage =
    LANGUAGES.find((language) => language.code === lang) ||
    LANGUAGES[0];

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* ======================================================
            BACK TO TOP
        ====================================================== */}

        <button
          type="button"
          className="footer-top-btn"
          onClick={scrollToTop}
          aria-label={t('footer.backToTop')}
        >
          <ArrowUp size={16} strokeWidth={2.25} />
          <span>{t('footer.backToTop')}</span>
        </button>

        {/* ======================================================
            FOOTER GRID
        ====================================================== */}

        <div className="footer-grid">

          {/* CONTACT */}

          <div className="footer-col">
            <span className="footer-col-label">
              <Mail size={13} strokeWidth={2.25} />
              {t('footer.contactLabel')}
            </span>

            <a
              className="footer-link"
              href="mailto:hello@codedbyklaudia.co.uk"
            >
              hello@codedbyklaudia.co.uk
            </a>

            <a
              className="footer-link"
              href="tel:+447376698047"
            >
              +44 737 669 8047
            </a>

            {/* Socials */}

            <div className="footer-socials">

              <a
                href="https://www.instagram.com/codedbyklaudia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social-link"
              >
                <InstagramIcon size={16} />
              </a>

              <a
                href="https://www.linkedin.com/in/codedbyklaudia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="footer-social-link"
              >
                <LinkedinIcon size={16} />
              </a>

              <a
                href="https://github.com/codedbyklaudia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="footer-social-link"
              >
                <GithubIcon size={16} />
              </a>

            </div>
          </div>

          {/* NAVIGATION */}

          <div className="footer-col">
            <span className="footer-col-label">
              <Compass size={13} strokeWidth={2.25} />
              {t('footer.navigationLabel')}
            </span>

            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                className="footer-link"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* SETTINGS */}

          <div className="footer-col footer-a11y-wrap">

            <span className="footer-col-label">
              <SlidersHorizontal
                size={13}
                strokeWidth={2.25}
              />
              {t('footer.settingsLabel')}
            </span>

            {/* Language selector */}

            <div className="footer-setting-row">

              <div className="footer-lang-dropdown" ref={langRef}>

                {/* Current language */}

                <button
                  type="button"
                  className="footer-lang-trigger"
                  onClick={() =>
                    setShowLangDropdown((prev) => !prev)
                  }
                  aria-expanded={showLangDropdown}
                  aria-haspopup="listbox"
                >
                  <img
                    src={currentLanguage.flag}
                    alt=""
                    className="footer-lang-flag"
                  />

                  <span>
                    {currentLanguage.label}
                  </span>

                  <span
                    className={`footer-lang-chevron ${
                      showLangDropdown
                        ? 'footer-lang-chevron--open'
                        : ''
                    }`}
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </button>

                {/* Language options */}

                {showLangDropdown && (
                  <div
                    className="footer-lang-options"
                    role="listbox"
                    aria-label="Language"
                  >
                    {LANGUAGES.map((language) => (
                      <button
                        key={language.code}
                        type="button"
                        role="option"
                        aria-selected={
                          lang === language.code
                        }
                        className={`footer-lang-option ${
                          lang === language.code
                            ? 'footer-lang-option--active'
                            : ''
                        }`}
                        onClick={() => {
                          setLang(language.code);
                          setShowLangDropdown(false);
                        }}
                      >
                        <img
                          src={language.flag}
                          alt=""
                          className="footer-lang-flag"
                        />

                        <span>
                          {language.label}
                        </span>

                        {lang === language.code && (
                          <span
                            className="footer-lang-check"
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}

              </div>

            </div>

            {/* Accessibility: button + popover share one ref for outside clicks */}

            <div className="footer-a11y" ref={a11yRef}>

              <button
                type="button"
                className="footer-setting-row footer-link--btn"
                onClick={() =>
                  setShowA11y((state) => !state)
                }
                aria-expanded={showA11y}
              >
                <Accessibility
                  size={15}
                  strokeWidth={2}
                  className="footer-setting-icon"
                />

                <span>
                  {t('footer.accessibility')}
                </span>
              </button>

              {showA11y && (
                <div
                  className="footer-a11y-menu"
                  role="dialog"
                  aria-label={t('footer.accessibility')}
                >

                  {/* Header with close button */}

                  <div className="footer-a11y-head">
                    <span>{t('footer.accessibility')}</span>

                    <button
                      type="button"
                      className="footer-a11y-close"
                      onClick={() => setShowA11y(false)}
                      aria-label={tr('footer.close', 'Close')}
                    >
                      <X size={14} strokeWidth={2.25} />
                    </button>
                  </div>

                  {/* Font size */}

                  <div className="footer-a11y-row">
                    <span>
                      {t('footer.fontSize')}
                    </span>

                    <div className="footer-a11y-steppers">

                      <button
                        type="button"
                        onClick={() =>
                          setFontScale((scale) =>
                            Math.max(
                              0.85,
                              +(scale - 0.1).toFixed(2)
                            )
                          )
                        }
                        aria-label="Decrease text size"
                      >
                        A−
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setFontScale((scale) =>
                            Math.min(
                              1.4,
                              +(scale + 0.1).toFixed(2)
                            )
                          )
                        }
                        aria-label="Increase text size"
                      >
                        A+
                      </button>

                    </div>
                  </div>

                  {/* Reading options */}

                  <A11yToggle
                    label={tr('footer.dyslexiaFont', 'Dyslexia-friendly font')}
                    checked={dyslexia}
                    onChange={setDyslexia}
                  />

                  <A11yToggle
                    label={tr('footer.textSpacing', 'Text spacing')}
                    checked={textSpacing}
                    onChange={setTextSpacing}
                  />

                  <A11yToggle
                    label={tr('footer.underlineLinks', 'Underline links')}
                    checked={underlineLinks}
                    onChange={setUnderlineLinks}
                  />

                  <A11yToggle
                    label={t('footer.highContrast')}
                    checked={highContrast}
                    onChange={setHighContrast}
                  />

                  {/* Reset */}

                  <button
                    type="button"
                    className="footer-a11y-reset"
                    onClick={resetA11y}
                  >
                    {t('footer.reset')}
                  </button>

                </div>
              )}

            </div>

          </div>

          {/* LOCATION */}

          <div className="footer-col">

            <span className="footer-col-label">
              <MapPin
                size={13}
                strokeWidth={2.25}
              />
              {t('footer.locationLabel')}
            </span>

            <span className="footer-link">
              London, UK
            </span>

            <span className="footer-link">
              {t('footer.availableWorldwide')}
            </span>

          </div>

        </div>

        {/* ======================================================
            LEGAL BAR
        ====================================================== */}

        <div className="footer-legal">

          <span className="footer-copy">
            © {new Date().getFullYear()} codedbyklaudia.{' '}
            {t('footer.allRightsReserved')}
          </span>

          <span className="footer-built">
            {t('footer.builtWith')}
          </span>

        </div>

        {/* WORDMARK*/}

        <div className="footer-wordmark">
          <span className="footer-wordmark-text">
            codedbyklaudia
          </span>
        </div>

      </div>
    </footer>
  );
}