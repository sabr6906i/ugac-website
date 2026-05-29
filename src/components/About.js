import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

const stats = [
  { num: '6K+', label: 'Learners\' Space Registrations' },
  { num: '1400+', label: 'Students in Career Cell WhatsApp' },
  { num: '51', label: 'Tutorial Sessions Conducted' },
  { num: '78', label: 'SURP Research Projects (2025)' },
];

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section className="about" id="about">
      <div className="about-inner" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="about-label">Who We Are</div>
          <h2 className="about-title">The Academic Backbone of IIT Bombay</h2>
          <p className="about-body">
            The Undergraduate Academic Council (UGAC) is a student-led body dedicated to strengthening the academic framework of IIT Bombay. Founded to bridge communication between students and faculty, UGAC works closely with administration to develop policies that reflect student perspectives.
          </p>
          <p className="about-body">
            Through 10 specialized divisions spanning Analytics, Finance, Consulting, Research, Career Guidance, and Student Support, UGAC touches every dimension of an IITian's academic and professional journey.
          </p>
          <div className="about-highlight">
            "We bridge students and faculty, spark innovation, and drive academic excellence at every level."
          </div>
        </motion.div>

        <motion.div
          className="about-right"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="about-stat-card featured">
            <div className="about-stat-num">5000+</div>
            <div className="about-stat-label">UG Students Supported at IIT Bombay</div>
          </div>
          {stats.map(s => (
            <div key={s.label} className="about-stat-card">
              <div className="about-stat-num">{s.num}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
