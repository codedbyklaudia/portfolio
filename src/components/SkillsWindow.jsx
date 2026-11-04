import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Draggable from './Draggable';
import { useLanguage } from '../context/LanguageContext';
import { CODE_LANGUAGES, SOFTWARE } from './skillsData';
import './SkillsWindow.scss';

function Group({ label, items }) {
  return (
    <section className="sw-group">
      <h3 className="sw-group__label">{label}</h3>
      <ul className="sw-grid">
        {items.map(({ name, icon }) => (
          <li className="sw-tile" key={name}>
            <img src={icon} alt="" width={44} height={44} draggable={false} decoding="async" />
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SkillsWindow({ open, onClose, title, languagesLabel, softwareLabel }) {
  const { t } = useLanguage();
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  // Portal to body: the hero content is transformed by scroll, which would break position: fixed
  return createPortal(
    <div className="sw-wrap">
      {/* clicking anywhere outside the window closes it */}
      <div className="sw-backdrop" onClick={onClose} aria-hidden="true" />
      <Draggable id="window-toolbox" className="sw-window" role="dialog" aria-label={title}>
        <div className="sw-inner">
          <div className="sw-bar">
            <button
              type="button"
              className="sw-dot sw-dot--r"
              onClick={onClose}
              aria-label={t('common.close')}
            >
              <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 3.5l5 5M8.5 3.5l-5 5" /></svg>
            </button>
            <span className="sw-dot sw-dot--y" aria-hidden="true" />
            <span className="sw-dot sw-dot--g" aria-hidden="true" />
            <span className="sw-title">{title}</span>
            <button type="button" className="sw-close" onClick={onClose} title={`${t('common.close')} (Esc)`}>
              {t('common.close')}
              <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 3l6 6M9 3l-6 6" /></svg>
            </button>
          </div>

          <div className="sw-body">
            <Group label={languagesLabel} items={CODE_LANGUAGES} />
            <Group label={softwareLabel} items={SOFTWARE} />
          </div>
        </div>
      </Draggable>
    </div>,
    document.body
  );
}