import { motion } from 'framer-motion';
import HoverPostStatement from './HoverPostStatement';

const PILLARS = [
  { label: 'Academic Excellence', num: '01' },
  { label: 'Student Empowerment', num: '02' },
  { label: 'Industry Connections', num: '03' },
  { label: 'Research & Innovation', num: '04' },
];

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-eyebrow">
        <span className="s-label">About UGAC</span>
      </div>

      <HoverPostStatement />

      <div className="about-bottom">
        <motion.p
          className="about-body"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          The <strong>Undergraduate Academic Council (UGAC)</strong> at IIT Bombay is a student-led body
          dedicated to strengthening the academic framework of the institute. We collaborate with
          administration, faculty, and industry to develop policies that incorporate student perspectives
          while driving academic excellence at every level.
        </motion.p>

        <motion.div
          className="about-pillars"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {PILLARS.map(p => (
            <div key={p.num} className="about-pillar">
              <span>{p.label}</span>
              <span className="about-pillar-num">{p.num}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
