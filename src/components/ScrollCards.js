import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CARDS = [
  { src: '/images/ugac-posts-hover/consult-poster.webp', alt: 'Consult Club' },
  { src: '/images/ugac-posts-hover/enpower-poster.jpg', alt: 'EnPoWER' },
  { src: '/images/ugac-posts-hover/career-poster.webp', alt: 'Career Cell' },
  { src: '/images/ugac-posts-hover/sss-poster.jpg', alt: 'Student Support' },
  { src: '/images/ugac-posts-hover/investment-01.jpg', alt: 'Investment Team' },
];

export default function ScrollCards() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const y1     = useTransform(scrollYProgress, [0, 1], ['14vh',  '-55vh']);
  const rot1   = useTransform(scrollYProgress, [0, 1], [-6, 10]);
  const scale1 = useTransform(scrollYProgress, [0, 1], [0.88, 1.02]);

  const y2     = useTransform(scrollYProgress, [0, 1], ['5vh',   '-85vh']);
  const rot2   = useTransform(scrollYProgress, [0, 1], [5, -8]);
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const y3     = useTransform(scrollYProgress, [0, 1], ['30vh',  '-30vh']);
  const rot3   = useTransform(scrollYProgress, [0, 1], [-3, 7]);
  const scale3 = useTransform(scrollYProgress, [0, 1], [0.8, 1.12]);

  const y4     = useTransform(scrollYProgress, [0, 1], ['-2vh',  '-70vh']);
  const rot4   = useTransform(scrollYProgress, [0, 1], [8, -5]);
  const scale4 = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  const y5     = useTransform(scrollYProgress, [0, 1], ['25vh',  '-45vh']);
  const rot5   = useTransform(scrollYProgress, [0, 1], [-10, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [0.84, 1.06]);

  const textY       = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.55]);

  return (
    <div ref={containerRef} className="sc-section">
      <div className="sc-sticky">

        <motion.div className="sc-text" style={{ y: textY, opacity: textOpacity }}>
          <span className="s-label">Our Reach</span>
          <h2 className="sc-heading">
            Clubs.<br />Events.<br />Impact.
          </h2>
        </motion.div>

        <motion.img className="sc-card sc-c1" src={CARDS[0].src} alt={CARDS[0].alt}
          style={{ y: y1, rotate: rot1, scale: scale1 }} />
        <motion.img className="sc-card sc-c2" src={CARDS[1].src} alt={CARDS[1].alt}
          style={{ y: y2, rotate: rot2, scale: scale2 }} />
        <motion.img className="sc-card sc-c3" src={CARDS[2].src} alt={CARDS[2].alt}
          style={{ y: y3, rotate: rot3, scale: scale3 }} />
        <motion.img className="sc-card sc-c4" src={CARDS[3].src} alt={CARDS[3].alt}
          style={{ y: y4, rotate: rot4, scale: scale4 }} />
        <motion.img className="sc-card sc-c5" src={CARDS[4].src} alt={CARDS[4].alt}
          style={{ y: y5, rotate: rot5, scale: scale5 }} />

      </div>
    </div>
  );
}
