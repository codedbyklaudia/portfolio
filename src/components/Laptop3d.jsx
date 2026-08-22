// Laptop3D.jsx
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center, Html } from '@react-three/drei';
import * as THREE from 'three';

const BASE_SCALE = 10;
const GROWTH     = 6;
const SCREEN = {
  y: 0,
  z: 0.31,
  rotX: -0.32,
  domW: 900,
  factor: 1.05,
};

const DESK_CFG = {
  targetWidth: 9,
  worldPos: [0, -1.5, -1.8],
  rotationY: Math.PI / 2,   
  widthAxis: 'z',         
  anchor: 'top',
};
const LAMP_CFG = {
  targetWidth: 3,
  worldPos: [3.4, -1.5, -1.5],
  rotationY: -0.5,
  widthAxis: 'x',
  anchor: 'bottom',
};
const BOOKS_CFG = {
  targetWidth: 3.5,
  worldPos: [-3.8, -1.5, -5],
  rotationY: 0.1, 
  widthAxis: 'x',
  anchor: 'bottom',
};

const MUG_CFG = {
  targetWidth: 1.5,              
  worldPos: [-2.6, -1.5, -0.4], 
  rotationY: 3.6,
  widthAxis: 'x',
  anchor: 'bottom',
};

const DESKTOP_FOLDERS = [
  { name: 'BarkBuddy App',  color: '#6B4FA0' },
  { name: 'BarkBuddy Web',  color: '#8B6FBB' },
  { name: "Henry N'Guetta", color: '#C95B2A' },
  { name: 'CodedByKlaudia', color: '#3A7A6A' },
  { name: 'Synapse 2066',   color: '#457B9D' },
  { name: 'Pyramid Null',   color: '#C8952A' },
];

function MiniFolder({ color }) {
  return (
    <svg viewBox="0 0 48 40" className="lh-mini-folder-svg">
      <rect x="0" y="8" width="48" height="32" rx="4" fill={color} opacity="0.75"/>
      <path d="M0 8 Q0 4 4 4 L17 4 Q20 4 22 7 L24 10 L0 10 Z" fill={color} opacity="0.75"/>
      <rect x="0" y="11" width="48" height="29" rx="4" fill={color}/>
    </svg>
  );
}

export function LiveClock() {
  const [t, setT] = useState('');
  const [d, setD] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setT(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
      setD(now.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }));
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);
  return <span>{d} {t}</span>;
}

function GroupScale({ groupRef, progressRef }) {
  useFrame(() => {
    if (!groupRef.current) return;
    const p = progressRef?.current ?? 0;
    const s = BASE_SCALE + p * GROWTH;
    groupRef.current.scale.setScalar(s);
  });
  return null;
}

function useAutoFit(scene, { targetWidth, worldPos, rotationY = 0, widthAxis = 'x', anchor = 'bottom' }) {
  const [transform, setTransform] = useState(null);

  useEffect(() => {
    if (!scene) return;

    const localBox = new THREE.Box3().setFromObject(scene);
    const corners = [];
    for (const x of [localBox.min.x, localBox.max.x]) {
      for (const y of [localBox.min.y, localBox.max.y]) {
        for (const z of [localBox.min.z, localBox.max.z]) {
          corners.push(new THREE.Vector3(x, y, z));
        }
      }
    }
    const rotMatrix = new THREE.Matrix4().makeRotationY(rotationY);
    const rotatedBox = new THREE.Box3();
    corners.forEach(c => rotatedBox.expandByPoint(c.applyMatrix4(rotMatrix)));

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    rotatedBox.getSize(size);
    rotatedBox.getCenter(center);

    const dimension = widthAxis === 'z' ? size.z : size.x;
    const scale = targetWidth / dimension;
    const anchorY = anchor === 'top' ? rotatedBox.max.y : rotatedBox.min.y;

    const position = [
      worldPos[0] - center.x * scale,
      worldPos[1] - anchorY * scale,
      worldPos[2] - center.z * scale,
    ];

    setTransform({ scale, position });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, targetWidth, worldPos[0], worldPos[1], worldPos[2], rotationY, widthAxis, anchor]);

  return transform;
}

function Desk() {
  const { scene } = useGLTF('/models/desk.glb');
  const fit = useAutoFit(scene, DESK_CFG);
  if (!fit) return null;
  return (
    <primitive
      object={scene}
      position={fit.position}
      scale={fit.scale}
      rotation={[0, DESK_CFG.rotationY, 0]}
    />
  );
}

function Lamp() {
  const { scene } = useGLTF('/models/lamp.glb');
  const fit = useAutoFit(scene, LAMP_CFG);
  if (!fit) return null;
  return (
    <primitive
      object={scene}
      position={fit.position}
      scale={fit.scale}
      rotation={[0, LAMP_CFG.rotationY, 0]}
    />
  );
}

function Books() {
  const { scene } = useGLTF('/models/books.glb');
  const fit = useAutoFit(scene, BOOKS_CFG);
  if (!fit) return null;
  return (
    <primitive
      object={scene}
      position={fit.position}
      scale={fit.scale}
      rotation={[0, BOOKS_CFG.rotationY, 0]}
    />
  );
}

function Mug() {
  const { scene } = useGLTF('/models/mug.glb');
  const fit = useAutoFit(scene, MUG_CFG);
  if (!fit) return null;
  return (
    <primitive
      object={scene}
      position={fit.position}
      scale={fit.scale}
      rotation={[0, MUG_CFG.rotationY, 0]}
    />
  );
}

function ScreenDock() {
  return (
    <div className="lh-screen-dock">
      <div className="lh-screen-dock-icon lh-screen-dock-icon--finder">
        <svg viewBox="0 0 30 30" fill="none">
          <path d="M15 4 C10 4 7 8 6.5 15 C6.2 19 6.5 23 7 26 L15 26 Z" fill="rgba(255,255,255,0.9)"/>
          <path d="M15 4 C20 4 23 8 23.5 15 C23.8 19 23.5 23 23 26 L15 26 Z" fill="rgba(255,255,255,0.55)"/>
          <path d="M10.5 12 v2.5 M19.5 12 v2.5" stroke="#1B4F9C" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M9 19 q6 4 12 0" stroke="#1B4F9C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="lh-screen-dock-icon lh-screen-dock-icon--safari">
        <svg viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="10.5" fill="rgba(255,255,255,0.92)"/>
          <path d="M20.5 9.5 L16.5 16.5 L9.5 20.5 L13.5 13.5 Z" fill="#E63B2E"/>
          <path d="M9.5 20.5 L16.5 16.5 L13.5 13.5 Z" fill="#B0B5BD"/>
        </svg>
      </div>
      <div className="lh-screen-dock-icon lh-screen-dock-icon--mail">
        <svg viewBox="0 0 30 30" fill="none">
          <rect x="5" y="8" width="20" height="14" rx="2.5" fill="rgba(255,255,255,0.95)"/>
          <path d="M5.5 9.5 L15 17 L24.5 9.5" stroke="#2E7CF6" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="lh-screen-dock-icon lh-screen-dock-icon--photos">
        <svg viewBox="0 0 30 30" fill="none">
          {[0,45,90,135,180,225,270,315].map((a,i) => (
            <ellipse key={a} cx="15" cy="9.5" rx="2.6" ry="5"
              fill={['#F5C242','#F2842C','#E8452C','#D8308C','#7A3CC8','#2E64D8','#2CA6E8','#3CC85A'][i]}
              opacity="0.85" transform={`rotate(${a} 15 15)`}/>
          ))}
        </svg>
      </div>
      <div className="lh-screen-dock-icon lh-screen-dock-icon--terminal">
        <svg viewBox="0 0 30 30" fill="none">
          <rect x="4.5" y="5.5" width="21" height="19" rx="4" fill="#1E1E24"/>
          <path d="M9 12 l3.5 3 L9 18" stroke="#3CC85A" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 18 h6" stroke="#EAEAEA" strokeWidth="1.7" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="lh-screen-dock-sep" />
      <div className="lh-screen-dock-icon lh-screen-dock-icon--trash">
        <svg viewBox="0 0 30 30" fill="none">
          <path d="M9.5 10 h11 l-1 14 a2 2 0 01-2 1.8 h-5 a2 2 0 01-2-1.8 Z" fill="rgba(255,255,255,0.75)"/>
          <rect x="8" y="7.5" width="14" height="2.2" rx="1.1" fill="rgba(255,255,255,0.9)"/>
          <rect x="12.5" y="5.5" width="5" height="2.4" rx="1" fill="rgba(255,255,255,0.9)"/>
        </svg>
      </div>
    </div>
  );
}

function Scene({ progressRef }) {
  const { scene } = useGLTF('/models/laptop.glb');
  const groupRef = useRef(null);

  return (
    <>
      <Desk />
      <Lamp />
      <Books />
      <Mug />

      <group ref={groupRef} scale={BASE_SCALE}>
        <Center>
          <primitive object={scene} />
        </Center>
        <Html
          transform
          position={[0, SCREEN.y / BASE_SCALE, SCREEN.z / BASE_SCALE]}
          rotation={[SCREEN.rotX, 0, 0]}
          distanceFactor={SCREEN.factor / BASE_SCALE}
          style={{ width: SCREEN.domW + 'px', pointerEvents: 'none' }}
          zIndexRange={[10, 0]}
        >
          <div className="lh-screen-dom lh-screen-dom--in3d">
            <div className="lh-screen-vignette" />
            <div className="lh-menubar">
              <div className="lh-menubar-left">
                <img src="/images/codedbyklaudia_logo.png" alt="" className="lh-menu-logo-img" />
                <span className="lh-menu-item lh-menu-item--bold">codedbyKlaudia</span>
                <span className="lh-menu-item">File</span>
                <span className="lh-menu-item">Edit</span>
                <span className="lh-menu-item">View</span>
              </div>
              <div className="lh-menubar-right">
                <svg className="lh-menu-icon" viewBox="0 0 16 12" fill="none">
                  <path d="M8 10.5a1.2 1.2 0 100 .01M4.5 7.8a5 5 0 017 0M1.8 5a9 9 0 0112.4 0"
                    stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <LiveClock />
              </div>
            </div>
            <div className="lh-desktop">
              <div className="lh-folder-grid">
                {DESKTOP_FOLDERS.map(f => (
                  <div key={f.name} className="lh-mini-folder">
                    <MiniFolder color={f.color} />
                    <span className="lh-mini-folder-label">{f.name}</span>
                  </div>
                ))}
              </div>
              <div className="lh-screen-hint">
                <div className="lh-win-bar">
                  <span className="lh-win-dot lh-win-dot--r" />
                  <span className="lh-win-dot lh-win-dot--y" />
                  <span className="lh-win-dot lh-win-dot--g" />
                  <span className="lh-win-title">codedbyklaudia.portfolio</span>
                </div>
                <div className="lh-win-body">
                  <p className="lh-win-hi">Hello there!</p>
                  <p className="lh-win-sub">
                    You're looking at my desktop - <br/>
                    scroll to step inside the portfolio.
                  </p>
                  <div className="lh-mouse"><div className="lh-mouse-wheel" /></div>
                  <span className="lh-win-cta">scroll down</span>
                </div>
              </div>
              <ScreenDock />
            </div>
          </div>
        </Html>
        <GroupScale groupRef={groupRef} progressRef={progressRef} />
      </group>
    </>
  );
}

export default function Laptop3D({ progressRef }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 6], fov: 35 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 6, 4]}  intensity={1.4} />
      <directionalLight position={[-4, 2, 2]} intensity={0.5} />
      <pointLight position={[3, -0.6, -1.3]} intensity={1.1} color="#FFD98E" distance={5} />
      <Suspense fallback={null}>
        <Scene progressRef={progressRef} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload('/models/laptop.glb');
useGLTF.preload('/models/desk.glb');
useGLTF.preload('/models/lamp.glb');
useGLTF.preload('/models/books.glb');
useGLTF.preload('/models/mug.glb');