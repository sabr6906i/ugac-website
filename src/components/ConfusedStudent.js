import { motion } from 'framer-motion';

const CARDS = [
  { label: 'SYLLABUS', angle: 30,  dist: 140, delay: 0.3, dur: 5.5, size: 'sm' },
  { label: 'DEADLINES', angle: 90,  dist: 155, delay: 0.5, dur: 6.2, size: 'md' },
  { label: 'CREDITS', angle: 160, dist: 130, delay: 0.7, dur: 5.0, size: 'sm' },
  { label: 'RESEARCH', angle: 220, dist: 148, delay: 0.4, dur: 6.8, size: 'md' },
  { label: 'EXAMS', angle: 310, dist: 138, delay: 0.6, dur: 5.8, size: 'sm' },
];

const SIZES = { sm: { w: 64, h: 28 }, md: { w: 72, h: 30 } };

export default function ConfusedStudent() {
  return (
    <div className="cs-section">
      <div className="cs-scene">

        {/* Radial glow behind student */}
        <motion.div
          className="cs-glow"
          animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Student SVG */}
        <motion.svg
          className="cs-student"
          viewBox="0 0 100 160"
          fill="none"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Head */}
          <circle cx="50" cy="32" r="18" fill="var(--fg)" />
          {/* Hair tuft */}
          <path d="M36 22 Q42 8 50 14 Q58 8 64 22" fill="var(--fg)" />

          {/* Eyes — looking side to side */}
          <motion.g
            animate={{ x: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="43" cy="31" rx="2" ry="2.2" fill="var(--bg)" />
            <ellipse cx="57" cy="31" rx="2" ry="2.2" fill="var(--bg)" />
          </motion.g>

          {/* Eyebrows — worried */}
          <motion.g
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          >
            <path d="M38 25 Q43 22 48 25" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M52 25 Q57 22 62 25" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          </motion.g>

          {/* Mouth — small frown */}
          <path d="M44 40 Q50 37 56 40" stroke="var(--bg)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />

          {/* Neck */}
          <rect x="45" y="50" width="10" height="8" rx="3" fill="var(--fg)" />

          {/* Body — smooth shape */}
          <path
            d="M30 58 Q30 54 38 54 L62 54 Q70 54 70 58 L72 105 Q72 110 66 110 L34 110 Q28 110 28 105 Z"
            fill="var(--fg)"
          />

          {/* Left arm — raised in confusion */}
          <motion.g
            animate={{ rotate: [-3, 6, -3] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '30px 62px' }}
          >
            <path d="M30 62 Q16 68 12 58 Q10 52 16 50" stroke="var(--fg)" strokeWidth="8" strokeLinecap="round" fill="none" />
          </motion.g>

          {/* Right arm — scratching head */}
          <motion.g
            animate={{ rotate: [2, -5, 2] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            style={{ transformOrigin: '70px 62px' }}
          >
            <path d="M70 62 Q82 56 78 44 Q76 38 68 40" stroke="var(--fg)" strokeWidth="8" strokeLinecap="round" fill="none" />
          </motion.g>

          {/* Laptop */}
          <rect x="28" y="108" width="44" height="4" rx="2" fill="var(--fg-muted)" />
          <rect x="32" y="98" width="36" height="12" rx="3" fill="var(--fg-subtle)" stroke="var(--fg-muted)" strokeWidth="0.7" />
          <motion.rect
            x="36" y="100" width="28" height="7" rx="1.5"
            fill="var(--accent-blue)"
            animate={{ opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Legs */}
          <rect x="34" y="114" width="12" height="32" rx="5" fill="var(--fg)" />
          <rect x="54" y="114" width="12" height="32" rx="5" fill="var(--fg)" />

          {/* Feet */}
          <rect x="30" y="142" width="20" height="7" rx="3.5" fill="var(--fg)" />
          <rect x="50" y="142" width="20" height="7" rx="3.5" fill="var(--fg)" />
        </motion.svg>

        {/* Floating question marks */}
        <motion.span
          className="cs-qmark cs-qmark--1"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 1.0 }}
        >
          <motion.span
            animate={{ y: [0, -6, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >?</motion.span>
        </motion.span>

        <motion.span
          className="cs-qmark cs-qmark--2"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 1.3 }}
        >
          <motion.span
            animate={{ y: [0, -5, 0], rotate: [0, -6, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >?</motion.span>
        </motion.span>

        <motion.span
          className="cs-qmark cs-qmark--3"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 1.6 }}
        >
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >?</motion.span>
        </motion.span>

        {/* Orbiting thought cards — use CSS keyframes for smooth circular orbit */}
        {CARDS.map((card, i) => {
          const rad = (card.angle * Math.PI) / 180;
          const sz = SIZES[card.size];
          return (
            <motion.div
              key={i}
              className="cs-card"
              style={{
                width: sz.w,
                height: sz.h,
                '--orbit-x': `${Math.cos(rad) * card.dist}px`,
                '--orbit-y': `${Math.sin(rad) * card.dist * 0.5}px`,
                animationDuration: `${card.dur}s`,
                animationDelay: `${card.delay}s`,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: card.delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {card.label}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
