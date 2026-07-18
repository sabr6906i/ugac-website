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
  const T = [0, 0.15, 0.30, 0.42, 0.58, 0.78, 0.88, 1.0];
  const S = { duration: 3, repeat: Infinity, ease: 'easeInOut', times: T };

  return (
    <motion.div
      className="cs-inline"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg viewBox="0 0 260 420" fill="none" className="cs-svg">
        {/* Ground shadow */}
        <ellipse cx="130" cy="405" rx="52" ry="8" fill="var(--fg)" opacity="0.08" />

        {/* === ROOT GROUP — leans right during point === */}
        <motion.g
          animate={{ rotate: [0, 0, 0, 2, 5, 5, 1, 0] }}
          transition={S}
          style={{ transformOrigin: '130px 270px' }}
        >
          {/* Legs */}
          <path d="M102 272 L96 370 Q96 382 106 382 L114 382 Q120 382 120 374 L116 272" fill="var(--fg)" />
          <path d="M140 272 L136 370 Q136 382 146 382 L154 382 Q160 382 160 374 L156 272" fill="var(--fg)" />

          {/* Left shoe */}
          <path d="M90 374 Q86 374 84 378 L84 390 Q84 396 90 396 L122 396 Q128 396 128 390 L128 380 Q128 374 122 374 Z" fill="var(--fg)" />
          <path d="M88 386 L126 386" stroke="var(--bg)" strokeWidth="0.8" opacity="0.3" />

          {/* Right shoe */}
          <path d="M132 374 Q128 374 126 378 L126 390 Q126 396 132 396 L168 396 Q174 396 174 390 L174 380 Q174 374 168 374 Z" fill="var(--fg)" />
          <path d="M130 386 L170 386" stroke="var(--bg)" strokeWidth="0.8" opacity="0.3" />

          {/* Hoodie body */}
          <path d="M76 128 Q76 118 86 116 L174 116 Q184 118 184 128 L188 268 Q188 278 178 278 L82 278 Q72 278 72 268 Z" fill="var(--fg)" />

          {/* Hoodie pocket */}
          <path d="M90 210 Q90 204 96 204 L164 204 Q170 204 170 210 L170 232 Q170 238 164 238 L96 238 Q90 238 90 232 Z" fill="none" stroke="var(--bg)" strokeWidth="0.8" opacity="0.15" />

          {/* Center line */}
          <line x1="130" y1="128" x2="130" y2="276" stroke="var(--bg)" strokeWidth="0.6" opacity="0.1" />

          {/* UGAC text */}
          <text x="130" y="178" textAnchor="middle" fill="var(--bg)" opacity="0.85" fontFamily="'Barlow Condensed', sans-serif" fontWeight="900" fontSize="28" letterSpacing="3">UGAC</text>
          <text x="130" y="194" textAnchor="middle" fill="var(--bg)" opacity="0.35" fontFamily="'Space Mono', monospace" fontSize="6.5" letterSpacing="2">IIT BOMBAY</text>

          {/* Hood behind head */}
          <path d="M82 128 Q82 90 100 72 Q110 62 130 60 Q150 62 160 72 Q178 90 178 128 L174 128 Q174 94 158 80 Q148 72 130 70 Q112 72 102 80 Q86 94 86 128 Z" fill="var(--fg)" />

          {/* === LEFT ARM — minimal sway === */}
          <motion.g
            animate={{ rotate: [-1, 1, 1, 0, -2, -2, 0, 0] }}
            transition={{ ...S, duration: 3 }}
            style={{ transformOrigin: '76px 128px' }}
          >
            <path d="M76 128 Q60 140 56 178 Q54 194 58 200 L68 200 Q72 194 70 178 L76 144" fill="var(--fg)" />
            <circle cx="62" cy="200" r="8" fill="var(--fg)" />
          </motion.g>

          {/* === RIGHT ARM — wave → lower → point down === */}
          <motion.g
            animate={{ rotate: [0, -80, -80, -10, 42, 42, 5, 0] }}
            transition={S}
            style={{ transformOrigin: '184px 128px' }}
          >
            {/* Upper arm */}
            <path d="M184 128 Q200 140 204 170 Q206 186 202 194 L192 194 Q188 186 190 170 L184 144" fill="var(--fg)" />

            {/* === FOREARM — oscillates during wave, straight for point === */}
            <motion.g
              animate={{ rotate: [0, -18, 18, 0, 0, 0, 0, 0] }}
              transition={S}
              style={{ transformOrigin: '200px 170px' }}
            >
              {/* Hand */}
              <circle cx="198" cy="198" r="9" fill="var(--fg)" />

              {/* Pointing finger — visible during point phase */}
              <motion.g
                animate={{ opacity: [0, 0, 0, 0, 1, 1, 0, 0] }}
                transition={S}
              >
                <path d="M206 202 L220 224" stroke="var(--fg)" strokeWidth="3.5" strokeLinecap="round" />
                {/* Fingertip glow */}
                <motion.circle
                  cx="221" cy="226" r="4"
                  fill="var(--accent-blue)"
                  animate={{ opacity: [0, 0, 0, 0, 0.5, 0.5, 0, 0], scale: [0.8, 0.8, 0.8, 0.8, 1, 1.1, 0.8, 0.8] }}
                  transition={S}
                />
              </motion.g>

              {/* Wave hand — open palm during wave */}
              <motion.g
                animate={{ opacity: [1, 1, 1, 0, 0, 0, 0, 0] }}
                transition={S}
              >
                {/* Fingers spread for wave */}
                <path d="M194 190 L190 178" stroke="var(--fg)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M198 188 L198 176" stroke="var(--fg)" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M202 190 L206 178" stroke="var(--fg)" strokeWidth="2.5" strokeLinecap="round" />
              </motion.g>
            </motion.g>
          </motion.g>

          {/* === HEAD — tilts during wave, follows point === */}
          <motion.g
            animate={{ rotate: [-3, -5, -5, 2, 5, 5, 1, 0] }}
            transition={S}
            style={{ transformOrigin: '130px 92px' }}
          >
            {/* Neck */}
            <rect x="118" y="92" width="24" height="28" rx="4" fill="var(--fg)" opacity="0.85" />

            {/* Head */}
            <circle cx="130" cy="70" r="32" fill="var(--fg)" />

            {/* Hair */}
            <path d="M98 58 Q98 32 130 28 Q162 32 162 58 Q162 44 150 38 Q138 34 130 34 Q122 34 110 38 Q98 44 98 58" fill="var(--fg)" />
            <path d="M110 40 Q120 30 135 34" stroke="var(--bg)" strokeWidth="0.8" opacity="0.08" fill="none" />

            {/* Glasses */}
            <g opacity="0.7">
              <rect x="107" y="60" width="18" height="14" rx="5" fill="none" stroke="var(--bg)" strokeWidth="1.5" opacity="0.6" />
              <rect x="135" y="60" width="18" height="14" rx="5" fill="none" stroke="var(--bg)" strokeWidth="1.5" opacity="0.6" />
              <path d="M125 67 Q130 63 135 67" stroke="var(--bg)" strokeWidth="1.2" fill="none" opacity="0.6" />
              <path d="M107 65 L98 62" stroke="var(--bg)" strokeWidth="1.2" opacity="0.5" />
              <path d="M153 65 L162 62" stroke="var(--bg)" strokeWidth="1.2" opacity="0.5" />
            </g>

            {/* Eyes — blink + look right during point */}
            <motion.g
              animate={{
                scaleY: [1, 1, 0.1, 1, 1, 1, 1, 1],
                x: [0, 0, 0, 0, 2, 2, 0, 0],
              }}
              transition={{ ...S, duration: 4.5, times: [0, 0.44, 0.46, 0.48, 0.55, 0.75, 0.85, 1.0] }}
              style={{ transformOrigin: '130px 68px' }}
            >
              <ellipse cx="116" cy="68" rx="2.5" ry="3" fill="var(--bg)" />
              <ellipse cx="144" cy="68" rx="2.5" ry="3" fill="var(--bg)" />
              <circle cx="117.5" cy="66.5" r="0.8" fill="var(--bg)" opacity="0.4" />
              <circle cx="145.5" cy="66.5" r="0.8" fill="var(--bg)" opacity="0.4" />
            </motion.g>

            {/* Eyebrows — raised during wave, furrow during point */}
            <motion.g
              animate={{ y: [0, -1.5, -1.5, 0, 0.5, 0.5, 0, 0] }}
              transition={S}
            >
              <path d="M106 57 Q116 53 126 57" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
              <path d="M134 57 Q144 53 154 57" stroke="var(--bg)" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
            </motion.g>

            {/* Nose */}
            <path d="M128 74 Q130 78 132 74" stroke="var(--bg)" strokeWidth="0.8" fill="none" opacity="0.3" />

            {/* Mouth — smile widens during wave */}
            <motion.path
              d="M120 84 Q130 90 140 84"
              stroke="var(--bg)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.4"
              animate={{ d: ['M120 84 Q130 90 140 84', 'M118 84 Q130 92 142 84', 'M118 84 Q130 92 142 84', 'M120 84 Q130 88 140 84', 'M121 85 Q130 87 139 85', 'M121 85 Q130 87 139 85', 'M120 84 Q130 90 140 84', 'M120 84 Q130 90 140 84'] }}
              transition={S}
            />

            {/* Hood drawstrings */}
            <motion.g
              animate={{ rotate: [-2, -4, -4, 0, 3, 3, 0, 0] }}
              transition={S}
              style={{ transformOrigin: '120px 116px' }}
            >
              <line x1="120" y1="116" x2="118" y2="140" stroke="var(--bg)" strokeWidth="0.8" opacity="0.2" />
              <circle cx="118" cy="142" r="1.5" fill="var(--bg)" opacity="0.2" />
            </motion.g>
            <motion.g
              animate={{ rotate: [2, 4, 4, 0, -3, -3, 0, 0] }}
              transition={S}
              style={{ transformOrigin: '140px 116px' }}
            >
              <line x1="140" y1="116" x2="142" y2="140" stroke="var(--bg)" strokeWidth="0.8" opacity="0.2" />
              <circle cx="142" cy="142" r="1.5" fill="var(--bg)" opacity="0.2" />
            </motion.g>
          </motion.g>
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
