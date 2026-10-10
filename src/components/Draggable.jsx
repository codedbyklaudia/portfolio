import { useRef, useState } from 'react';

// Positions survive route changes (Hero unmounts on project pages) but reset on reload
const saved = {};

const THRESHOLD = 4; // px before a press counts as a drag
const EDGE = 8;      // keep this far from the viewport edges
const TOP = 72;      // and clear of the menu bar (64px tall)

// Mouse and trackpad only, touch keeps scrolling the page
const canDrag = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export default function Draggable({
  id,
  as: Tag = 'div',
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const drag = useRef(null);
  const moved = useRef(false);
  const posRef = useRef(saved[id] || { x: 0, y: 0 });
  const [pos, setPos] = useState(posRef.current);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e) => {
    if (e.button !== 0 || !canDrag()) return;
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      origin: posRef.current,
      rect: ref.current.getBoundingClientRect(),
    };
    moved.current = false;
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;

    let dx = e.clientX - d.startX;
    let dy = e.clientY - d.startY;

    if (!moved.current) {
      if (Math.hypot(dx, dy) < THRESHOLD) return;
      moved.current = true;
      setDragging(true);
      ref.current.setPointerCapture(e.pointerId);
    }

    // Keep the item inside the viewport
    const r = d.rect;
    dx = Math.min(Math.max(dx, EDGE - r.left), window.innerWidth - EDGE - r.right);
    dy = Math.min(Math.max(dy, TOP - r.top), window.innerHeight - EDGE - r.bottom);

    const next = { x: d.origin.x + dx, y: d.origin.y + dy };
    posRef.current = next;
    setPos(next);
  };

  const onPointerEnd = () => {
    if (!drag.current) return;
    drag.current = null;
    if (moved.current) {
      saved[id] = posRef.current;
      setDragging(false);
    }
  };

  // A drag must not count as a click (folder open, CV download)
  const onClickCapture = (e) => {
    if (moved.current) {
      e.preventDefault();
      e.stopPropagation();
      moved.current = false;
    }
  };

  const moved2d = pos.x !== 0 || pos.y !== 0;

  return (
    <Tag
      {...rest}
      ref={ref}
      className={`lh-draggable ${dragging ? 'lh-draggable--dragging' : ''} ${className}`}
      style={{
        ...style,
        transform: moved2d ? `translate3d(${pos.x}px, ${pos.y}px, 0)` : undefined,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onClickCapture={onClickCapture}
    >
      {children}
    </Tag>
  );
}