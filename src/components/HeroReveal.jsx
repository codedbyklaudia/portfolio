import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import './HeroReveal.scss';

function CameraModel({ rotY }) {
  const { scene } = useGLTF('/images/camera-3d.glb');
  return (
    <primitive
      object={scene}
      scale={2}
      position={[0, -0.5, 0]}
      rotation={[0.1, (rotY * Math.PI) / 180, 0]}
    />
  );
}

function Camera3D({ rotY }) {
  return (
    <div className="hr-camera-canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 38 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]}  intensity={1.5} />
        <directionalLight position={[-5, 3, 2]} intensity={0.6} />
        <pointLight       position={[0, -2, 4]} intensity={0.4} color="#C95B2A" />
        <Suspense fallback={null}>
          <CameraModel rotY={rotY} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default function HeroReveal() {
  const flashRef    = useRef(null);
  const doneRef     = useRef(false);
  const progressRef = useRef(0);
  const shootRRef   = useRef(false);
  const shootLRef   = useRef(false);

  const [camVisible,     setCamVisible]     = useState(false);
  const [camRight,       setCamRight]       = useState('-300px');
  const [camTop,         setCamTop]         = useState('20vh');
  const [camRotY,        setCamRotY]        = useState(-40);
  const [rightVisible,   setRightVisible]   = useState(false);
  const [leftVisible,    setLeftVisible]    = useState(false);
  const [rightDeveloped, setRightDeveloped] = useState(false);
  const [leftDeveloped,  setLeftDeveloped]  = useState(false);
  const [showHint,       setShowHint]       = useState(true);

  const flash = () => {
    if (!flashRef.current) return;
    flashRef.current.style.opacity = '0.9';
    setTimeout(() => { if (flashRef.current) flashRef.current.style.opacity = '0'; }, 150);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const TOTAL = window.innerHeight * 3;

    const update = (p) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (p <= 0.02) {
        setCamVisible(false);
        return;
      }
      setCamVisible(true);
      if (showHint) setShowHint(false);

      if (p < 0.38) {
        const t    = Math.min(1, (p - 0.02) / 0.36);
        const ease = 1 - Math.pow(1 - t, 3);
        setCamRight((vw * 0.18 + (1 - ease) * 400) + 'px');
        setCamTop(vh * 0.2 + 'px');
        setCamRotY(-40 + ease * 10);
      } else if (p < 0.62) {
        const t    = (p - 0.38) / 0.24;
        const ease = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;
        setCamRight((vw * 0.18 + ease * vw * 0.42) + 'px');
        setCamTop(vh * 0.2 + 'px');
        setCamRotY(-30 + ease * 70);
      } else if (p < 0.82) {
        setCamRight(vw * 0.60 + 'px');
        setCamTop(vh * 0.2 + 'px');
        setCamRotY(40);
      } else {
        const t    = (p - 0.82) / 0.18;
        const ease = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;
        setCamRight((vw * 0.60 - ease * (vw + 300)) + 'px');
        setCamTop(vh * 0.2 + 'px');
        setCamRotY(40);
      }
    };

    const onWheel = (e) => {
      if (doneRef.current) return;
      e.preventDefault();
      progressRef.current = Math.min(1, Math.max(0, progressRef.current + e.deltaY / TOTAL));
      const p = progressRef.current;
      update(p);

      if (p >= 0.38 && !shootRRef.current) {
        shootRRef.current = true;
        flash();
        setTimeout(() => {
          setRightVisible(true);
          setTimeout(() => setRightDeveloped(true), 80);
        }, 120);
      }
      if (p >= 0.62 && !shootLRef.current) {
        shootLRef.current = true;
        flash();
        setTimeout(() => {
          setLeftVisible(true);
          setTimeout(() => setLeftDeveloped(true), 80);
        }, 120);
      }
      if (p >= 1) {
        doneRef.current = true;
        document.body.style.overflow = '';
        setCamVisible(false);
      }
    };

    let ty = 0;
    const onTouchStart = (e) => { ty = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      if (doneRef.current) return;
      e.preventDefault();
      const d = ty - e.touches[0].clientY;
      ty = e.touches[0].clientY;
      onWheel({ preventDefault: ()=>{}, deltaY: d * 3 });
    };

    window.addEventListener('wheel',      onWheel,      { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove',  onTouchMove,  { passive: false });
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel',      onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
    };
  }, []);

  const vw = typeof window !== 'undefined' ? window.innerWidth  : 1440;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900;

  return (
    <>
      <div className="hr-flash" ref={flashRef} />

      {/* 3D Camera */}
      {camVisible && (
        <div style={{
          position: 'fixed',
          right:    camRight,
          top:      camTop,
          zIndex:   40,
          pointerEvents: 'none',
          transition: 'right 0.04s linear, top 0.04s linear',
        }}>
          <Camera3D rotY={camRotY} />
        </div>
      )}

      {/* Right polaroid */}
      {rightVisible && (
        <div className="hr-polaroid" style={{
          position: 'fixed', zIndex: 20, pointerEvents: 'none',
          right: vw * 0.04 + 'px', top: vh * 0.09 + 'px',
          transform: 'rotate(4deg)',
        }}>
          <div className="hr-polaroid-inner">
            <img src="/images/IMG_6130.jpeg" alt="Klaudia"
              className={`hr-polaroid-img${rightDeveloped ? ' hr-develop' : ''}`} />
          </div>
          <p className="hr-polaroid-caption">That's me ✨</p>
        </div>
      )}

      {/* Left polaroid */}
      {leftVisible && (
        <div className="hr-polaroid" style={{
          position: 'fixed', zIndex: 20, pointerEvents: 'none',
          left: vw * 0.03 + 'px', top: vh * 0.17 + 'px',
          transform: 'rotate(-6deg)',
        }}>
          <div className="hr-polaroid-inner">
            <img src="/images/IMG_0152.jpeg" alt="London"
              className={`hr-polaroid-img${leftDeveloped ? ' hr-develop' : ''}`} />
          </div>
          <p className="hr-polaroid-caption">London 🌧️</p>
        </div>
      )}

      {showHint && (
        <div className="hr-hint">
          <span>scroll</span>
          <span className="hr-hint-arrow">↓</span>
        </div>
      )}
    </>
  );
}