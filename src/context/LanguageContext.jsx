import { createContext, useContext, useEffect, useRef, useState } from 'react';
import LanguageOverlay from '../components/LanguageOverlay';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'cbk-lang';

// Flag paths use a leading slash (absolute, resolved from the site
// root) rather than './' (relative, resolved from the CURRENT URL).
// './images/...' worked fine on the homepage ('/') but broke on any
// nested route (e.g. '/project/barkbuddy-android'), where the browser
// resolved it to '/project/images/...' instead — a path that doesn't
// exist, so the flag silently failed to load. A leading '/' always
// points at the same file regardless of which route rendered it.
export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '/images/flags/english.png' },
  { code: 'pl', label: 'Polski', flag: '/images/flags/polish.png' },
  { code: 'it', label: 'Italiano', flag: '/images/flags/italian.png' },
  { code: 'de', label: 'Deutsch', flag: '/images/flags/german.png' },
  { code: 'ja', label: '日本語', flag: '/images/flags/japanese.png' },
];

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem(STORAGE_KEY) || 'en';
  });

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.title = translations['meta.title'][lang] || translations['meta.title'].en;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  // Switching with the transition: the words change while the page is blurred
  const [transition, setTransition] = useState(null);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const switchLang = (code) => {
    if (code === lang || transition) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLang(code);
      return;
    }
    setTransition({ from: lang, to: code });
    timers.current = [
      setTimeout(() => setLang(code), 1000),
      setTimeout(() => setTransition(null), 2200),
    ];
  };

  const t = (key) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.en || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, switchLang, switching: Boolean(transition), t }}>
      {children}
      {transition && <LanguageOverlay from={transition.from} to={transition.to} target={LANGUAGES.find((l) => l.code === transition.to)} />}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}