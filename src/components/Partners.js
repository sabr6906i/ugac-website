import { useState } from 'react';

const partners = [
  { name: 'McKinsey & Co.',           slug: 'mckinsey' },
  { name: 'Goldman Sachs',            slug: 'goldman-sachs' },
  { name: 'Apollo Global Management', slug: 'apollo' },
  { name: 'American Express',         slug: 'american-express' },
  { name: 'P&G',                      slug: 'pg' },
  { name: 'Albatross Energetics',     slug: 'albatross' },
  { name: 'KIC | UnivAssist',         slug: 'kic-univassist' },
  { name: 'SINE — IIT Bombay',        slug: 'sine' },
  { name: 'Optiver',                  slug: 'optiver' },
  { name: 'Vertiv',                   slug: 'vertiv' },
];

function PartnerItem({ name, slug }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <span className="partners-marquee-text">{name}</span>
  ) : (
    <img
      src={`/images/partners/${slug}.png`}
      alt={name}
      className="partners-marquee-logo"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function Partners() {
  const doubled = [...partners, ...partners];
  return (
    <div className="partners-marquee" aria-label="Partners and recruiters">
      <div className="partners-marquee-track">
        {doubled.map((p, i) => (
          <PartnerItem key={`${p.slug}-${i}`} name={p.name} slug={p.slug} />
        ))}
      </div>
    </div>
  );
}
