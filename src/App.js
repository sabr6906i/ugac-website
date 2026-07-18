import { useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/Features';
import Divisions from './components/Divisions';
import Stats from './components/Stats';
import Partners from './components/Partners';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ClubPage from './pages/ClubPage';
import WikiPage from './pages/WikiPage';
import Preloader from './components/Preloader';
import ChatWidget from './components/ChatWidget';
const MARQUEE_TEXT = 'ACADEMIC EXCELLENCE — STUDENT LEADERSHIP — IIT BOMBAY — UGAC 2025–26 — STRENGTHENING ACADEMICS — EMPOWERING STUDENTS — ';

export default function App() {
  const cursorRef = useRef(null);
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Scroll to hash on navigation (for cross-route nav links)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;
    let raf;
    let cx = 0, cy = 0, tx = 0, ty = 0;
    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = e => { tx = e.clientX; ty = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const tick = () => {
      cx = lerp(cx, tx, 0.14);
      cy = lerp(cy, ty, 0.14);
      cursor.style.transform = `translate(${cx - 5}px, ${cy - 5}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const expand = e => { if (e.target.closest('a, button')) cursor.classList.add('big'); };
    const shrink = e => { if (e.target.closest('a, button')) cursor.classList.remove('big'); };
    document.addEventListener('mouseover', expand);
    document.addEventListener('mouseout', shrink);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', expand);
      document.removeEventListener('mouseout', shrink);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="custom-cursor" ref={cursorRef} />
      <Navbar />
      <Routes>
        <Route path="/divisions/:slug" element={<ClubPage />} />
        <Route path="/wiki" element={<WikiPage />} />
        <Route path="*" element={
          <div className="App">
            {!preloaderDone && <Preloader onDone={() => setPreloaderDone(true)} />}
            <Hero />

          {/* Marquee strip */}
          <div className="marquee-strip" aria-hidden="true">
            <div className="marquee-track">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="marquee-text">{MARQUEE_TEXT}</span>
              ))}
            </div>
          </div>

          <About />
          <Divisions />
          <Partners />
          <Stats />
          <Team />
          <Contact />
          <Footer />
        </div>
      } />
    </Routes>
    <ChatWidget />
    </>
  );
}
