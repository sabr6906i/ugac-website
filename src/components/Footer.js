import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const navLinks = [
  { label: 'About',     href: '#about' },
  { label: 'Divisions', href: '#divisions' },
  { label: 'Team',      href: '#team' },
  { label: 'Contact',   href: '#contact' },
  { label: 'Wiki ↗',    href: 'https://ugac.gymkhana.iitb.ac.in/wiki' },
];

export default function Footer() {
  const [time, setTime] = useState('');
  const [hoveredLetter, setHoveredLetter] = useState(null);
  const giantRef = useRef(null);

  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'Asia/Kolkata',
    });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({
    target: giantRef,
    offset: ['start end', 'end end'],
  });

  const scaleY = useTransform(scrollYProgress, [0,0.0000001, 1], [0,0.0000000000001, 1]);

  const letterColors = {
    U: '#1A3A52',
    G: '#2F5E7C',
    A: '#1E8B8B',
    C: '#4DB8A8',
  };

  const letters = ['U', 'G', 'A', 'C'];
  const getLetterColor = (letter) => hoveredLetter === letter ? letterColors[letter] : 'currentColor';

  return (
    <footer className="footer">
      <nav className="footer-nav-h">
        {navLinks.map(l => (
          <a
            key={l.label}
            href={l.href}
            className="footer-nav-h-link"
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel={l.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Giant UGAC wordmark — scroll-driven vertical stretch */}
      <div className="footer-giant" ref={giantRef} aria-hidden="true">
        <motion.svg
          className="footer-giant-svg"
          viewBox="0 0 1000 280"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ scaleY, transformOrigin: '50% 0%' }}
        >
          {letters.map((letter, idx) => (
            <motion.text
              key={letter}
              x={idx * 242.5}
              y="260"
              textLength="242.5"
              lengthAdjust="spacingAndGlyphs"
              fontFamily="'Barlow Condensed', sans-serif"
              fontWeight="600"
              fontSize="320"
              letterSpacing="-9"
              fill={getLetterColor(letter)}
              onMouseEnter={() => setHoveredLetter(letter)}
              onMouseLeave={() => setHoveredLetter(null)}
              animate={{ fill: getLetterColor(letter) }}
              transition={{ duration: 0.2 }}
              style={{ cursor: 'pointer' }}
            >
              {letter}
            </motion.text>
          ))}
        </motion.svg>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2025–26 Undergraduate Academic Council, IIT Bombay</span>
        <div className="footer-clock">
          <span className="footer-clock-city">MUMBAI, INDIA</span>
          <span className="footer-clock-time">{time}</span>
        </div>
        <span className="footer-built">Built by UGAC Web Team</span>
      </div>
    </footer>
  );
}
