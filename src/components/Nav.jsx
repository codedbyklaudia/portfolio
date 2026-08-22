import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Nav.scss';

function MenubarClock() {
const [time, setTime] = useState('');
const [date, setDate] = useState('');
useEffect(() => {
const update = () => {
const now = new Date();
setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
setDate(now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }));
    };
update();
const t = setInterval(update, 10000);
return () => clearInterval(t);
  }, []);
return <span className="nb-clock">{date} {time}</span>;
}

export default function Nav() {
const { t } = useLanguage();
const [hidden, setHidden] = useState(true);

useEffect(() => {
const check = () => {
const hero    = document.getElementById('hero');
const about   = document.getElementById('about');
const contact = document.getElementById('contact');
const overDark = el => {
if (!el) return false;
const r = el.getBoundingClientRect();
return r.top <= 40 && r.bottom > 0;
      };
if (!hero) { setHidden(false); return; }
const rect     = hero.getBoundingClientRect();
const sectionH = hero.offsetHeight;
const vh       = window.innerHeight;
const p        = Math.min(1, Math.max(0, -rect.top / (sectionH - vh)));

const inLaptopStage = rect.bottom > vh + 40 && p < 0.29;
setHidden(inLaptopStage);
    };
window.addEventListener('scroll', check, { passive: true });
window.addEventListener('resize', check);
check();
const t = setTimeout(check, 150);
return () => {
window.removeEventListener('scroll', check);
window.removeEventListener('resize', check);
clearTimeout(t);
    };
  }, []);

return (
<header className={`nav ${hidden ? 'nav--hidden' : ''}`}>
{/* Left — logo + menu items */}
<div className="nb-left">
<a href="#hero" className="nb-logo">
<img src="/images/codedbyklaudia_logo_1.png" alt="KK" className="nb-logo-img" />
</a>
<nav className="nb-menu">
<a href="#projects-folder" className="nb-item">{t('nav.projects')}</a>
<a href="#about"           className="nb-item">{t('nav.aboutMe')}</a>
<a href="#contact"         className="nb-item">{t('nav.contact')}</a>
</nav>
</div>

{/* Right — status icons + clock */}
<div className="nb-right">
{/* WiFi */}
<svg className="nb-icon" viewBox="0 0 16 12" fill="none">
<path d="M8 10.5a1.2 1.2 0 100 .01M4.5 7.8a5 5 0 017 0M1.5 5a9.2 9.2 0 0113 0"
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
</svg>
{/* Battery */}
<svg className="nb-icon" viewBox="0 0 22 12" fill="none">
<rect x="1" y="2" width="17" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.2"/>
<rect x="2.5" y="3.5" width="12" height="5" rx="1" fill="currentColor"/>
<path d="M20 4.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
</svg>
{/* Search */}
<svg className="nb-icon" viewBox="0 0 16 16" fill="none">
<circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
<path d="M10 10 L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
</svg>
<MenubarClock />
<a href="#contact" className="nb-cta">{t('nav.getInTouch')}</a>
</div>
</header>
  );
}