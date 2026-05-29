import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.4,
      ease: 'easeOut',
      onUpdate: v => setDisplay(Math.round(v)),
    });
    return controls.stop;
  }, [inView, to]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

const stats = [
  { num: 5000, suffix: '+', label: 'Undergrads Supported', sub: 'Every student at IIT Bombay benefits from UGAC programs.' },
  { num: 6000, suffix: '+', label: "Learners' Space Registrations", sub: '9th edition with 44 courses spanning data science, finance, consulting, and design.' },
  { num: 79, suffix: '', label: 'SURP Research Projects', sub: '21 departments, 54 faculty mentors — connecting undergrads to cutting-edge research.' },
  { num: 1400, suffix: '+', label: 'Students at ENTHUSE 2025', sub: "UGAC's flagship freshman orientation introducing research and academic resources." },
];

export default function Stats() {
  return (
    <section className="stats-section" id="stats">
      <div className="stats-header-row">
        <div className="s-label">By The Numbers</div>
        <SplitTextReveal as="h2" className="stats-section-title" text="We Are UGAC" />
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-item"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="stat-num">
              <Counter to={s.num} suffix={s.suffix} />
            </div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
