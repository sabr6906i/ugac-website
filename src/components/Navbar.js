import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Divisions', href: '#divisions' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className="navbar">
        <a href="#top" className="nav-logo-link">UGAC</a>

        <button className="nav-dark-btn" onClick={() => setDark(d => !d)}>
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>

        <button className="nav-menu-btn" onClick={() => setOpen(true)}>Menu</button>

        <a href="#contact" className="nav-cta">Get Involved!</a>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu-overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            <button className="menu-close-btn" onClick={() => setOpen(false)}>
              Close X
            </button>

            <div className="menu-links">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  className="menu-link"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>{l.label}</span>
                  <span className="menu-link-arrow">-&gt;</span>
                </motion.a>
              ))}
            </div>

            <div className="menu-footer">
              <span>2025-26 UGAC - IIT Bombay</span>
              <span>gsecaaug@iitb.ac.in</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
