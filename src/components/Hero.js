import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';

const HERO_BASE = '/images/hero/';

// Save your photos as public/images/hero/1.jpg → 8.jpg in this order:
// 1 = Foggy aerial sunrise, 2 = Corridor vanishing point, 3 = Overhead cycling road
// 4 = Empty classroom, 5 = Engineering books, 6 = Sports dome aerial
// 7 = Powai Lake dusk, 8 = Laptop at night
const SLIDES = [
  { src: `${HERO_BASE}1.png`, location: 'IIT Bombay', caption: 'Dawn over Powai' },
  { src: `${HERO_BASE}2.png`, location: 'Main Walkway', caption: 'Spaces of Learning' },
  { src: `${HERO_BASE}3.png`, location: 'Campus Road', caption: 'Life in Motion' },
  { src: `${HERO_BASE}4.png`, location: 'Lecture Hall', caption: 'Knowledge at Core' },
  { src: `${HERO_BASE}5.png`, location: 'Study Desk', caption: 'Deep & Focused' },
  { src: `${HERO_BASE}6.png`, location: 'Sports Complex', caption: 'Built for Excellence' },
  { src: `${HERO_BASE}7.png`, location: 'Powai Lake', caption: 'Evening Reflection' },
  { src: `${HERO_BASE}8.png`, location: 'Night Hours', caption: 'The Last Light On' },
];

// Each image gets a unique Ken Burns motion direction
const KB = [
  { from: { scale: 1.12, x: '0%',  y: '0%'  }, to: { scale: 1.0,  x: '0%',  y: '0%'  } },
  { from: { scale: 1.0,  x: '-3%', y: '0%'  }, to: { scale: 1.08, x: '2%',  y: '0%'  } },
  { from: { scale: 1.08, x: '0%',  y: '2%'  }, to: { scale: 1.0,  x: '0%',  y: '-2%' } },
  { from: { scale: 1.0,  x: '2%',  y: '2%'  }, to: { scale: 1.1,  x: '-2%', y: '-2%' } },
  { from: { scale: 1.12, x: '-2%', y: '0%'  }, to: { scale: 1.02, x: '1%',  y: '0%'  } },
  { from: { scale: 1.0,  x: '3%',  y: '0%'  }, to: { scale: 1.06, x: '-2%', y: '0%'  } },
  { from: { scale: 1.06, x: '0%',  y: '-2%' }, to: { scale: 1.0,  x: '0%',  y: '2%'  } },
  { from: { scale: 1.04, x: '-1%', y: '1%'  }, to: { scale: 1.1,  x: '1%',  y: '-1%' } },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { show: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } } };

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * SLIDES.length), SLIDES.length - 1);
      setActiveIdx(idx);
    });
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="hero-scroll-container">
      <div className="hero-sticky">

        {/* ── Background crossfade + Ken Burns ── */}
        <div className="hero-bg-layer">
          <AnimatePresence mode="sync">
            <motion.div
              key={activeIdx}
              className="hero-bg-slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src={SLIDES[activeIdx].src}
                alt=""
                className="hero-bg-img"
                initial={KB[activeIdx].from}
                animate={KB[activeIdx].to}
                transition={{ duration: 10, ease: 'linear' }}
              />
            </motion.div>
          </AnimatePresence>
          <div className="hero-bg-grain" />
          <div className="hero-bg-overlay" />
        </div>

        {/* ── Slide caption bottom-left ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`meta-${activeIdx}`}
            className="hero-slide-meta"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-slide-location">{SLIDES[activeIdx].location}</div>
            <div className="hero-slide-caption">{SLIDES[activeIdx].caption}</div>
          </motion.div>
        </AnimatePresence>

        {/* ── Progress dots right ── */}
        <div className="hero-progress-dots">
          {SLIDES.map((_, i) => (
            <div key={i} className={`hero-dot${i === activeIdx ? ' active' : ''}`} />
          ))}
        </div>

        {/* ── Frame counter top-right ── */}
        <div className="hero-counter">
          <AnimatePresence mode="wait">
            <motion.span
              key={`count-${activeIdx}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="hero-counter-current"
            >
              {String(activeIdx + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          <span className="hero-counter-sep">—</span>
          <span className="hero-counter-total">{String(SLIDES.length).padStart(2, '0')}</span>
        </div>

        {/* ── Main statement ── */}
        <motion.div className="hero-center" variants={stagger} initial="hidden" animate="show">
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

          <div className="hero-bottom-row">
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
          </div>
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div
          className="hero-scroll-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <motion.div
            className="hero-scroll-line"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span>SCROLL</span>
        </motion.div>

      </div>
    </div>
  );
}
