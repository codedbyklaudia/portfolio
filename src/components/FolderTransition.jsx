import { useEffect, useRef } from 'react';
import './FolderTransition.scss';

function shadeColor(hex, pct) {
  const n = parseInt(hex.replace('#',''), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + pct));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + pct));
  const b = Math.min(255, Math.max(0, (n & 0xff) + pct));
  return `#${((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}`;
}

export default function FolderTransition() {
  const sectionRef = useRef(null);
  const folderRef  = useRef(null);
  const lidRef     = useRef(null);
  const overlayRef = useRef(null);
  const labelRef   = useRef(null);

  const COLOR = '#6B4FA0';
  const DARK  = shadeColor(COLOR, -30);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect     = section.getBoundingClientRect();
        const sectionH = section.offsetHeight;
        const vh       = window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / (sectionH - vh)));

        // 0→0.3: folder slides up from bottom, label fades in
        // 0.3→0.6: folder opens (lid rotates)
        // 0.6→0.85: folder scales up and zooms to fill viewport
        // 0.85→1: overlay fades to bg colour, section transitions

        if (folderRef.current) {
          const entryP  = Math.min(1, p / 0.3);
          const entryE  = 1 - Math.pow(1 - entryP, 3);

          const scaleP  = Math.max(0, (p - 0.55) / 0.45);
          const scaleE  = 1 - Math.pow(1 - scaleP, 3);
          const scale   = 1 + scaleE * 18;

          const yOffset = (1 - entryE) * 120;

          folderRef.current.style.opacity   = Math.min(1, entryP * 2);
          folderRef.current.style.transform = `translateY(${yOffset}px) scale(${scale})`;
        }

        // Lid opens 0.3→0.65
        if (lidRef.current) {
          const openP = Math.min(1, Math.max(0, (p - 0.28) / 0.37));
          const openE = openP < 0.5 ? 2*openP*openP : 1-Math.pow(-2*openP+2,2)/2;
          lidRef.current.style.transform = `rotateX(${-openE * 60}deg)`;
        }

        // Label fades out as folder starts scaling
        if (labelRef.current) {
          labelRef.current.style.opacity = Math.max(0, 1 - Math.max(0, (p - 0.45) / 0.15));
        }

        // Overlay fades in at end (colour transition to projects)
        if (overlayRef.current) {
          const fadeP = Math.min(1, Math.max(0, (p - 0.82) / 0.18));
          overlayRef.current.style.opacity = fadeP;
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="ft-section" ref={sectionRef}>
      <div className="ft-sticky">

        {/* Background matches hero */}
        <div className="ft-bg" />

        {/* The folder — zooms toward user */}
        <div className="ft-folder-wrap">
          <div className="ft-folder" ref={folderRef} style={{ opacity: 0 }}>
            {/* Folder SVG — lid + body */}
            <div className="ft-folder-3d">
              {/* Lid */}
              <div className="ft-lid" ref={lidRef}>
                <svg viewBox="0 0 280 60" className="ft-lid-svg">
                  <path d="M0 60 Q0 0 12 0 L90 0 Q104 0 112 14 L132 60 Z"
                    fill={DARK}/>
                  <path d="M0 60 Q0 8 12 8 L88 8 Q100 8 108 20 L128 60 Z"
                    fill={COLOR}/>
                </svg>
              </div>
              {/* Body */}
              <svg viewBox="0 0 280 200" className="ft-body-svg">
                <rect x="0" y="0" width="280" height="200" rx="12" fill={DARK}/>
                <rect x="0" y="8" width="280" height="192" rx="12" fill={COLOR}/>
                {/* Papers inside */}
                <rect x="24" y="-8" width="228" height="130" rx="6" fill="rgba(255,255,255,0.12)"/>
                <rect x="18" y="-2" width="228" height="122" rx="6" fill="rgba(255,255,255,0.18)"/>
                <rect x="12" y="4"  width="228" height="114" rx="6" fill="rgba(255,255,255,0.22)"/>
              </svg>
            </div>

            {/* Label */}
            <div className="ft-label" ref={labelRef}>
              <span className="ft-label-text">Project Archive</span>
              <span className="ft-label-sub">6 projects inside</span>
            </div>
          </div>
        </div>

        {/* Colour overlay → transitions to projects bg */}
        <div className="ft-overlay" ref={overlayRef} />

      </div>
    </section>
  );
}