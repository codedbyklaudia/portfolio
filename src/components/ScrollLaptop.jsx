import { useEffect, useRef } from 'react';
import './ScrollLaptop.scss';

const CODE_LINES = [
  { text: '> npm run build',    color: '#C3E88D' },
  { text: '✓ built in 0.8s',   color: '#82AAFF' },
  { text: '> git push origin',  color: '#C3E88D' },
  { text: '> Deploying...',     color: '#FFCB6B' },
  { text: '✓ Live on prod 🚀',  color: '#C95B2A' },
];

export default function ScrollLaptop({ sectionRef: externalRef }) {
  const wrapRef  = useRef(null);
  const lidRef   = useRef(null);
  const glowRef  = useRef(null);
  const codeRef  = useRef(null);

  useEffect(() => {
    const getSection = () => externalRef?.current || document.getElementById('about');
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = getSection();
          if (!section) return;
          const rect = section.getBoundingClientRect();
          const vh   = window.innerHeight;
          const p    = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 1.1)));

          // Subtle float
          if (wrapRef.current) {
            wrapRef.current.style.transform = `translateY(${-p * 16}px)`;
          }

          // Lid rotates open: starts at 8deg (almost closed), opens to 118deg
          if (lidRef.current) {
            const angle = 8 + p * 110;
            lidRef.current.style.transform = `rotateX(${-angle}deg)`;
          }

          // Screen glow
          if (glowRef.current) {
            glowRef.current.style.opacity = Math.max(0, (p - 0.15) * 1.8).toString();
          }

          // Typewriter
          if (codeRef.current) {
            const lines  = codeRef.current.querySelectorAll('.sl-line');
            const cursors = codeRef.current.querySelectorAll('.sl-cursor');
            const totalChars = CODE_LINES.reduce((s, l) => s + l.text.length, 0);
            const codeP  = Math.max(0, (p - 0.3) / 0.7);
            let rem = Math.floor(codeP * totalChars);

            lines.forEach((line, i) => {
              const len = CODE_LINES[i].text.length;
              if (rem >= len) { line.textContent = CODE_LINES[i].text; rem -= len; }
              else { line.textContent = CODE_LINES[i].text.slice(0, rem); rem = 0; }
            });

            let rem2 = Math.floor(codeP * totalChars);
            cursors.forEach((c, i) => {
              const len = CODE_LINES[i].text.length;
              c.style.display = (rem2 > 0 && rem2 < len) ? 'inline' : 'none';
              rem2 = Math.max(0, rem2 - len);
            });
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [externalRef]);

  return (
    <div className="sl-wrap" ref={wrapRef} aria-hidden="true">
      <div className="sl-scene">

        {/* ── LID (screen half) ── */}
        <div className="sl-lid" ref={lidRef}>
          <svg
            className="sl-lid-svg"
            viewBox="0 0 560 380"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer lid body — space grey aluminium */}
            <rect x="0" y="0" width="560" height="378" rx="14"
              fill="url(#lidGrad)" />
            {/* Bottom edge hinge line */}
            <rect x="0" y="370" width="560" height="8" rx="0"
              fill="rgba(0,0,0,0.15)" />
            {/* Inner bezel — black surround */}
            <rect x="10" y="10" width="540" height="358" rx="10"
              fill="#1A1A1A" />
            {/* Notch */}
            <rect x="238" y="10" width="84" height="18" rx="0"
              fill="#1A1A1A" />
            <rect x="242" y="10" width="76" height="14" rx="7"
              fill="#111" />
            {/* Screen area */}
            <rect x="16" y="28" width="528" height="334" rx="6"
              fill="#0F0F18" />

            {/* Screen glow */}
            <rect x="16" y="28" width="528" height="334" rx="6"
              fill="url(#screenGlow)" ref={glowRef}
              style={{opacity:0}} />

            {/* Menubar */}
            <rect x="16" y="28" width="528" height="24" rx="0"
              fill="#1E1E28" />
            {/* Menubar dots */}
            <circle cx="36"  cy="40" r="5" fill="#FF5F57" />
            <circle cx="54"  cy="40" r="5" fill="#FFBD2E" />
            <circle cx="72"  cy="40" r="5" fill="#28C840" />
            {/* Menubar title */}
            <text x="280" y="44" textAnchor="middle"
              fontFamily="monospace" fontSize="9" fill="rgba(255,255,255,0.4)"
              letterSpacing="0.5">klaudia — terminal</text>

            {/* Terminal lines — rendered via foreignObject */}
            <foreignObject x="24" y="60" width="512" height="296">
              <div xmlns="http://www.w3.org/1999/xhtml"
                ref={codeRef}
                style={{padding:'12px 16px', display:'flex', flexDirection:'column', gap:'10px'}}>
                {CODE_LINES.map((line, i) => (
                  <div key={i} style={{display:'flex', alignItems:'center', gap:'8px'}}>
                    <span style={{fontFamily:'monospace', fontSize:'12px', color:'rgba(255,255,255,0.25)', flexShrink:0}}>$</span>
                    <span className="sl-line" style={{fontFamily:'monospace', fontSize:'12px', color: line.color, whiteSpace:'nowrap'}} />
                    <span className="sl-cursor" style={{fontFamily:'monospace', fontSize:'12px', color:'#C95B2A', display:'none', animation:'blink 0.7s step-end infinite'}}>▋</span>
                  </div>
                ))}
              </div>
            </foreignObject>

            {/* Camera dot */}
            <circle cx="280" cy="19" r="3.5" fill="#333" />
            <circle cx="280" cy="19" r="1.5" fill="#222" />

            {/* Gradients */}
            <defs>
              <linearGradient id="lidGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#D0D0D0" />
                <stop offset="40%"  stopColor="#B8B8B8" />
                <stop offset="100%" stopColor="#A0A0A0" />
              </linearGradient>
              <radialGradient id="screenGlow" cx="50%" cy="40%" r="60%">
                <stop offset="0%"   stopColor="#3A2060" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0F0F18" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* ── BASE (keyboard half) ── */}
        <div className="sl-base">
          <svg
            className="sl-base-svg"
            viewBox="0 0 560 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#C8C8C8" />
                <stop offset="100%" stopColor="#A8A8A8" />
              </linearGradient>
            </defs>
            {/* Base body */}
            <rect x="0" y="0" width="560" height="38" rx="0" fill="url(#baseGrad)" />
            <rect x="0" y="36" width="560" height="4" rx="2" fill="#888" />
            {/* Hinge groove */}
            <rect x="0" y="0" width="560" height="3" fill="rgba(0,0,0,0.2)" />

            {/* Keyboard area */}
            <rect x="30" y="5" width="500" height="22" rx="3" fill="rgba(0,0,0,0.08)" />

            {/* Key rows — top row */}
            {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(k => (
              <rect key={k} x={32 + k*37} y={7} width={33} height={8} rx="1.5"
                fill="rgba(0,0,0,0.18)" />
            ))}
            {/* Second row */}
            {[0,1,2,3,4,5,6,7,8,9,10,11].map(k => (
              <rect key={k} x={36 + k*37} y={18} width={33} height={7} rx="1.5"
                fill="rgba(0,0,0,0.18)" />
            ))}

            {/* Trackpad */}
            <rect x="210" y="30" width="140" height="6" rx="3"
              fill="rgba(0,0,0,0.1)" />
          </svg>
        </div>

        {/* Ground shadow */}
        <div className="sl-shadow" />
      </div>
    </div>
  );
}