import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const hoverSets = {
  course: [
    { src: '/images/ugac-posts-hover/consult-poster.webp', alt: 'Consult Club post' },
    { src: '/images/ugac-posts-hover/enpower-poster.jpg', alt: 'EnPoWER post' },
    { src: '/images/ugac-posts-hover/sss-poster.jpg', alt: 'Student Support Services post' },
  ],
  opportunity: [
    { src: '/images/ugac-posts-hover/career-poster.webp', alt: 'Career Cell post' },
    { src: '/images/ugac-posts-hover/investment-02.jpg', alt: 'Investment Team post' },
    { src: '/images/ugac-posts-hover/ugac-main.jpg', alt: 'UGAC post' },
  ],
  growth: [
    { src: '/images/ugac-posts-hover/sss-02.jpg', alt: 'Student Support Services post' },
    { src: '/images/ugac-posts-hover/investment-01.jpg', alt: 'Investment Team post' },
    { src: '/images/ugac-posts-hover/career-02.webp', alt: 'Career Cell post' },
  ],
  research: [
    { src: '/images/ugac-posts-hover/enpower-02.webp', alt: 'EnPoWER post' },
    { src: '/images/ugac-posts-hover/investment-03.jpg', alt: 'Investment Team follow-up post' },
    { src: '/images/ugac-posts-hover/consult-02.webp', alt: 'Consult Club follow-up post' },
  ],
};

const floatingPositions = [
  { x: '-8vw', y: '-12vh', rotate: -7 },
  { x: '10vw', y: '-5vh', rotate: 5 },
  { x: '1vw', y: '12vh', rotate: -2 },
];

const lineVariants = {
  hidden: { y: 42, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

function HoverWord({ id, children, setActive }) {
  return (
    <button
      type="button"
      className="about-hover-word"
      onMouseEnter={() => setActive(id)}
      onFocus={() => setActive(id)}
      onClick={() => setActive(active => active === id ? null : id)}
    >
      {children}
    </button>
  );
}

function FloatingPosts({ active }) {
  const reduceMotion = useReducedMotion();
  const images = active ? hoverSets[active] : [];

  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.div
          key={active}
          className={`about-post-float about-post-float-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.18 }}
          aria-hidden="true"
        >
          {images.map((image, index) => (
            <motion.img
              key={image.src}
              className="about-post-img"
              src={image.src}
              alt={image.alt}
              loading="lazy"
              initial={reduceMotion ? false : {
                opacity: 0,
                scale: 0.78,
                x: 0,
                y: 24,
                rotate: 0,
              }}
              animate={reduceMotion ? {} : {
                opacity: 1,
                scale: 1,
                x: floatingPositions[index].x,
                y: floatingPositions[index].y,
                rotate: floatingPositions[index].rotate,
              }}
              exit={reduceMotion ? {} : {
                opacity: 0,
                scale: 0.82,
                y: 18,
                rotate: 0,
              }}
              transition={{
                duration: 0.48,
                delay: index * 0.055,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StudentIllustration() {
  return (
    <motion.div
      className="cs-inline"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg viewBox="0 0 240 420" fill="none" className="cs-svg">

        {/* Shadow on ground */}
        <ellipse cx="120" cy="405" rx="52" ry="8" fill="var(--fg)" opacity="0.08" />

        {/* Left leg */}
        <path d="M92 272 L86 370 Q86 382 96 382 L104 382 Q110 382 110 374 L106 272" fill="var(--fg)" />
        {/* Right leg */}
        <path d="M134 272 L130 370 Q130 382 140 382 L148 382 Q154 382 154 374 L148 272" fill="var(--fg)" />

        {/* Left shoe */}
        <path d="M80 374 Q76 374 74 378 L74 390 Q74 396 80 396 L112 396 Q118 396 118 390 L118 380 Q118 374 112 374 Z" fill="var(--fg)" />
        <path d="M78 386 L116 386" stroke="var(--bg)" strokeWidth="0.8" opacity="0.3" />
        <path d="M80 378 L112 378" stroke="var(--bg)" strokeWidth="0.5" opacity="0.2" />

        {/* Right shoe */}
        <path d="M122 374 Q118 374 116 378 L116 390 Q116 396 122 396 L158 396 Q164 396 164 390 L164 380 Q164 374 158 374 Z" fill="var(--fg)" />
        <path d="M120 386 L160 386" stroke="var(--bg)" strokeWidth="0.8" opacity="0.3" />
        <path d="M122 378 L156 378" stroke="var(--bg)" strokeWidth="0.5" opacity="0.2" />

        {/* Hoodie body */}
        <path d="M66 128 Q66 118 76 116 L164 116 Q174 118 174 128 L178 268 Q178 278 168 278 L72 278 Q62 278 62 268 Z" fill="var(--fg)" />

        {/* Hoodie pocket */}
        <path d="M80 210 Q80 204 86 204 L154 204 Q160 204 160 210 L160 232 Q160 238 154 238 L86 238 Q80 238 80 232 Z" fill="none" stroke="var(--bg)" strokeWidth="0.8" opacity="0.15" />

        {/* Hoodie center zipper line */}
        <line x1="120" y1="128" x2="120" y2="276" stroke="var(--bg)" strokeWidth="0.6" opacity="0.1" />

        {/* UGAC text on hoodie */}
        <text x="120" y="178" textAnchor="middle" fill="var(--bg)" opacity="0.85" fontFamily="'Barlow Condensed', sans-serif" fontWeight="900" fontSize="28" letterSpacing="3">UGAC</text>
        <text x="120" y="194" textAnchor="middle" fill="var(--bg)" opacity="0.35" fontFamily="'Space Mono', monospace" fontSize="6.5" letterSpacing="2">IIT BOMBAY</text>

        {/* Hood behind head */}
        <path d="M72 128 Q72 90 90 72 Q100 62 120 60 Q140 62 150 72 Q168 90 168 128 L164 128 Q164 94 148 80 Q138 72 120 70 Q102 72 92 80 Q76 94 76 128 Z" fill="var(--fg)" />

        {/* Neck */}
        <rect x="108" y="92" width="24" height="28" rx="4" fill="var(--fg)" opacity="0.85" />

        {/* Head */}
        <circle cx="120" cy="70" r="32" fill="var(--fg)" />

        {/* Hair */}
        <path d="M88 58 Q88 32 120 28 Q152 32 152 58 Q152 44 140 38 Q128 34 120 34 Q112 34 100 38 Q88 44 88 58" fill="var(--fg)" />
        <path d="M100 40 Q110 30 125 34" stroke="var(--bg)" strokeWidth="0.8" opacity="0.08" fill="none" />

        {/* Glasses */}
        <g opacity="0.7">
          <rect x="97" y="60" width="18" height="14" rx="5" fill="none" stroke="var(--bg)" strokeWidth="1.5" opacity="0.6" />
          <rect x="125" y="60" width="18" height="14" rx="5" fill="none" stroke="var(--bg)" strokeWidth="1.5" opacity="0.6" />
          <path d="M115 67 Q120 63 125 67" stroke="var(--bg)" strokeWidth="1.2" fill="none" opacity="0.6" />
          <path d="M97 65 L88 62" stroke="var(--bg)" strokeWidth="1.2" opacity="0.5" />
          <path d="M143 65 L152 62" stroke="var(--bg)" strokeWidth="1.2" opacity="0.5" />
        </g>

        {/* Eyes (blinking) */}
        <motion.g
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', times: [0, 0.46, 0.48, 0.50, 1] }}
          style={{ transformOrigin: '120px 68px' }}
        >
          <ellipse cx="106" cy="68" rx="2.5" ry="3" fill="var(--bg)" />
          <ellipse cx="134" cy="68" rx="2.5" ry="3" fill="var(--bg)" />
          <circle cx="107.5" cy="66.5" r="0.8" fill="var(--bg)" opacity="0.4" />
          <circle cx="135.5" cy="66.5" r="0.8" fill="var(--bg)" opacity="0.4" />
        </motion.g>

        {/* Eyebrows */}
        <path d="M96 57 Q106 53 116 57" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
        <path d="M124 57 Q134 53 144 57" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />

        {/* Nose */}
        <path d="M118 74 Q120 78 122 74" stroke="var(--bg)" strokeWidth="0.8" fill="none" opacity="0.3" />

        {/* Smile */}
        <path d="M110 84 Q120 90 130 84" stroke="var(--bg)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4" />

        {/* Left arm (by side) */}
        <motion.g
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '66px 128px' }}
        >
          <path d="M66 128 Q50 140 46 178 Q44 194 48 200 L58 200 Q62 194 60 178 L66 144" fill="var(--fg)" />
          <circle cx="52" cy="200" r="8" fill="var(--fg)" />
        </motion.g>

        {/* Right arm (holding book) */}
        <motion.g
          animate={{ rotate: [0.5, -1.5, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          style={{ transformOrigin: '174px 128px' }}
        >
          <path d="M174 128 Q190 140 194 170 Q196 186 192 194 L182 194 Q178 186 180 170 L174 144" fill="var(--fg)" />
          <circle cx="188" cy="194" r="8" fill="var(--fg)" />
          <motion.g
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '192px 194px' }}
          >
            <rect x="176" y="180" width="32" height="24" rx="2" fill="var(--accent-blue)" opacity="0.85" />
            <rect x="178" y="182" width="28" height="20" rx="1" fill="none" stroke="var(--bg)" strokeWidth="0.5" opacity="0.3" />
            <line x1="192" y1="180" x2="192" y2="204" stroke="var(--bg)" strokeWidth="0.5" opacity="0.2" />
            <line x1="180" y1="188" x2="189" y2="188" stroke="var(--bg)" strokeWidth="0.6" opacity="0.3" />
            <line x1="180" y1="192" x2="186" y2="192" stroke="var(--bg)" strokeWidth="0.6" opacity="0.3" />
            <line x1="195" y1="188" x2="204" y2="188" stroke="var(--bg)" strokeWidth="0.6" opacity="0.3" />
            <line x1="195" y1="192" x2="202" y2="192" stroke="var(--bg)" strokeWidth="0.6" opacity="0.3" />
          </motion.g>
        </motion.g>

        {/* Hood drawstrings */}
        <motion.g
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '110px 116px' }}
        >
          <line x1="110" y1="116" x2="108" y2="140" stroke="var(--bg)" strokeWidth="0.8" opacity="0.2" />
          <circle cx="108" cy="142" r="1.5" fill="var(--bg)" opacity="0.2" />
        </motion.g>
        <motion.g
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          style={{ transformOrigin: '130px 116px' }}
        >
          <line x1="130" y1="116" x2="132" y2="140" stroke="var(--bg)" strokeWidth="0.8" opacity="0.2" />
          <circle cx="132" cy="142" r="1.5" fill="var(--bg)" opacity="0.2" />
        </motion.g>
      </svg>
    </motion.div>
  );
}

export default function HoverPostStatement() {
  const [active, setActive] = useState(null);

  return (
    <motion.div
      className="about-statement about-hover-statement"
      onMouseLeave={() => setActive(null)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09 } },
      }}
    >
      <FloatingPosts active={active} />
      <StudentIllustration />

      <motion.span className="about-hover-line" variants={lineVariants}>
        It's never <span className="muted">"just a </span>
        <HoverWord id="course" setActive={setActive}>course</HoverWord>
        <span className="muted">."</span>
      </motion.span>
      <motion.span className="about-hover-line muted" variants={lineVariants}>
        Every <HoverWord id="opportunity" setActive={setActive}>opportunity</HoverWord> matters.
      </motion.span>
      <motion.span className="about-hover-line" variants={lineVariants}>
        We build careers.
      </motion.span>
      <motion.span className="about-hover-line" variants={lineVariants}>
        <span className="muted">Your </span>
        <HoverWord id="growth" setActive={setActive}>growth</HoverWord>
        <span className="muted">.</span> Our mission.
      </motion.span>
      <motion.span className="about-hover-line" variants={lineVariants}>
        <span className="muted">Your </span>
        <HoverWord id="research" setActive={setActive}>research</HoverWord>
        <span className="muted">.</span> Our fuel.
      </motion.span>
    </motion.div>
  );
}
