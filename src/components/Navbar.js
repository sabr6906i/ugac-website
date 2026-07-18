import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { clubs } from '../data/clubs';

const HOME_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Divisions', href: '#divisions', dropdown: clubs.map(c => ({ label: c.name, href: `/divisions/${c.slug}` })) },
  { label: 'Resources', href: '/wiki', dropdown: [
    { label: 'SSS Wiki', href: '/wiki' },
    { label: 'Calendar', href: '/wiki#calendar' },
    { label: 'Upcoming Sessions', href: '/wiki#upcoming' },
    { label: 'Past Archive', href: '/wiki#archive' },
  ]},
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

const WIKI_LINKS = [
  { label: 'Resources', href: '#wiki-resources' },
  { label: 'Calendar', href: '#wiki-calendar' },
  { label: 'Upcoming', href: '#wiki-upcoming' },
  { label: 'Archive', href: '#wiki-archive' },
  { label: 'Contact', href: '#wiki-contact' },
];

function scrollTo(hash) {
  const id = hash.replace('#', '');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'BUTTON' || el.getAttribute('role') === 'tab') {
      el.click();
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, 80);
}

export default function Navbar() {
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const timeoutRef = useRef(null);
  const isWiki = location.pathname === '/wiki';
  const isHome = location.pathname === '/';
  const links = isWiki ? WIKI_LINKS : HOME_LINKS;

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileAccordion(null);
  }, [location.pathname]);

  const handleDropdownEnter = useCallback((label) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  }, []);

  const handleClick = useCallback((href) => {
    setOpenDropdown(null);
    if (href.startsWith('#')) {
      if (isWiki) scrollTo(href);
      else if (isHome) scrollTo(href);
      else navigate('/' + href);
    } else if (href.includes('#') && !href.startsWith('#')) {
      const [path, hash] = href.split('#');
      if (location.pathname === path) {
        scrollTo('#' + hash);
      } else {
        navigate(path);
        setTimeout(() => scrollTo('#' + hash), 300);
      }
    } else {
      navigate(href);
    }
    setMobileOpen(false);
  }, [isHome, isWiki, navigate, location.pathname]);

  const handleCta = useCallback(() => {
    if (isHome) scrollTo('#contact');
    else if (isWiki) scrollTo('#wiki-contact');
    else navigate('/#contact');
    setMobileOpen(false);
  }, [isHome, isWiki, navigate]);

  return (
    <>
      <nav className={`nav-bar${scrolled ? ' nav-bar--scrolled' : ''}`} ref={navRef}>
        <Link to="/" className="nav-bar-logo">
          <img src="/ugac-logo.png" alt="UGAC" className="nav-bar-logo-img" />
        </Link>

        <div className="nav-bar-center">
          {links.map(l => (
            <div
              key={l.label}
              className="nav-item"
              onMouseEnter={() => l.dropdown && handleDropdownEnter(l.label)}
              onMouseLeave={() => l.dropdown && handleDropdownLeave()}
            >
              {l.dropdown ? (
                <>
                  <button
                    className={`nav-bar-link ${openDropdown === l.label ? 'nav-bar-link--active' : ''}`}
                    onClick={() => setOpenDropdown(openDropdown === l.label ? null : l.label)}
                  >
                    {l.label}
                    <svg className={`nav-chevron ${openDropdown === l.label ? 'nav-chevron--open' : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className={`nav-dropdown ${openDropdown === l.label ? 'nav-dropdown--open' : ''}`}>
                    {l.label === 'Divisions' ? (
                      <div className="nav-dropdown-grid">
                        {l.dropdown.map(item => (
                          <button key={item.href} className="nav-dropdown-item" onClick={() => handleClick(item.href)}>
                            <span className="nav-dropdown-item-label">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="nav-dropdown-list">
                        {l.dropdown.map(item => (
                          <button key={item.href} className="nav-dropdown-item" onClick={() => handleClick(item.href)}>
                            <span className="nav-dropdown-item-label">{item.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : l.href.startsWith('#') ? (
                <button className="nav-bar-link" onClick={() => handleClick(l.href)}>
                  {l.label}
                </button>
              ) : (
                <Link key={l.label} to={l.href} className="nav-bar-link" onClick={() => window.scrollTo(0, 0)}>
                  {l.label}
                </Link>
              )}
            </div>
          ))}
          <button className="nav-bar-dark" onClick={() => setDark(d => !d)} aria-label="Toggle dark mode">
            {dark ? '☀' : '☾'}
          </button>
        </div>

        <button className="nav-bar-cta" onClick={handleCta}>Get Involved</button>
      </nav>

      {/* Mobile */}
      <button className="nav-hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu">
        <span className={`nav-hamburger-line ${mobileOpen ? 'nav-hamburger-line--open' : ''}`} />
        <span className={`nav-hamburger-line ${mobileOpen ? 'nav-hamburger-line--open' : ''}`} />
      </button>

      <div className={`nav-mobile ${mobileOpen ? 'nav-mobile--open' : ''}`}>
        <div className="nav-mobile-inner">
          {links.map(l => (
            <div key={l.label} className="nav-mobile-group">
              {l.dropdown ? (
                <>
                  <button
                    className="nav-mobile-link"
                    onClick={() => setMobileAccordion(mobileAccordion === l.label ? null : l.label)}
                  >
                    {l.label}
                    <svg className={`nav-chevron ${mobileAccordion === l.label ? 'nav-chevron--open' : ''}`} width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className={`nav-mobile-accordion ${mobileAccordion === l.label ? 'nav-mobile-accordion--open' : ''}`}>
                    {l.dropdown.map(item => (
                      <button key={item.href} className="nav-mobile-sublink" onClick={() => handleClick(item.href)}>
                        {item.label}
                      </button>
                    ))}
                  </div>
                </>
              ) : l.href.startsWith('#') ? (
                <button className="nav-mobile-link" onClick={() => handleClick(l.href)}>
                  {l.label}
                </button>
              ) : (
                <Link to={l.href} className="nav-mobile-link" onClick={() => setMobileOpen(false)}>
                  {l.label}
                </Link>
              )}
            </div>
          ))}
          <div className="nav-mobile-divider" />
          <button className="nav-mobile-link" onClick={() => setDark(d => !d)}>
            {dark ? '☀ Light Mode' : '☾ Dark Mode'}
          </button>
          <button className="nav-mobile-cta" onClick={handleCta}>Get Involved</button>
        </div>
      </div>
    </>
  );
}
