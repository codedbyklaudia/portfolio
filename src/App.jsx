import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import CursorTrail     from './components/CursorTrail';
import Nav              from './components/Nav';
import Hero             from './components/Hero';
import ProjectsFolder   from './components/ProjectsFolder';
import About            from './components/About';
import Contact          from './components/Contact';
import Footer           from './components/Footer';
import ContactCurtain   from './components/ContactCurtain';
import ProjectPage      from './components/ProjectPage';
import { LanguageProvider } from './context/LanguageContext';
import { ContactStageProvider } from './context/ContactStageContext';

function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProjectsFolder />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
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
      </ContactStageProvider>
    </LanguageProvider>
  );
}