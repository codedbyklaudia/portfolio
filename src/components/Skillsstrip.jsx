import { useLanguage } from '../context/LanguageContext';
import { CODE_LANGUAGES, SOFTWARE } from './skillsData';
import './SkillsStrip.scss';

const ITEMS = [...CODE_LANGUAGES, ...SOFTWARE];

// One row of icons. The second copy is only there to make the loop seamless.
function Row({ hidden = false }) {
  return (
    <ul className="sk-row" aria-hidden={hidden || undefined}>
      {ITEMS.map(({ name, icon }) => (
        <li className="sk-item" key={name}>
          <img src={icon} alt="" width={52} height={52} loading="lazy" decoding="async" draggable={false} />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SkillsStrip() {
  const { t } = useLanguage();

  // Only used as the section's accessible name (not shown on screen)
  const label = (() => {
    const value = t('skills.stripLabel');
    return !value || value === 'skills.stripLabel' ? 'Tools I work with' : value;
  })();

  return (
    <section className="sk" aria-label={label}>
      <div className="sk__viewport">
        <div className="sk__track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}