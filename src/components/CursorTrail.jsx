import { useEffect, useRef } from 'react';
import './CursorTrail.scss';

// Particle trail config
const SPAWN_INTERVAL = 25;   // ms between particle spawns while moving
const PARTICLE_LIFE  = 650;  // ms each particle takes to fade out
const COLORS = ['#E63946', '#3A7A6A', '#F4A261', '#6B4FA0', '#E9C46A', '#457B9D'];

export default function CursorTrail() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    let mx = -200, my = -200;
    let lastSpawn = 0;
    let active = true;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';

      const now = performance.now();
      if (now - lastSpawn < SPAWN_INTERVAL) return;
      lastSpawn = now;
      spawnParticle(mx, my);
    };
    window.addEventListener('mousemove', onMouseMove);

    // Custom cursor dot
    const cursor = document.createElement('div');
    cursor.className = 'cursor-main-dot';
    document.body.appendChild(cursor);

    function spawnParticle(x, y) {
      const el = document.createElement('div');
      el.className = 'trail-particle';

      const size = 4 + Math.random() * 6;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      // small random offset so particles don't stack in a perfect line
      const offX = (Math.random() - 0.5) * 6;
      const offY = (Math.random() - 0.5) * 6;

      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.background = color;
      el.style.left = `${x + offX}px`;
      el.style.top = `${y + offY}px`;

      container.appendChild(el);

      // trigger fade/shrink on next frame so the transition applies
      requestAnimationFrame(() => {
        el.style.opacity = '0';
        el.style.transform = 'translate(-50%, -50%) scale(0.2)';
      });

      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, PARTICLE_LIFE);
    }

    // Hide cursor + stop spawning when leaving window
    const onLeave = () => { active = false; cursor.style.opacity = '0'; };
    const onEnter = () => { active = true; cursor.style.opacity = '1'; };
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      container.querySelectorAll('.trail-particle').forEach(n => n.remove());
      document.body.removeChild(cursor);
    };
  }, []);

  return <div ref={containerRef} className="cursor-trail-container" aria-hidden="true" />;
}