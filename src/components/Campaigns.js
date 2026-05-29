import { useState } from 'react';
import { motion } from 'framer-motion';

const POST_BASE = '/images/ugac-posts-hover/';

// Each club gets an `images` array — add more paths here when you have 5-6 per club
const campaigns = [
  {
    num: '01', name: 'Confluence',       club: 'Analytics × Consult', tag: 'Jan 2025',
    images: [`${POST_BASE}consult-poster.webp`],
  },
  {
    num: '02', name: 'Fundae Talks 2.0', club: 'Career Cell',         tag: 'Mar 2025',
    images: [`${POST_BASE}career-poster.webp`],
  },
  {
    num: '03', name: 'ResCon 2025',      club: 'EnPoWER',             tag: 'Dec 2024',
    images: [`${POST_BASE}enpower-poster.jpg`],
  },
  {
    num: '04', name: 'Finance Decoded',  club: 'Investment Team',     tag: 'Ongoing',
    images: [
      `${POST_BASE}investment-01.jpg`,
      `${POST_BASE}investment-02.jpg`,
    ],
  },
  {
    num: '05', name: 'UGAC Briefing',    club: 'All Divisions',       tag: 'Apr 2025',
    images: [`${POST_BASE}ugac-main.jpg`],
  },
  {
    num: '06', name: 'SSS Stories',      club: 'Student Support',     tag: 'Ongoing',
    images: [
      `${POST_BASE}sss-poster.jpg`,
      `${POST_BASE}sss-02.jpg`,
    ],
  },
];

// Fan config per image slot: [right offset rem, rotation deg, z-index]
// Primary image is closest to right edge; each subsequent fans further left
const FAN = [
  [6.5,   0,  5],
  [10.5, -6,  4],
  [14.5,  8,  3],
  [18.5, -9,  2],
  [22.5, 11,  1],
];

const IMG_H = 280; // px — how tall each image grows to

export default function Campaigns() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="campaigns" id="campaigns">
      <div className="camp-header-row">
        <div>
          <div className="s-label" style={{ marginBottom: '0.75rem' }}>Selected Campaigns</div>
          <h2 className="camp-section-title">Featured<br />Work</h2>
        </div>
        <div className="camp-count-badge">2025–26 Tenure</div>
      </div>

      <div className={`camp-list-wrap${hovered !== null ? ' has-hover' : ''}`}>
        {campaigns.map((c, i) => (
          <motion.div
            key={c.num}
            className="camp-row"
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            {/* ── Image fan — Namma exact: positioned at row center, height 0→full ── */}
            {c.images.map((img, imgIdx) => {
              const [rightRem, rotate, zIdx] = FAN[imgIdx] ?? FAN[FAN.length - 1];
              return (
                <motion.div
                  key={imgIdx}
                  className="camp-img-wrap"
                  style={{ right: `${rightRem}rem`, rotate: `${rotate}deg`, zIndex: zIdx }}
                  animate={
                    hovered === i
                      ? { height: IMG_H, opacity: 1 }
                      : { height: 0,     opacity: 0 }
                  }
                  transition={{
                    duration: 0.55,
                    delay: imgIdx * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <img src={img} alt="" className="camp-img" />
                </motion.div>
              );
            })}

            {/* ── Row number ── */}
            <span className="camp-row-num">{c.num}</span>

            {/* ── Campaign name — line-mask scroll reveal ── */}
            <div className="camp-line-mask">
              <motion.span
                className="camp-row-name"
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.9 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                {c.name}
              </motion.span>
            </div>

            {/* ── Right-side meta ── */}
            <div className="camp-row-right">
              <span className="camp-row-club">{c.club}</span>
              <span className="camp-row-tag">{c.tag}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
