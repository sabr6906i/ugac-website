import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TAGS = [
  { value: '10',   label: 'Divisions'        },
  { value: '17',   label: 'Core Leaders'     },
  { value: '6K+',  label: 'Students Reached' },
  { value: '79',   label: 'SURP Projects'    },
  { value: '2025', label: '— 26 Tenure'      },
];

export default function ScrollText() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scale        = useTransform(scrollYProgress, [0, 1],          [1, 1.65]);
  const ugacOpacity  = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0.3]);
  const tagsY        = useTransform(scrollYProgress, [0, 1],          [0, -50]);
  const tagsOpacity  = useTransform(scrollYProgress, [0, 0.08, 0.65, 0.9], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="stext-section">
      <div className="stext-sticky">

        {/* Stats row above UGAC */}
        <motion.div className="stext-tags" style={{ y: tagsY, opacity: tagsOpacity }}>
          {TAGS.map((t, i) => (
            <div key={i} className="stext-tag">
              <span className="stext-tag-value">{t.value}</span>
              <span className="stext-tag-label">{t.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Giant UGAC */}
        <motion.div
          className="stext-heading"
          style={{ scale, opacity: ugacOpacity }}
        >
          UGAC
        </motion.div>

        {/* Subtitle below */}
        <motion.div
          className="stext-sub"
          style={{ opacity: tagsOpacity }}
        >
          Undergraduate Academic Council · IIT Bombay
        </motion.div>

      </div>
    </div>
  );
}
