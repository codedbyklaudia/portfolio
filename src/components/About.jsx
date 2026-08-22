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

function TiltPhoto({ children }) {
  const ref = useRef(null);

  const handleMove = e => {
    if (typeof document !== 'undefined' && document.documentElement.getAttribute('data-reduce-motion') === 'true') return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tilt-x', `${py * -6}deg`);
    el.style.setProperty('--tilt-y', `${px * 6}deg`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div className="about-photo" ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  );
}

const SKILL_META = [
  { num: '01', color: '#8e6cce', app: 'ide',    list: ['Java · XML', 'Retrofit · DataStore', 'Socket.io', 'Swift (iOS) in progress'] },
  { num: '02', color: '#3A7A6A', app: 'vscode', list: ['React · TypeScript', 'SCSS/CSS · JavaScript', 'Accessibility · HTML'] },
  { num: '03', color: '#C95B2A', app: 'code',   list: ['Node.js · Express', 'PostgreSQL · MongoDB', 'REST APIs · PHP'] },
  { num: '04', color: '#C8952A', app: 'design', list: ['Adobe', 'UI/UX · Figma', 'Canva'] },
];
const NOTE_IDS = ['story', 'life', 'skills', 'facts'];

export default function About() {
  const { t } = useLanguage();
  const [activeNote, setActiveNote] = useState(() => {
    if (typeof window !== 'undefined') {
      const preset = sessionStorage.getItem('cbk-about-tab');
      if (preset) {
        sessionStorage.removeItem('cbk-about-tab');
        return preset;
      }
    }
    return 'story';
  });

  const notes = NOTE_IDS.map(id => ({ id, label: t(`about.notes.${id}`) }));

  const skills = SKILL_META.map(meta => ({
    ...meta,
    name: t(`skills.chapters.${meta.app}.name`),
  }));

  return (
    <section id="about" className="about-section">

      <div className="about-intro">
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
                  <div className="about-block about-block--img-left">
                    <Reveal className="about-block-img">
                      <TiltPhoto>
                        <div className="about-img-wrap is-bottom">
                          <img src="/images/about-1.jpg" alt="Klaudia"
                            onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                          />
                          <div className="about-img-placeholder" style={{display:'none'}}>
                            <img src="/images/me_harry.jpeg" alt="Klaudia" />
                          </div>
                        </div>
                        <span className="about-img-tag">{t('about.story.imgTag')}</span>
                      </TiltPhoto>
                    </Reveal>
                    <Reveal delay={120} className="about-block-text">
                      <h3 className="about-block-title">{t('about.story.title')}</h3>
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
                  </div>
                </div>
              )}

            
              {activeNote === 'life' && (
                <div className="about-story" key="life">
                  <div className="about-block about-block--img-right">
                    <Reveal delay={120} className="about-block-text">
                      <h3 className="about-block-title">{t('about.life.title')}</h3>
                      <p className="about-block-body">{t('about.life.body1')}</p>
                      <p className="about-block-body">{t('about.life.body2')}</p>
                    </Reveal>
                    <Reveal className="about-block-img">
                      <TiltPhoto>
                        <div className="about-img-wrap">
                          <img src="/images/about-3.jpg" alt="Nox"
                            onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                          />
                          <div className="about-img-placeholder" style={{display:'none'}}>
                            <img src="/images/me_and_nox.jpeg" alt="Nox" />
                          </div>
                        </div>
                        <span className="about-img-tag">{t('about.life.imgTag')}</span>
                      </TiltPhoto>
                    </Reveal>
                  </div>
                </div>
              )}

              {/* Skills */}
              {activeNote === 'skills' && (
                <div className="about-notes-page" key="skills">
                  <Reveal>
                    <h3 className="about-block-title">
                      {t('skills.headingPart1')} {t('skills.headingPart2')}
                    </h3>
                  </Reveal>

                  <div className="an-skill-cv-list">
                    {skills.map((s, i) => (
                      <Reveal delay={80 + i * 60} key={s.app}>
                        <div className="an-skill-group" style={{ '--cv-accent': s.color }}>
                          <h4 className="an-skill-group-title">{s.name}</h4>
                          <div className="an-skill-cv-tags">
                            {s.list.map(item => (
                              <span className="an-skill-cv-tag" key={item}>{item}</span>
                            ))}
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}

              {activeNote === 'facts' && (
                <div className="about-notes-page" key="facts">
                  <Reveal>
                    <h3 className="about-block-title">{t('about.facts.title')}</h3>
                    <p className="about-block-body" style={{ marginBottom: 32 }}>
                      {t('about.facts.subtitle')}
                    </p>
                  </Reveal>

                  <Reveal delay={100}>
                    <ul className="an-fact-list">
                      <li>{t('about.facts.item1')}</li>
                      <li>{t('about.facts.item2')}</li>
                      <li>{t('about.facts.item3')}</li>
                      <li>{t('about.facts.item4')}</li>
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