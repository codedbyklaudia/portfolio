import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.scss';

import CursorTrail     from './components/CursorTrail';
import Loader           from './components/Loader';
import Nav              from './components/Nav';
import Dock             from './components/Dock';
import Hero             from './components/Hero';
import ProjectsFolder   from './components/ProjectsFolder';
import About            from './components/About';
import SkillsStrip      from './components/SkillsStrip';
import Contact          from './components/Contact';
import Footer           from './components/Footer';
import ContactCurtain   from './components/ContactCurtain';
import ProjectPage      from './components/ProjectPage';
import { LanguageProvider } from './context/LanguageContext';
import { ContactStageProvider } from './context/ContactStageContext';

// Heavy assets the loader should wait for (wallpaper, folder icons, hero image)
const PRELOAD = [];

// The history entry the page was (re)loaded on: a refresh always starts at the top
const LOADED_KEY = window.history.state?.key;

function HomePage() {
  const location = useLocation();

  // Coming back from a project page: land on the Projects section instead of
  // the top (runs after the Hero has reset the scroll to 0)
  useEffect(() => {
    if (location.key === LOADED_KEY) return;
    const id = location.state?.scrollTo;
    const el = id && document.getElementById(id);
    if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
  }, [location.key]);

  return (
    <>
      <Nav />
      <Dock />
      <main>
        <Hero />
        <ProjectsFolder />
        <About />
        <SkillsStrip />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  // Lets any stylesheet react to the curtain lifting: :root[data-loaded] ...
  const handleReveal = () => {
    document.documentElement.dataset.loaded = 'true';
  };

  return (
    <LanguageProvider>
      <ContactStageProvider>
        <BrowserRouter>
          <CursorTrail />
          <Routes>
            <Route path="/"            element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectPage />} />
          </Routes>
        </BrowserRouter>
        <ContactCurtain />

        {loading && (
          <Loader
            images={PRELOAD}
            onReveal={handleReveal}
            onDone={() => setLoading(false)}
          />
        )}
      </ContactStageProvider>
    </LanguageProvider>
  );
}