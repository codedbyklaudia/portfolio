import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './SkillsWindow.scss'; // the window look is shared with the Toolbox
import './StackWindow.scss';

// One tool icon. If there is no icon (or it fails to load), a lettered badge.
export function StackIcon({ item, size = 44 }) {
  const [failed, setFailed] = useState(false);

  if (!item.icon || failed) {
    return (
      <span className="stk-badge" style={{ width: size, height: size, fontSize: size * 0.42 }}>
        {item.initial}
      </span>
    );
  }
  return (
    <img
      src={item.icon}
      alt=""
      width={size}
      height={size}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}

// "Built with" window: the tools used on one project
export default function StackWindow({ open, onClose, title, items }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="stk-overlay" onClick={onClose}>
      <div
        className="sw-window stk-window"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sw-inner">
          <div className="sw-bar">
            <div className="sw-dots">
              <button type="button" className="sw-dot sw-dot--r" onClick={onClose} aria-label="Close" />
              <span className="sw-dot sw-dot--y" aria-hidden="true" />
              <span className="sw-dot sw-dot--g" aria-hidden="true" />
            </div>
            <span className="sw-title">{title}</span>
          </div>

          <div className="sw-body">
            <ul className="sw-grid">
              {items.map((item) => (
                <li className="sw-tile" key={item.name}>
                  <StackIcon item={item} size={44} />
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}