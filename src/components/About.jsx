import { useEffect, useRef, useState } from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { Reveal } from './ScrollEffects';
import { useLanguage } from '../context/LanguageContext';
import './About.scss';

// ── Scroll colour-reveal text ──
function ScrollRevealText({ text, className = '' }) {
  const containerRef = useRef(null);
  const words = text.split(' ');
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const readLine = vh * 0.68;
        const total = rect.height || 1;
        const scrolled = readLine - rect.top;
        const progress = Math.min(1, Math.max(0, scrolled / total));
        setActiveCount(Math.round(progress * words.length));
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <p className={`about-reveal-text ${className}`} ref={containerRef}>
      {words.map((word, i) => (
        <span key={i} className={i < activeCount ? 'is-active' : ''}>
          {word}{' '}
        </span>
      ))}
    </p>
  );
}

// The little card beside the text in each note: the facts at a glance, or what I do
// off the clock. (English for now; add translation keys to translate them.)
const GLANCE = [
  ['📍', 'about.glance.based', 'Based in London'],
  ['🇵🇱', 'about.glance.from', 'Originally from Bydgoszcz, Poland'],
  ['🎓', 'about.glance.degree', 'BSc Web Development, First Class'],
  ['💼', 'about.glance.studio', 'Freelancing as CodedByKlaudia'],
  ['🛠️', 'about.glance.build', 'Websites, web apps & Android apps'],
];
const OFF_CLOCK = [
  ['🐾', 'about.offClock.nox', 'Long walks with Nox'],
  ['🍵', 'about.offClock.matcha', 'Iced blueberry matcha, always'],
  ['🧘', 'about.offClock.yoga', 'Yoga & CrossFit'],
  ['🎬', 'about.offClock.cinema', 'Cinema nights (extra nachos)'],
  ['🪄', 'about.offClock.magic', 'Anything Harry Potter'],
];

function SideCard({ title, items, status }) {
  const { t } = useLanguage();
  const tr = (key, fallback) => {
    const v = t(key);
    return !v || v === key ? fallback : v;
  };
  return (
    <aside className="about-side-card">
      <p className="about-side-title">{title}</p>
      <ul className="about-side-list">
        {items.map(([icon, key, text]) => (
          <li key={key}>
            <span className="about-side-icon" aria-hidden="true">{icon}</span>
            {tr(key, text)}
          </li>
        ))}
      </ul>
      {status && (
        <p className="about-side-status">
          <span className="about-side-dot" aria-hidden="true" />
          {status}
        </p>
      )}
    </aside>
  );
}

const NOTE_IDS = ['story', 'life', 'facts'];

export default function About() {
  const { t } = useLanguage();
  const tr = (key, fallback) => {
    const v = t(key);
    return !v || v === key ? fallback : v;
  };
  const [activeNote, setActiveNote] = useState(() => {
    if (typeof window !== 'undefined') {
      const preset = sessionStorage.getItem('cbk-about-tab');
      if (preset) {
        sessionStorage.removeItem('cbk-about-tab');
        // Ignore old saved values for tabs that no longer exist
        if (NOTE_IDS.includes(preset)) return preset;
      }
    }
    return 'story';
  });

  const notes = NOTE_IDS.map(id => ({ id, label: t(`about.notes.${id}`) }));

  return (
    <section id="about" className="about-section">

      <div className="about-intro">
        <p className="about-kicker">
          <span className="about-kicker-star" aria-hidden="true">✳</span>
          {tr('about.kicker', "Hello, I'm Klaudia")}
        </p>
        <ScrollRevealText text={t('about.intro')} />
      </div>

      <div className="about-notes-wrap" id="about-notes">
        <div className="about-notes-window">

          <div className="about-notes-titlebar">
            <div className="an-traffic">
              <span className="an-dot an-dot--r" />
              <span className="an-dot an-dot--y" />
              <span className="an-dot an-dot--g" />
            </div>
            <span className="an-titlebar-title">
              {notes.find(n => n.id === activeNote)?.label}
            </span>
          </div>

          <div className="about-notes-body">
            <aside className="about-notes-sidebar">
              <p className="an-sidebar-label">{t('about.notes.icloudLabel')}</p>
              {notes.map(note => (
                <button
                  key={note.id}
                  className={`an-sidebar-item ${activeNote === note.id ? 'an-sidebar-item--active' : ''}`}
                  onClick={() => setActiveNote(note.id)}
                >
                  <span className="an-sidebar-dot" />
                  {note.label}
                </button>
              ))}
              <p className="an-sidebar-label">{t('about.notes.otherLabel')}</p>
              <div className="an-sidebar-item an-sidebar-item--muted an-sidebar-item--disabled">
                🗑 {t('about.notes.recentlyDeleted')}
              </div>
            </aside>

            <div className="about-notes-main">

              {activeNote === 'story' && (
                <div className="about-story" key="story">
                  <Reveal>
                    <h3 className="about-block-title about-block-title--center">{t('about.story.title')}</h3>
                  </Reveal>
                  <div className="about-block about-block--text-only">
                    <Reveal delay={120} className="about-block-text">
                      <p className="about-block-body">{t('about.story.body1')}</p>
                      <p className="about-block-body">{t('about.story.body2')}</p>
                      <div className="about-cta-row">
                        <a
                          className="about-cv-btn"
                          href="/files/Klaudia_Kulawik_CV.pdf"
                          download
                        >
                          <Download size={15} strokeWidth={2.25} />
                          {t('about.story.cvButton')}
                        </a>
                        <a className="about-secondary-link" href="#contact">
                          <span className="about-secondary-text">{t('about.story.contactLink')}</span>
                          <ArrowRight size={14} strokeWidth={2.25} />
                        </a>
                      </div>
                    </Reveal>
                    <Reveal delay={220}>
                      <SideCard title={tr('about.glance.title', 'At a glance')} items={GLANCE} status={tr('about.glance.status', 'Available for new projects')} />
                    </Reveal>
                  </div>
                </div>
              )}


              {activeNote === 'life' && (
                <div className="about-story" key="life">
                  <Reveal>
                    <h3 className="about-block-title about-block-title--center">{t('about.life.title')}</h3>
                  </Reveal>
                  <div className="about-block about-block--text-only">
                    <Reveal delay={120} className="about-block-text">
                      <p className="about-block-body">{t('about.life.body1')}</p>
                      <p className="about-block-body">{t('about.life.body2')}</p>
                    </Reveal>
                    <Reveal delay={220}>
                      <SideCard title={tr('about.offClock.title', 'Off the clock')} items={OFF_CLOCK} />
                    </Reveal>
                  </div>
                </div>
              )}

              {activeNote === 'facts' && (
                <div className="about-notes-page" key="facts">
                  <Reveal>
                    <h3 className="about-block-title about-block-title--center">{t('about.facts.title')}</h3>
                    <p className="about-block-body" style={{ marginBottom: 32, textAlign: 'center' }}>
                      {t('about.facts.subtitle')}
                    </p>
                  </Reveal>

                  <Reveal delay={100}>
                    <ul className="an-fact-list">
                      {[1, 2, 3, 4].map(n => (
                        <li key={n} className="an-fact">
                          <span className="an-fact-num" aria-hidden="true">0{n}</span>
                          {t(`about.facts.item${n}`)}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

    </section>
  );
}