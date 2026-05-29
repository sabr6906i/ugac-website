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
