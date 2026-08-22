import { createContext, useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from './LanguageContext';

const WORD_ROTATE_MS = 2600;

const SEL_SALMON = '.ct-salmon';
const SEL_WHITE  = '.ct-white';
const SEL_MASK   = '.ct-mask';

const MIN_H     = 88;
const MIN_INSET = 16;

const SIDE_INSET = '15%';
const HIDDEN = { yPercent: -100 }; 
const LANDED = { yPercent: 0 }; 

const NARROW = { left: SIDE_INSET, right: SIDE_INSET, borderRadius: 24 };
const WIDE = { left: '0%', right: '0%', borderRadius: 0 };

function getMinimized() {
  return {
    top: `${window.innerHeight - MIN_H}px`,
    left: `${MIN_INSET}px`, right: `${MIN_INSET}px`, bottom: `${MIN_INSET}px`,
    borderRadius: 20,
  };
}

const ContactStageContext = createContext(null);

export function ContactStageProvider({ children }) {
  const { t } = useLanguage();
  const [stage, setStage] = useState('intro');
  const [wordIndex, setWordIndex] = useState(0);

  const directionRef = useRef('in');

  const words = t('contact.title3Words');
  const displayWord = Array.isArray(words) ? words[wordIndex] : t('contact.title3');

  const isTakeover = stage === 'transitioning' || stage === 'form';

  useEffect(() => {
    document.body.style.overflow = isTakeover ? 'hidden' : '';
    if (isTakeover) {
      window.lenis?.stop?.();
    } else {
      window.lenis?.start?.();
    }
    return () => { document.body.style.overflow = ''; };
  }, [isTakeover]);

  // Rotate the headline's last word once the form has settled in.
  useEffect(() => {
    if (stage !== 'form' || !Array.isArray(words)) return;
    const id = setInterval(() => setWordIndex(i => (i + 1) % words.length), WORD_ROTATE_MS);
    return () => clearInterval(id);
  }, [stage, words]);

  const handleTalkClick = () => {
    gsap.killTweensOf([SEL_SALMON, SEL_WHITE, SEL_MASK]);
    gsap.set([SEL_SALMON, SEL_WHITE], { clearProps: 'all' });
    gsap.set(SEL_MASK, { opacity: 0 });

    directionRef.current = 'in';

    window.lenis?.stop?.();
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0 });
    setStage('transitioning');
    gsap.set(SEL_SALMON, { ...HIDDEN, ...NARROW, zIndex: 600 });
    gsap.set(SEL_WHITE,  { ...HIDDEN, ...NARROW, zIndex: 590 });

    gsap.timeline({ defaults: { ease: 'power2.inOut' } })
      .to('.contact-cta', { opacity: 0, duration: 0.3 })
      
      .to(SEL_SALMON, { ...LANDED, duration: 0.7 }, '-=0.1')
   
      .set(SEL_WHITE, { ...LANDED })
      
      .to(SEL_SALMON, { ...getMinimized(), duration: 0.65 }, '+=0.15')
      
      .to(SEL_WHITE, { ...WIDE, duration: 0.5 }, '+=0.1')
      .add(() => setStage('form'), '-=0.1');
  };

  const handleBackClick = () => {
    gsap.killTweensOf([SEL_SALMON, SEL_WHITE, SEL_MASK]);
    directionRef.current = 'out';
    setStage('transitioning');

    gsap.timeline({ defaults: { ease: 'power2.inOut' } })
      .to('.contact-back', { opacity: 0, duration: 0.2 })
      .to(SEL_WHITE, { ...NARROW, duration: 0.45 }, '<')
      .to(SEL_SALMON, { ...LANDED, ...NARROW, top: '0%', bottom: '0%', duration: 0.55 }, '-=0.1')
      .add(() => gsap.set(SEL_MASK, { opacity: 1 }))
      .to(SEL_SALMON, { ...HIDDEN, duration: 0.6 }, '+=0.05')
      .add(() => {

        const contactEl = document.getElementById('contact');
        const targetTop = contactEl
          ? contactEl.getBoundingClientRect().top + window.scrollY
          : 0;

        if (window.lenis?.scrollTo) {
          window.lenis.scrollTo(targetTop, { immediate: true });
        } else {
          window.scrollTo({ top: targetTop });
        }
        document.body.style.overflow = '';
        window.lenis?.start?.();
        setStage('intro');
        requestAnimationFrame(() => {
          gsap.set([SEL_SALMON, SEL_WHITE], { clearProps: 'all' });
          gsap.to(SEL_MASK, { opacity: 0, duration: 0.35, delay: 0.05 });
        });
      });
  };

  const showCta  = stage === 'intro' || (stage === 'transitioning' && directionRef.current === 'in');
  const showBack = stage === 'form'  || (stage === 'transitioning' && directionRef.current === 'out');

  const value = {
    stage, setStage,
    isTakeover,
    wordIndex, displayWord,
    showCta, showBack,
    handleTalkClick, handleBackClick,
  };

  return (
    <ContactStageContext.Provider value={value}>
      {children}
    </ContactStageContext.Provider>
  );
}

export function useContactStage() {
  return useContext(ContactStageContext);       
}