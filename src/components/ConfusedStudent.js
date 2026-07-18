import { motion } from 'framer-motion';

const ORBIT_ITEMS = [
  { label: 'Courses', angle: 0,   radius: 110, delay: 0.3,  speed: 18, icon: 'book' },
  { label: 'Deadlines', angle: 45,  radius: 125, delay: 0.5,  speed: 22, icon: 'clock' },
  { label: 'Exams', angle: 90,  radius: 100, delay: 0.7,  speed: 16, icon: 'pen' },
  { label: 'Research', angle: 135, radius: 130, delay: 0.9,  speed: 25, icon: 'flask' },
  { label: 'Events', angle: 180, radius: 115, delay: 1.1,  speed: 20, icon: 'calendar' },
  { label: 'Code', angle: 225, radius: 120, delay: 0.6,  speed: 19, icon: 'code' },
  { label: 'Grades', angle: 270, radius: 105, delay: 0.8,  speed: 17, icon: 'chart' },
  { label: 'Clubs', angle: 315, radius: 135, delay: 1.0,  speed: 23, icon: 'star' },
];

const QMARKS = [
  { x: -28, y: -72, delay: 1.2, scale: 0.9 },
  { x: 12,  y: -80, delay: 1.5, scale: 1.1 },
  { x: -8,  y: -65, delay: 1.8, scale: 0.75 },
  { x: 30,  y: -68, delay: 2.0, scale: 0.6 },
];

function OrbitIcon({ type }) {
  const s = 18;
  const color = 'var(--fg-muted)';
  switch (type) {
    case 'book':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      );
    case 'clock':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      );
    case 'pen':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    case 'flask':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 3h6" />
          <path d="M10 3v6.5L4 20h16l-6-10.5V3" />
        </svg>
      );
    case 'calendar':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case 'code':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      );
    case 'chart':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      );
    case 'star':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ConfusedStudent() {
  return (
    <div className="cs-section">
      <div className="cs-scene">
        {/* Student figure */}
        <motion.svg
          className="cs-student"
          viewBox="0 0 120 180"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Head */}
          <circle cx="60" cy="38" r="22" fill="var(--fg)" />
          {/* Eyes — two dots looking left/right */}
          <motion.g
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="52" cy="36" r="2.5" fill="var(--bg)" />
            <circle cx="68" cy="36" r="2.5" fill="var(--bg)" />
          </motion.g>
          {/* Slight head tilt */}
          <motion.g
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '60px 60px' }}
          >
            {/* Body */}
            <rect x="40" y="62" width="40" height="55" rx="6" fill="var(--fg)" />
            {/* Arms */}
            <motion.g
              animate={{ rotate: [-5, 8, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '40px 72px' }}
            >
              <rect x="22" y="66" width="18" height="8" rx="4" fill="var(--fg)" />
            </motion.g>
            <motion.g
              animate={{ rotate: [5, -8, 5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              style={{ transformOrigin: '80px 72px' }}
            >
              <rect x="80" y="66" width="18" height="8" rx="4" fill="var(--fg)" />
            </motion.g>
            {/* Laptop on lap */}
            <rect x="32" y="117" width="56" height="6" rx="2" fill="var(--fg-muted)" />
            <rect x="36" y="105" width="48" height="14" rx="3" fill="var(--fg-subtle)" stroke="var(--fg-muted)" strokeWidth="0.8" />
            {/* Laptop screen glow */}
            <rect x="40" y="108" width="40" height="8" rx="1.5" fill="var(--accent-blue)" opacity="0.15" />
            {/* Legs */}
            <rect x="42" y="123" width="14" height="40" rx="5" fill="var(--fg)" />
            <rect x="64" y="123" width="14" height="40" rx="5" fill="var(--fg)" />
            {/* Shoes */}
            <rect x="38" y="158" width="22" height="8" rx="4" fill="var(--fg)" />
            <rect x="60" y="158" width="22" height="8" rx="4" fill="var(--fg)" />
          </motion.g>
          {/* Question marks above head */}
          {QMARKS.map((q, i) => (
            <motion.text
              key={i}
              x={60 + q.x}
              y={38 + q.y}
              textAnchor="middle"
              fill="var(--accent-blue)"
              fontSize={14 * q.scale}
              fontWeight="700"
              fontFamily="var(--font-display)"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: [0, 0.8, 0.4, 0.8], y: [8, -4, 0, -4] }}
              viewport={{ once: true }}
              transition={{ duration: 3, repeat: Infinity, delay: q.delay, ease: 'easeInOut' }}
            >
              ?
            </motion.text>
          ))}
        </motion.svg>

        {/* Orbiting elements */}
        {ORBIT_ITEMS.map((item, i) => {
          const rad = (item.angle * Math.PI) / 180;
          const cx = Math.cos(rad) * item.radius;
          const cy = Math.sin(rad) * item.radius * 0.55;
          return (
            <motion.div
              key={i}
              className="cs-orbit-item"
              initial={{ opacity: 0, scale: 0.3 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="cs-orbit-float"
                animate={{
                  x: [cx - 10, cx + 10, cx - 10],
                  y: [cy - 8, cy + 8, cy - 8],
                  rotate: [0, 8, -8, 0],
                }}
                transition={{
                  duration: item.speed * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.delay,
                }}
              >
                <OrbitIcon type={item.icon} />
                <span className="cs-orbit-label">{item.label}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
