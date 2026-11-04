import './LanguageOverlay.scss';

// "Hello", in every language on the site
const HELLO = { en: 'Hello', pl: 'Cześć', it: 'Ciao', de: 'Hallo', ja: 'こんにちは' };

/** Shown while the language changes (see switchLang in LanguageContext) */
export default function LanguageOverlay({ from, to, target }) {
  return (
    <div className="lh-lang-overlay" role="status" aria-live="polite">
      <div className="lh-lang-card">
        <div className="lh-lang-hello" aria-hidden="true">
          <span className="lh-lang-hello-word lh-lang-hello-word--out">{HELLO[from]}</span>
          <span className="lh-lang-hello-word lh-lang-hello-word--in">{HELLO[to]}</span>
        </div>
        <p className="lh-lang-name">
          <img src={target?.flag} alt="" width={22} height={15} />
          {target?.label}
        </p>
      </div>
    </div>
  );
}
