import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';

const HERO_BASE = '/images/hero/';

const SLIDES = [
  { src: `${HERO_BASE}10.jpg`, location: 'Sameer Hill', caption: 'A View From Above' },
  { src: `${HERO_BASE}2.webp`, location: 'Main Walkway', caption: 'Spaces of Learning' },
  { src: `${HERO_BASE}3.webp`, location: 'Campus Road', caption: 'Life in Motion' },
  { src: `${HERO_BASE}4.png`, location: 'Lecture Hall', caption: 'Knowledge at Core' },
  { src: `${HERO_BASE}5.png`, location: 'Study Desk', caption: 'Deep & Focused' },
  { src: `${HERO_BASE}6.png`, location: 'Sports Complex', caption: 'Built for Excellence' },
  { src: `${HERO_BASE}7.png`, location: 'Powai Lake', caption: 'Evening Reflection' },
  { src: `${HERO_BASE}8.png`, location: 'Night Hours', caption: 'The Last Light On' },
  { src: `${HERO_BASE}9.jpg`, location: 'Campus Greens', caption: 'Where It All Begins' },
  { src: `${HERO_BASE}1.jpg`, location: 'IIT Bombay', caption: 'Dawn over Powai' },
  { src: `${HERO_BASE}11.jpg`, location: 'Sameer Hill', caption: 'The Panorama' },
  { src: `${HERO_BASE}12.png`, location: 'IIT Bombay', caption: 'A World of Its Own' },
];

const KB = [
  { from: { scale: 1.08, x: '0%', y: '-2%' }, to: { scale: 1.02, x: '2%', y: '0%' } },
  { from: { scale: 1.0, x: '-3%', y: '0%' }, to: { scale: 1.08, x: '2%', y: '0%' } },
  { from: { scale: 1.08, x: '0%', y: '2%' }, to: { scale: 1.0, x: '0%', y: '-2%' } },
  { from: { scale: 1.0, x: '2%', y: '2%' }, to: { scale: 1.1, x: '-2%', y: '-2%' } },
  { from: { scale: 1.12, x: '-2%', y: '0%' }, to: { scale: 1.02, x: '1%', y: '0%' } },
  { from: { scale: 1.0, x: '3%', y: '0%' }, to: { scale: 1.06, x: '-2%', y: '0%' } },
  { from: { scale: 1.06, x: '0%', y: '-2%' }, to: { scale: 1.0, x: '0%', y: '2%' } },
  { from: { scale: 1.04, x: '-1%', y: '1%' }, to: { scale: 1.1, x: '1%', y: '-1%' } },
  { from: { scale: 1.0, x: '1%', y: '-1%' }, to: { scale: 1.08, x: '-1%', y: '1%' } },
  { from: { scale: 1.12, x: '0%', y: '0%' }, to: { scale: 1.0, x: '0%', y: '0%' } },
  { from: { scale: 1.0, x: '-2%', y: '1%' }, to: { scale: 1.1, x: '1%', y: '-1%' } },
  { from: { scale: 1.1, x: '1%', y: '0%' }, to: { scale: 1.0, x: '-1%', y: '0%' } },
];

const INTERVAL = 4500;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } } };

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIdx(i => (i + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL);
    return () => clearInterval(id);
  }, [next, paused]);

  return (
    <section className="hero-section">
      <div className="hero-inner">

        {/* ── Left: Slideshow box ── */}
        <div
          className="hero-slideshow"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="hero-slideshow-frame">
            <AnimatePresence mode="sync">
              <motion.div
                key={activeIdx}
                className="hero-slide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.img
                  src={SLIDES[activeIdx].src}
                  alt={SLIDES[activeIdx].caption}
                  className="hero-slide-img"
                  decoding="async"
                  initial={KB[activeIdx].from}
                  animate={KB[activeIdx].to}
                  transition={{ duration: 10, ease: 'linear' }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Caption overlay */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`cap-${activeIdx}`}
                className="hero-slide-caption-overlay"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45 }}
              >
                <span className="hero-slide-location-tag">{SLIDES[activeIdx].location}</span>
                <span className="hero-slide-caption-text">{SLIDES[activeIdx].caption}</span>
              </motion.div>
            </AnimatePresence>

            {/* Frame counter */}
            <div className="hero-frame-counter">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`num-${activeIdx}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  {String(activeIdx + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              <span className="hero-frame-sep">/</span>
              <span>{String(SLIDES.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Progress dots */}
          <div className="hero-slideshow-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`hero-sdot${i === activeIdx ? ' hero-sdot--active' : ''}`}
                onClick={() => setActiveIdx(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Right: Text ── */}
        <motion.div className="hero-text" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="hero-eyebrow">
            Undergraduate Academic Council · IIT Bombay · Tenure 2025–26
          </motion.div>

          <SplitTextReveal
            as="h1"
            className="hero-headline"
            lines={['We Bridge', 'Students &', 'Faculty']}
            amount={0.2}
            delay={0.15}
          />

          <motion.p variants={fadeUp} className="hero-desc">
            Bridging students, faculty, and industry through 10 specialized divisions — from career guidance and research to consulting, finance, and beyond.
          </motion.p>

          <motion.div variants={fadeUp} className="hero-actions">
            <a href="#divisions" className="btn-primary">Explore Divisions →</a>
            <a href="#about" className="btn-ghost">Our Mission</a>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-stats">
            <div>
              <div className="hero-stat-num">10</div>
              <div className="hero-stat-label">Divisions</div>
            </div>
            <div>
              <div className="hero-stat-num">17</div>
              <div className="hero-stat-label">Leaders</div>
            </div>
            <div>
              <div className="hero-stat-num">6K+</div>
              <div className="hero-stat-label">Students Reached</div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
