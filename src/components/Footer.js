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
          <defs>
            {/* Animated flowing diagonal gradient */}
            <linearGradient id="ugac-flow" x1="0%" y1="0%" x2="200%" y2="100%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1A3A52">
                <animate attributeName="stop-color" values="#1A3A52;#2F5E7C;#1E8B8B;#4DB8A8;#1A3A52" dur="6s" repeatCount="indefinite" />
              </stop>
              <stop offset="25%" stopColor="#2F5E7C">
                <animate attributeName="stop-color" values="#2F5E7C;#1E8B8B;#4DB8A8;#1A3A52;#2F5E7C" dur="6s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" stopColor="#1E8B8B">
                <animate attributeName="stop-color" values="#1E8B8B;#4DB8A8;#1A3A52;#2F5E7C;#1E8B8B" dur="6s" repeatCount="indefinite" />
              </stop>
              <stop offset="75%" stopColor="#4DB8A8">
                <animate attributeName="stop-color" values="#4DB8A8;#1A3A52;#2F5E7C;#1E8B8B;#4DB8A8" dur="6s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" stopColor="#1A3A52">
                <animate attributeName="stop-color" values="#1A3A52;#2F5E7C;#1E8B8B;#4DB8A8;#1A3A52" dur="6s" repeatCount="indefinite" />
              </stop>
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-1 -0.5; 0 0; 1 0.5; 0 0; -1 -0.5"
                dur="6s"
                repeatCount="indefinite"
              />
            </linearGradient>

            {/* Sweeping highlight */}
            <linearGradient id="ugac-sweep" x1="0%" y1="0%" x2="100%" y2="100%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="40%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-1.5 -1; 1.5 1"
                dur="4s"
                repeatCount="indefinite"
              />
            </linearGradient>

            {/* Per-letter staggered glow */}
            <filter id="ugac-glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {letters.map((letter, idx) => (
            <g key={letter} filter="url(#ugac-glow)">
              <motion.text
                x={idx * 242.5}
                y="260"
                textLength="242.5"
                lengthAdjust="spacingAndGlyphs"
                fontFamily="'Barlow Condensed', sans-serif"
                fontWeight="600"
                fontSize="320"
                letterSpacing="-9"
                fill="url(#ugac-flow)"
                onMouseEnter={() => setHoveredLetter(letter)}
                onMouseLeave={() => setHoveredLetter(null)}
                style={{ cursor: 'pointer' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                {letter}
              </motion.text>
              <motion.text
                x={idx * 242.5}
                y="260"
                textLength="242.5"
                lengthAdjust="spacingAndGlyphs"
                fontFamily="'Barlow Condensed', sans-serif"
                fontWeight="600"
                fontSize="320"
                letterSpacing="-9"
                fill="url(#ugac-sweep)"
                style={{ pointerEvents: 'none' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                {letter}
              </motion.text>
            </g>
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
