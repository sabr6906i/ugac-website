import { motion } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';

const contacts = [
  { label: 'General Secretary', value: 'gsecaaug@iitb.ac.in', href: 'mailto:gsecaaug@iitb.ac.in' },
  { label: 'Web Team', value: 'web.ugac@iitb.ac.in', href: 'mailto:web.ugac@iitb.ac.in' },
  { label: 'Instagram', value: '@ugac.iitb', href: 'https://instagram.com/ugac.iitb' },
  { label: 'Facebook', value: 'iitb.ugacads', href: 'https://facebook.com/iitb.ugacads' },
  { label: 'Official Website', value: 'gymkhana.iitb.ac.in', href: 'https://ugac-iitb.github.io/UGAC-IITB/' },
  { label: 'UGAC Wiki', value: 'ugac.gymkhana.iitb.ac.in/wiki', href: 'https://ugac.gymkhana.iitb.ac.in/wiki' },
];

export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-inner">
        <div className="contact-left">
          <div className="s-label" style={{ marginBottom: '0.75rem' }}>Reach Out</div>
          <SplitTextReveal
            as="h2"
            className="contact-title"
            lines={['Connect', 'with UGAC']}
            amount={0.3}
          />
          <motion.p
            className="contact-desc"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Have a question, want to collaborate, or looking for academic resources? We're here.
          </motion.p>
        </div>

        <div className="contact-right">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
              className="contact-row"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="contact-row-label">{c.label}</span>
              <span className="contact-row-value">{c.value} ↗</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
