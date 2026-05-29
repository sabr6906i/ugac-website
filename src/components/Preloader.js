import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onDone }) {
  const [count, setCount]     = useState(0);
  const [exiting, setExiting] = useState(false);

  // Tick counter 0→100 over ~2s, then trigger exit
  useEffect(() => {
    let start = null;
    const DURATION = 2000;

    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / DURATION, 1);
      // Ease-out curve so it slows near 100
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * 100));
      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(100);
        setTimeout(() => setExiting(true), 300);
      }
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!exiting && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* UGAC wordmark — clips up from baseline */}
          <div className="preloader-wordmark-wrap" aria-hidden="true">
            <motion.div
              className="preloader-wordmark"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              UGAC
            </motion.div>
          </div>

          {/* Bottom bar: label + counter */}
          <motion.div
            className="preloader-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <span className="preloader-label">
              Undergraduate Academic Council<br />
              IIT Bombay — 2025–26
            </span>
            <span className="preloader-count">{String(count).padStart(3, '0')}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
