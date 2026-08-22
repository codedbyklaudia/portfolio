import { useEffect, useState } from 'react';
import {
  ArrowUp,
  Globe,
  Accessibility,
  Mail,
  Compass,
  SlidersHorizontal,
  MapPin,
} from 'lucide-react';

import { useLanguage, LANGUAGES } from '../context/LanguageContext';
import './Footer.scss';

const FONT_KEY = 'cbk-font-scale';
const MOTION_KEY = 'cbk-reduce-motion';
const CONTRAST_KEY = 'cbk-high-contrast';

/* Social Icons */
const InstagramIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <circle
      cx="17.5"
      cy="6.5"
      r="1"
      fill="currentColor"
    />
  </svg>
);

const LinkedinIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6 9V18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />

    <circle
      cx="6"
      cy="5.5"
      r="1.1"
      fill="currentColor"
    />

    <path
      d="M10 18V9M10 13.5C10 11 11.5 9 14 9C16.5 9 18 10.5 18 13.5V18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const GithubIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 3C7.03 3 3 7.03 3 12C3 15.98 5.58 19.36 9.14 20.55C9.59 20.63 9.75 20.35 9.75 20.1V18.36C7.27 18.9 6.73 17.16 6.73 17.16C6.32 16.12 5.73 15.84 5.73 15.84C4.92 15.29 5.79 15.3 5.79 15.3C6.69 15.36 7.16 16.22 7.16 16.22C7.96 17.59 9.25 17.2 9.77 16.96C9.85 16.38 10.08 15.99 10.34 15.77C8.36 15.55 6.28 14.78 6.28 11.2C6.28 10.18 6.64 9.35 7.17 8.7C7.08 8.48 6.75 7.55 7.26 6.27C7.26 6.27 8.01 6.03 9.72 7.19C10.43 6.99 11.21 6.89 12 6.89C12.79 6.89 13.57 6.99 14.28 7.19C15.99 6.03 16.74 6.27 16.74 6.27C17.25 7.55 16.92 8.48 16.83 8.7C17.36 9.35 17.72 10.18 17.72 11.2C17.72 14.79 15.63 15.54 13.65 15.76C13.97 16.04 14.25 16.59 14.25 17.43V20.1C14.25 20.35 14.41 20.63 14.87 20.55C18.43 19.36 21 15.98 21 12C21 7.03 16.97 3 12 3Z"
      fill="currentColor"
    />
  </svg>
);

/* ============================================================
   FOOTER
   ============================================================ */

export default function Footer() {
  const { lang, setLang, t } = useLanguage();

  const [showA11y, setShowA11y] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const [fontScale, setFontScale] = useState(
    () => Number(localStorage.getItem(FONT_KEY)) || 1
  );

  const [reduceMotion, setReduceMotion] = useState(
    () => localStorage.getItem(MOTION_KEY) === '1'
  );

  const [highContrast, setHighContrast] = useState(
    () => localStorage.getItem(CONTRAST_KEY) === '1'
  );

  /* ============================================================
     FONT SCALE
     ============================================================ */

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--font-scale',
      fontScale
    );

    localStorage.setItem(FONT_KEY, String(fontScale));
  }, [fontScale]);

  /* ============================================================
     REDUCE MOTION
     ============================================================ */

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-reduce-motion',
      reduceMotion ? 'true' : 'false'
    );

    localStorage.setItem(
      MOTION_KEY,
      reduceMotion ? '1' : '0'
    );
  }, [reduceMotion]);

  /* ============================================================
     HIGH CONTRAST
     ============================================================ */

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-contrast',
      highContrast ? 'high' : 'normal'
    );

    localStorage.setItem(
      CONTRAST_KEY,
      highContrast ? '1' : '0'
    );
  }, [highContrast]);

  /* ============================================================
     ACTIONS
     ============================================================ */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  const resetA11y = () => {
    setFontScale(1);
    setReduceMotion(false);
    setHighContrast(false);
  };

  /* ============================================================
     NAVIGATION
     ============================================================ */

  const NAV_LINKS = [
    {
      label: t('nav.projects'),
      href: '#projects',
    },
    {
      label: t('nav.about'),
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

          {/* ====================================================
              CONTACT
          ==================================================== */}

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

          {/* ====================================================
              NAVIGATION
          ==================================================== */}

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

          {/* ====================================================
              SETTINGS
          ==================================================== */}

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

              <div className="footer-lang-dropdown">

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

            {/* Accessibility */}

            <button
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

            {/* Accessibility menu */}

            {showA11y && (
              <div className="footer-a11y-menu">

                {/* Font size */}

                <div className="footer-a11y-row">
                  <span>
                    {t('footer.fontSize')}
                  </span>

                  <div className="footer-a11y-steppers">

                    <button
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

                {/* Reduce motion */}

                <label className="footer-a11y-row footer-a11y-toggle">
                  <span>
                    {t('footer.reduceMotion')}
                  </span>

                  <input
                    type="checkbox"
                    checked={reduceMotion}
                    onChange={(event) =>
                      setReduceMotion(
                        event.target.checked
                      )
                    }
                  />
                </label>

                {/* High contrast */}

                <label className="footer-a11y-row footer-a11y-toggle">
                  <span>
                    {t('footer.highContrast')}
                  </span>

                  <input
                    type="checkbox"
                    checked={highContrast}
                    onChange={(event) =>
                      setHighContrast(
                        event.target.checked
                      )
                    }
                  />
                </label>

                {/* Reset */}

                <button
                  className="footer-a11y-reset"
                  onClick={resetA11y}
                >
                  {t('footer.reset')}
                </button>

              </div>
            )}

          </div>

          {/* ====================================================
              LOCATION
          ==================================================== */}

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

        {/* ======================================================
            WORDMARK
        ====================================================== */}

        <div className="footer-wordmark">
          <span className="footer-wordmark-text">
            codedbyklaudia
          </span>
        </div>

      </div>
    </footer>
  );
}