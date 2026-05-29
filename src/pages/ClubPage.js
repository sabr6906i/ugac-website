import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClub } from '../data/clubs';

const NAV_LINKS = ['Resources', 'People', 'Team'];

// Per-club frame counts (add more as you add videos)
const FRAME_COUNTS = {
  analytics: 192,
};

const lerpVal = (a, b, t) => a + (b - a) * t;

export default function ClubPage() {
  const { slug }  = useParams();
  const navigate  = useNavigate();
  const club      = getClub(slug);

  const canvasRef  = useRef(null);
  const framesRef  = useRef([]);
  const targetRef  = useRef(0);
  const rafRef     = useRef(null);
  const cursorRef  = useRef(null);
  const drawnIdx   = useRef(-1);

  const [loaded, setLoaded] = useState(false);
  const frameCount = FRAME_COUNTS[slug] || 0;
  const hasFrames  = frameCount > 0;

  useEffect(() => {
    if (!club) navigate('/', { replace: true });
  }, [club, navigate]);

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') navigate('/'); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [navigate]);

  // Cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    let raf, cx = 0, cy = 0, tx = 0, ty = 0;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    document.addEventListener('mousemove', onMove);
    const tick = () => {
      cx = lerpVal(cx, tx, 0.14);
      cy = lerpVal(cy, ty, 0.14);
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const expand = () => cursor.classList.add('big');
    const shrink = () => cursor.classList.remove('big');
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', expand);
      el.addEventListener('mouseleave', shrink);
    });
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  // Preload all frames
  useEffect(() => {
    if (!hasFrames) { setLoaded(true); return; }
    const imgs = [];
    let done = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = `/frames/${slug}/${String(i).padStart(4, '0')}.jpg`;
      img.onload = () => { done++; if (done === frameCount) setLoaded(true); };
      img.onerror = () => { done++; if (done === frameCount) setLoaded(true); };
      imgs.push(img);
    }
    framesRef.current = imgs;
  }, [slug, frameCount, hasFrames]);

  // RAF draw loop — canvas.drawImage is instant, no decode latency
  useEffect(() => {
    if (!loaded || !hasFrames) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const tick = () => {
      const idx = Math.min(frameCount - 1, Math.floor(targetRef.current * frameCount));
      if (idx !== drawnIdx.current) {
        const img = framesRef.current[idx];
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          drawnIdx.current = idx;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    // Draw frame 0 immediately
    const first = framesRef.current[0];
    if (first && first.complete) ctx.drawImage(first, 0, 0, canvas.width, canvas.height);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loaded, hasFrames, frameCount]);

  // Resize canvas to fill screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      drawnIdx.current = -1; // force redraw after resize
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Wheel
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 32;
      if (e.deltaMode === 2) dy *= 600;
      targetRef.current = Math.min(1, Math.max(0, targetRef.current + dy / 3000));
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  // Touch
  useEffect(() => {
    let lastY = null;
    const onStart = (e) => { lastY = e.touches[0].clientY; };
    const onMove  = (e) => {
      e.preventDefault();
      if (lastY === null) return;
      targetRef.current = Math.min(1, Math.max(0, targetRef.current + (lastY - e.touches[0].clientY) / 800));
      lastY = e.touches[0].clientY;
    };
    window.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove',  onMove,  { passive: false });
    window.addEventListener('touchend',   () => { lastY = null; });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove',  onMove);
    };
  }, []);

  if (!club) return null;

  return (
    <div className="club-page">
      <div id="custom-cursor" ref={cursorRef} />

      {/* Canvas frame renderer */}
      <canvas ref={canvasRef} className="club-canvas" />
      <div className="club-bg-overlay" />

      {/* Loading state */}
      {!loaded && (
        <div className="club-loading">
          <span className="club-loading-text">Loading</span>
        </div>
      )}

      <header className="club-header">
        <button className="club-header-btn" onClick={() => navigate('/')}>← Back</button>
        <nav className="club-header-nav">
          {NAV_LINKS.map(l => (
            <button key={l} className="club-header-btn">{l}</button>
          ))}
        </nav>
        <div className="club-header-identity">
          <img src={club.logo} alt={club.name} className="club-header-logo" />
          <span className="club-header-name">{club.name}</span>
        </div>
        <span className="club-header-num">{club.num} / 10</span>
      </header>
    </div>
  );
}
