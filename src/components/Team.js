import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplitTextReveal from './SplitTextReveal';

const BASE = '/images/team/';

const allMembers = [
  { name: 'Kartik Shilpi Singhal', role: 'General Secretary\nAcademic Affairs (UG)', email: 'gsecaaug@iitb.ac.in', linkedin: 'thekartiksinghal', tier: 'leadership', img: `${BASE}Kartik Shilpi Singhal.png` },
  { name: 'Avani Gala', role: 'Inst. Secretary AA\n& Head, SSS', email: 'isaa.sss.iitb@gmail.com', linkedin: 'avani-gala-ba12b0222', tier: 'leadership', img: `${BASE}Avani Gala.png` },
  { name: 'Parv Khandelwal', role: 'Inst. Secretary AA\n& Head, Career Cell', email: 'isaa.careercell.iitb@gmail.com', linkedin: 'parv-khandelwal-iitb', tier: 'leadership', img: `${BASE}Parv Khandelwal.png` },
  { name: 'Dev Arora', role: 'Inst. Secretary AA\n& Head, EnPoWER', email: 'isaa.enpower.iitb@gmail.com', linkedin: 'dev-arora-b5857731b', tier: 'leadership', img: `${BASE}Dev Arora.png` },
  { name: 'Rupanshi Vijayvargiya', role: 'Inst. Secretary AA\n& Head, EnPoWER', email: 'isaa.enpower.iitb@gmail.com', linkedin: 'rupanshi-vijayvargiya-970a18287', tier: 'leadership', img: `${BASE}Rupanshi Vijayvargiya.png` },
  { name: 'Aryan Kashyap', role: 'Manager\nAnalytics Club', email: 'manager.analytics.iitb@gmail.com', linkedin: 'aryan-kshyp', tier: 'managers', img: `${BASE}Aryan Kashyap.png` },
  { name: 'Anjali Jangid', role: 'Manager\nConsult Club', email: 'manager.consultclub.iitb@gmail.com', linkedin: 'anjali-jangid-68326229b', tier: 'managers', img: `${BASE}Anjali Jangid.png` },
  { name: 'Kopal Goel', role: 'Manager\nFinance Club', email: 'manager.finance.iitb@gmail.com', linkedin: 'kopal-goel-010064294', tier: 'managers', img: `${BASE}Kopal Goel.png` },
  { name: 'Ritwik Raghav', role: 'Manager\nFinance Club', email: 'manager.finance.iitb@gmail.com', linkedin: 'ritwik-raghav-019215291', tier: 'managers', img: `${BASE}Ritwik Raghav.png` },
  { name: 'Ved Parulekar', role: 'President\nConsulting Core Group', email: 'presidentccg1@gmail.com', linkedin: 'ved-parulekar-8ab221283', tier: 'managers', img: `${BASE}Ved Parulekar.png` },
  { name: 'Atharva Mittal', role: 'Fund Manager\nInvestment Team', email: 'investmentteam.ugac.iitb@gmail.com', linkedin: 'atharva-mittal-374b74251', tier: 'managers', img: `${BASE}Atharva Mittal.png` },
  { name: 'Aryan Tewari', role: 'Principal\nInvestment Team', email: 'investmentteam.ugac.iitb@gmail.com', linkedin: 'aryan-tewari-372170257', tier: 'managers', img: `${BASE}Aryan Tewari.png` },
  { name: 'Prince Kumar', role: 'Head\nDAV Team', email: 'heads.davteam@gmail.com', linkedin: 'prince-kumar-880734270', tier: 'managers', img: `${BASE}Prince Kumar.png` },
  { name: 'Aditya Anand Gupta', role: 'Head\nDAV Team', email: 'heads.davteam@gmail.com', linkedin: 'aditya-anand-gupta-3a7508299', tier: 'managers', img: `${BASE}Aditya Anand Gupta.png` },
  { name: 'Parag Ingle', role: 'Inst. Secretary\nInternational Relations', email: 'isecir.iitb@gmail.com', linkedin: 'parag-ingle-415941247', tier: 'managers', img: `${BASE}Parag Ingle.png` },
  { name: 'Abhijat Bharadwaj', role: 'Web Head', email: 'web.ugac@iitb.ac.in', linkedin: 'abhijat-bharadwaj-459b26227', tier: 'web', img: `${BASE}Abhijat Bharadwaj.png` },
  { name: 'Shrey Aggarwal', role: 'Web Head', email: 'web.ugac@iitb.ac.in', linkedin: 'shrey-aggarwal-5606a8223', tier: 'web', img: `${BASE}Shrey Aggarwal.png` },
];

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'leadership', label: 'Core Leadership' },
  { key: 'managers', label: 'Division Heads' },
  { key: 'web', label: 'Web Team' },
];

function initials(name) {
  return name.split(' ').slice(0, 2).map(n => n[0]).join('');
}

export default function Team() {
  const [active, setActive] = useState('all');
  const members = active === 'all' ? allMembers : allMembers.filter(m => m.tier === active);

  return (
    <section className="team-section" id="team">
      <div className="team-header-row">
        <div>
          <div className="s-label" style={{ marginBottom: '0.75rem' }}>The Council</div>
          <SplitTextReveal
            as="h2"
            className="team-section-title"
            lines={['Meet the Team', '2025–26']}
          />
        </div>
        <p className="team-section-desc">17 dedicated student leaders across 10 divisions, driving academic excellence institute-wide.</p>
      </div>

      <div className="team-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`team-tab${active === t.key ? ' active' : ''}`}
            onClick={() => setActive(t.key)}
          >{t.label}</button>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="team-avatar">
                {m.img
                  ? <img src={m.img} alt={m.name} className="team-avatar-img" />
                  : initials(m.name)
                }
              </div>
              <div className="team-info">
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
                <div className="team-links">
                  <a href={`mailto:${m.email}`} className="team-link">↗ Email</a>
                  <a href={`https://linkedin.com/in/${m.linkedin}`} target="_blank" rel="noreferrer" className="team-link">↗ LinkedIn</a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
