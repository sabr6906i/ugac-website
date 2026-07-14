import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BASE = '/images/team/';

const allMembers = [
  { name: 'Kartik Shilpi Singhal', role: 'General Secretary Academic Affairs (UG)', email: 'gsecaaug@iitb.ac.in', linkedin: 'thekartiksinghal', division: 'UGAC', img: `${BASE}Kartik Shilpi Singhal.png` },
  { name: 'Avani Gala', role: 'Inst. Secretary AA & Head, SSS', email: 'isaa.sss.iitb@gmail.com', linkedin: 'avani-gala-ba12b0222', division: 'SSS', img: `${BASE}Avani Gala.png` },
  { name: 'Parv Khandelwal', role: 'Inst. Secretary AA & Head, Career Cell', email: 'isaa.careercell.iitb@gmail.com', linkedin: 'parv-khandelwal-iitb', division: 'Career Cell', img: `${BASE}Parv Khandelwal.png` },
  { name: 'Dev Arora', role: 'Inst. Secretary AA & Head, EnPoWER', email: 'isaa.enpower.iitb@gmail.com', linkedin: 'dev-arora-b5857731b', division: 'EnPoWER', img: `${BASE}Dev Arora.png` },
  { name: 'Rupanshi Vijayvargiya', role: 'Inst. Secretary AA & Head, EnPoWER', email: 'isaa.enpower.iitb@gmail.com', linkedin: 'rupanshi-vijayvargiya-970a18287', division: 'EnPoWER', img: `${BASE}Rupanshi Vijayvargiya.png` },
  { name: 'Aryan Kashyap', role: 'Manager, Analytics Club', email: 'manager.analytics.iitb@gmail.com', linkedin: 'aryan-kshyp', division: 'Analytics', img: `${BASE}Aryan Kashyap.png` },
  { name: 'Anjali Jangid', role: 'Manager, Consult Club', email: 'manager.consultclub.iitb@gmail.com', linkedin: 'anjali-jangid-68326229b', division: 'Consult', img: `${BASE}Anjali Jangid.png` },
  { name: 'Kopal Goel', role: 'Manager, Finance Club', email: 'manager.finance.iitb@gmail.com', linkedin: 'kopal-goel-010064294', division: 'Finance', img: `${BASE}Kopal Goel.png` },
  { name: 'Ritwik Raghav', role: 'Manager, Finance Club', email: 'manager.finance.iitb@gmail.com', linkedin: 'ritwik-raghav-019215291', division: 'Finance', img: `${BASE}Ritwik Raghav.png` },
  { name: 'Ved Parulekar', role: 'President, Consulting Core Group', email: 'presidentccg1@gmail.com', linkedin: 'ved-parulekar-8ab221283', division: 'CCG', img: `${BASE}Ved Parulekar.png` },
  { name: 'Atharva Mittal', role: 'Fund Manager, Investment Team', email: 'investmentteam.ugac.iitb@gmail.com', linkedin: 'atharva-mittal-374b74251', division: 'Investment', img: `${BASE}Atharva Mittal.png` },
  { name: 'Aryan Tewari', role: 'Principal, Investment Team', email: 'investmentteam.ugac.iitb@gmail.com', linkedin: 'aryan-tewari-372170257', division: 'Investment', img: `${BASE}Aryan Tewari.png` },
  { name: 'Prince Kumar', role: 'Head, DAV Team', email: 'heads.davteam@gmail.com', linkedin: 'prince-kumar-880734270', division: 'DAV', img: `${BASE}Prince Kumar.png` },
  { name: 'Aditya Anand Gupta', role: 'Head, DAV Team', email: 'heads.davteam@gmail.com', linkedin: 'aditya-anand-gupta-3a7508299', division: 'DAV', img: `${BASE}Aditya Anand Gupta.png` },
  { name: 'Parag Ingle', role: 'Inst. Secretary International Relations', email: 'isecir.iitb@gmail.com', linkedin: 'parag-ingle-415941247', division: 'ISIR', img: `${BASE}Parag Ingle.png` },
  { name: 'Abhijat Bharadwaj', role: 'Web Head', email: 'web.ugac@iitb.ac.in', linkedin: 'abhijat-bharadwaj-459b26227', division: 'Web', img: `${BASE}Abhijat Bharadwaj.png` },
  { name: 'Shrey Aggarwal', role: 'Web Head', email: 'web.ugac@iitb.ac.in', linkedin: 'shrey-aggarwal-5606a8223', division: 'Web', img: `${BASE}Shrey Aggarwal.png` },
];

const divisions = ['All', 'UGAC', 'Analytics', 'Consult', 'Finance', 'EnPoWER', 'Career Cell', 'SSS', 'CCG', 'Investment', 'DAV', 'ISIR', 'Web'];

function initials(name) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('');
}

export default function Team() {
  const [active, setActive] = useState('All');
  const members = active === 'All' ? allMembers : allMembers.filter(m => m.division === active);

  return (
    <section className="team-section" id="team">
      <div className="team-header">
        <div className="team-header-left">
          <h2 className="team-headline">
            <span className="team-headline-small">Meet</span>
            <span className="team-headline-big">the</span>
            <span className="team-headline-accent">Team</span>
            <span className="team-headline-year">2026–27</span>
          </h2>
        </div>
      </div>

      <div className="team-tabs">
        {divisions.map(d => (
          <button
            key={d}
            className={`team-tab${active === d ? ' active' : ''}`}
            onClick={() => setActive(d)}
          >{d}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="team-grid"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {members.map((m, i) => (
            <motion.div
              key={m.name}
              className="team-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="team-card-photo">
                {m.img
                  ? <img src={m.img} alt={m.name} className="team-card-img" />
                  : <span className="team-card-initials">{initials(m.name)}</span>
                }
                <div className="team-card-overlay">
                  <a href={`mailto:${m.email}`} className="team-card-link" aria-label="Email">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13L2 4"/></svg>
                  </a>
                  <a href={`https://linkedin.com/in/${m.linkedin}`} target="_blank" rel="noreferrer" className="team-card-link" aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                </div>
              </div>
              <div className="team-card-info">
                <div className="team-card-name">{m.name}</div>
                <div className="team-card-role">{m.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
