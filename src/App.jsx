import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import CursorTrail     from './components/CursorTrail';
import Loader           from './components/Loader';
import Nav              from './components/Nav';
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

function HomePage() {
  return (
    <>
      <Nav />
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