import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Draggable from './Draggable';
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
      <Draggable id="window-toolbox" className="sw-window" role="dialog" aria-label={title}>
        <div className="sw-inner">
          <div className="sw-bar">
            <button
              type="button"
              className="sw-dot sw-dot--r"
              onClick={onClose}
              aria-label="Close"
            />
            <span className="sw-dot sw-dot--y" aria-hidden="true" />
            <span className="sw-dot sw-dot--g" aria-hidden="true" />
            <span className="sw-title">{title}</span>
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