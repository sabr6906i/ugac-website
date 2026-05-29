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
import Preloader from './components/Preloader';
const MARQUEE_TEXT = 'ACADEMIC EXCELLENCE — STUDENT LEADERSHIP — IIT BOMBAY — UGAC 2025–26 — STRENGTHENING ACADEMICS — EMPOWERING STUDENTS — ';

export default function App() {
  const cursorRef = useRef(null);
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
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
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const expand = () => cursor.classList.add('big');
    const shrink = () => cursor.classList.remove('big');
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', expand);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Routes>
      <Route path="/divisions/:slug" element={<ClubPage />} />
      <Route path="*" element={
        <div className="App">
          {!preloaderDone && <Preloader onDone={() => setPreloaderDone(true)} />}
          <div id="custom-cursor" ref={cursorRef} />
          <Navbar />
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
  );
}
