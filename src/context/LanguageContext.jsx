import { createContext, useContext, useEffect, useState } from 'react';
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
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const t = (key) => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.en || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}