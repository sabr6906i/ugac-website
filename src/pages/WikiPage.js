import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplitTextReveal from '../components/SplitTextReveal';
import { quickLinks, contacts, getUpcoming, getCompleted } from '../data/sessions';

const PAGE_SIZE = 4;
const TABS = [
  { key: 'resources', label: 'Resources' },
  { key: 'calendar', label: 'Calendar' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'archive', label: 'Archive' },
  { key: 'contact', label: 'Reach Out' },
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const ease = [0.22, 1, 0.36, 1];
const pad2 = n => String(n).padStart(2, '0');

function toGoogleCal(session) {
  const [h, m] = session.time.split(':').map(Number);
  const start = session.date.replace(/-/g, '') + 'T' + pad2(h) + pad2(m) + '00';
  const end = session.date.replace(/-/g, '') + 'T' + pad2(h + 2) + pad2(m) + '00';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${session.course}: ${session.name}`,
    dates: `${start}/${end}`,
    details: `${session.desc}\n\nTutors: ${session.takers.map(t => `${t.name} (${t.email})`).join(', ')}`,
    location: session.venue,
  });
  return `https://www.google.com/calendar/render?${params}`;
}

function matchesSearch(session, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    session.course.toLowerCase().includes(q) ||
    session.name.toLowerCase().includes(q) ||
    session.takers.some(t => t.name.toLowerCase().includes(q)) ||
    session.tags.some(tag => tag.toLowerCase().includes(q)) ||
    session.desc.toLowerCase().includes(q)
  );
}

function SessionList({ sessions, emptyMsg }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => sessions.filter(s => matchesSearch(s, query)), [sessions, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value);
    setPage(1);
  }, []);

  return (
    <div>
      <div className="wiki-search">
        <span className="wiki-search-icon">⌕</span>
        <input className="wiki-search-input" type="text" placeholder="Search by course, tutor, or keyword…" value={query} onChange={handleSearch} />
        {query && <button className="wiki-search-clear" onClick={() => { setQuery(''); setPage(1); }}>✕</button>}
      </div>

      <div className="wiki-meta">
        <span className="wiki-meta-count">{filtered.length} session{filtered.length !== 1 ? 's' : ''}{query ? ` matching “${query}”` : ''}</span>
      </div>

      {filtered.length > 0 ? (
        <>
          <div className="s-card-list">{paged.map(s => <SessionCard key={s.id} session={s} />)}</div>
          {totalPages > 1 && (
            <div className="wiki-pages">
              <button className="wiki-page-btn" disabled={safePage <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>← Prev</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`wiki-page-btn${safePage === i + 1 ? ' wiki-page-btn--active' : ''}`} onClick={() => setPage(i + 1)}>
                  {i + 1}
                </button>
              ))}
              <button className="wiki-page-btn" disabled={safePage >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next →</button>
            </div>
          )}
        </>
      ) : (
        <p className="wiki-empty">{emptyMsg || 'No sessions found.'}</p>
      )}
    </div>
  );
}

function CalendarView({ sessions }) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const sessionMap = useMemo(() => {
    const m = {};
    sessions.forEach(s => { if (!m[s.date]) m[s.date] = []; m[s.date].push(s); });
    return m;
  }, [sessions]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const todayStr = new Date().toISOString().slice(0, 10);

  const nav = d => { let m = month + d, y = year; if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; } setMonth(m); setYear(y); setSelectedDate(null); };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(<div key={`e-${i}`} className="cal-cell cal-cell--empty" />);
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${year}-${pad2(month + 1)}-${pad2(d)}`;
    const daySessions = sessionMap[ds] || [];
    const has = daySessions.length > 0;
    const codes = has ? daySessions.map(s => s.course) : [];
    const extra = codes.length > 1 ? codes.length - 1 : 0;
    cells.push(
      <button key={ds} className={`cal-cell${has ? ' cal-cell--has' : ''}${ds === todayStr ? ' cal-cell--today' : ''}${ds === selectedDate ? ' cal-cell--sel' : ''}`}
        onClick={() => has && setSelectedDate(ds === selectedDate ? null : ds)} disabled={!has}
      >
        <span className="cal-num">{d}</span>
        {has && (
          <div className="cal-codes-wrap">
            <span className="cal-codes">{codes[0]}</span>
            {extra > 0 && <span className="cal-extra">+{extra}</span>}
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="wiki-cal">
      <div className="cal-head">
        <button className="cal-arrow" onClick={() => nav(-1)}>←</button>
        <span className="cal-label">{MONTHS[month]} {year}</span>
        <button className="cal-arrow" onClick={() => nav(1)}>→</button>
      </div>
      <div className="cal-grid">
        {DAYS.map(d => <div key={d} className="cal-heading">{d}</div>)}
        {cells}
      </div>
      <AnimatePresence mode="wait">
        {selectedDate && sessionMap[selectedDate] && (
          <motion.div key={selectedDate} className="cal-detail"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}
          >
            <div className="cal-detail-label">Sessions on {selectedDate}</div>
            {sessionMap[selectedDate].map(s => (
              <div key={s.id} className="cal-detail-row">
                <div>
                  <div className="cal-detail-course">{s.course}</div>
                  <div className="cal-detail-name">{s.name}</div>
                  <div className="cal-detail-time">{s.time} · {s.duration}</div>
                </div>
                <a href={toGoogleCal(s)} target="_blank" rel="noreferrer" className="cal-btn">+ Calendar</a>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SessionCard({ session }) {
  const [open, setOpen] = useState(false);
  const isUpcoming = session.status === 'upcoming';

  return (
    <motion.div layout className={`s-card${open ? ' s-card--open' : ''}`} initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}
    >
      <button className="s-card-top" onClick={() => setOpen(o => !o)}>
        <div className="s-card-info">
          <span className="s-card-badge">{session.course}</span>
          <div className="s-card-meta">
            <span className="s-card-name">{session.name}</span>
            <span className="s-card-date">{session.date} · {session.time} · {session.duration}</span>
          </div>
        </div>
        <div className="s-card-extra">
          <span className={`s-card-status s-card-status--${isUpcoming ? 'upcoming' : 'done'}`}>
            {isUpcoming ? 'Upcoming' : 'Archive'}
          </span>
          <motion.span className="s-card-arrow" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3, ease }}>↓</motion.span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="s-card-body"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }}
          >
            <p className="s-card-desc">{session.desc}</p>
            <div className="s-card-block">
              <span className="s-card-block-label">Tutors</span>
              <div className="s-card-tutors">
                {session.takers.map(t => (
                  <a key={t.email} href={`mailto:${t.email}`} className="s-card-tutor">
                    {t.name} <span className="s-card-tutor-email">↗ {t.email}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="s-card-block">
              <span className="s-card-block-label">Resources</span>
              <div className="s-card-resources">
                {session.resources.map(r => (
                  <a key={r.label} href={r.url} target="_blank" rel="noreferrer" className="s-card-resource">
                    <span className="s-card-resource-type">{r.type}</span> {r.label} ↗
                  </a>
                ))}
              </div>
            </div>
            <div className="s-card-tags">
              {session.tags.map(t => <span key={t} className="s-card-tag">{t}</span>)}
            </div>
            <a href={toGoogleCal(session)} target="_blank" rel="noreferrer" className="btn-primary s-card-cal-btn">+ Add to Google Calendar</a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TabContent({ active }) {
  const upcoming = getUpcoming();
  const completed = getCompleted();
  const all = [...upcoming, ...completed];

  switch (active) {
    case 'resources':
      return (
        <div className="wiki-panel">
          <div className="wiki-grid">
            {quickLinks.map((l, i) => {
              const isExternal = l.href.startsWith('http');
              return (
                <motion.a key={l.label} href={l.href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined} className="wiki-card"
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05, ease }}
                >
                  <span className="wiki-card-num">{pad2(i + 1)}</span>
                  <div>
                    <span className="wiki-card-label">{l.label} ↗</span>
                    <span className="wiki-card-desc">{l.desc}</span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      );

    case 'calendar':
      return (
        <div className="wiki-panel">
          <CalendarView sessions={all} />
        </div>
      );

    case 'upcoming':
      return (
        <div className="wiki-panel">
          <SessionList sessions={upcoming} emptyMsg="No upcoming sessions scheduled." />
        </div>
      );

    case 'archive':
      return (
        <div className="wiki-panel">
          <SessionList sessions={completed} emptyMsg="No past sessions available." />
        </div>
      );

    case 'contact':
      return (
        <div className="wiki-panel">
          <div className="wiki-contacts">
            {contacts.map((c, i) => (
              <motion.a key={c.label} href={c.href} className="wiki-contact"
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.06, ease }}
              >
                <span className="wiki-contact-label">{c.label}</span>
                <span className="wiki-contact-val">{c.value} ↗</span>
              </motion.a>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function WikiPage() {
  const [tab, setTab] = useState('resources');

  return (
    <div className="wiki-page">
      <section className="wiki-hero">
        <div className="wiki-hero-bg" aria-hidden="true">SSS</div>
        <div className="wiki-hero-inner">
          <div className="s-label" style={{ marginBottom: '0.75rem' }}>Student Support Services</div>
          <SplitTextReveal as="h1" className="wiki-hero-title" lines={['Academic Support', 'Wiki & Resources']} amount={0.3} />
          <p className="wiki-hero-desc">
            Tutorial Service Centres (TSCs) provide fast-paced revision sessions — one-shots covering entire courses 
            just before exams. Browse upcoming sessions, access resources from past ones, and add them to your calendar.
          </p>
        </div>
      </section>

      <div className="wiki-tabs" id="wiki-tabs">
        {TABS.map(t => (
          <button key={t.key} id={`wiki-${t.key}`} className={`wiki-tab${tab === t.key ? ' wiki-tab--active' : ''}`} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="wiki-body">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}>
            <TabContent active={tab} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
