import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { clubs as divisions } from '../data/clubs';

// Fixed rotations & offsets for each card slot in the pile
const PILE = [
  { rotate:  -7, x:   0, y:  0 },
  { rotate:   4, x:  -8, y:  6 },
  { rotate:  -2, x:   9, y: -5 },
  { rotate:   8, x:  -5, y:  10},
  { rotate:  -5, x:  11, y:  2 },
];

const lerp = (a, b, t) => a + (b - a) * t;

export default function Divisions() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(null);
  const [hovered, setHovered]   = useState(null);
  const [frontIdx, setFrontIdx] = useState(0);
  const intervalRef = useRef(null);

  // Cursor-follow refs
  const pileRef   = useRef(null);
  const mouse     = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos       = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafRef    = useRef(null);
  const hoveredRef = useRef(null);

  // Keep hoveredRef in sync
  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

  // Global mouse tracker
  useEffect(() => {
    const onMove = e => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // RAF lerp loop
  useEffect(() => {
    const tick = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.1);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.1);
      if (pileRef.current) {
        pileRef.current.style.left = pos.current.x + 'px';
        pileRef.current.style.top  = pos.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Auto-cycle cards while hovered (count based on actual images for that club)
  useEffect(() => {
    if (hovered !== null) {
      const count = divisions[hovered].images.length;
      if (count > 1) {
        intervalRef.current = setInterval(() => {
          setFrontIdx(prev => (prev + 1) % count);
        }, 200);
      }
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered]);

  return (
    <section className="divisions" id="divisions">
      {/* ── Stacked card pile (fixed, centered in viewport) ── */}
      <AnimatePresence>
        {hovered !== null && (
          <motion.div
            ref={pileRef}
            className="div-pile"
            key={hovered}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            {divisions[hovered].images.map((src, cardIdx) => {
              const count = divisions[hovered].images.length;
              const slot = (cardIdx - frontIdx + count) % count;
              const isFront = slot === 0;
              const pile = PILE[slot % PILE.length];
              return (
                <motion.img
                  key={cardIdx}
                  src={src}
                  alt=""
                  className="div-pile-card"
                  animate={{
                    rotate: isFront ? 0 : pile.rotate,
                    x: isFront ? 0 : pile.x,
                    y: isFront ? 0 : pile.y,
                    zIndex: count - slot,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="div-header-row">
        <div className="div-nav-label">Our Structure</div>
        <div className="div-count-badge">2025–26 Tenure</div>
      </div>

      <div className="divisions-list">
        {divisions.map((d, i) => (
          <div
            key={d.num}
            className={hovered !== null && hovered !== i ? 'div-row-outer is-muted' : 'div-row-outer'}
          >
            <motion.div
              className="div-row"
              onHoverStart={() => { setHovered(i); setFrontIdx(0); }}
              onHoverEnd={() => setHovered(null)}
              onClick={() => navigate(`/divisions/${d.slug}`)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0 },
                show:   { opacity: 1, transition: { duration: 0.4, delay: i * 0.04 } },
              }}
            >
              <div className="div-row-content">
                <div className="div-line-mask">
                  <motion.span
                    className="div-row-name"
                    variants={{
                      hidden: { y: '110%' },
                      show:   { y: 0, transition: { duration: 0.65, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    {d.name}
                  </motion.span>
                </div>

                <motion.span
                  className="div-row-badge"
                  initial={false}
                  animate={hovered === i ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {d.badge}
                </motion.span>
              </div>

              <motion.span
                className="div-row-arrow"
                animate={hovered === i ? { rotate: -45 } : { rotate: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                ↗
              </motion.span>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
