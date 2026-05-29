const items = [
  { label: 'Learners\' Space', value: '6K+ Registrations' },
  { label: 'SURP 2025', value: '79 Research Projects' },
  { label: 'ENTHUSE', value: '1400+ Students' },
  { label: 'BCC Prize Pool', value: '₹1.4 Lakhs' },
  { label: 'ResoBin Resources', value: '5000+ Uploaded' },
  { label: 'ConsultX', value: '240+ Registrations' },
  { label: 'Stratify Teams', value: '300+ Participated' },
  { label: 'Quant101', value: '1200+ Registrations' },
  { label: 'TSCs Conducted', value: '51 Sessions' },
  { label: 'Career Cell Community', value: '1400+ Members' },
  { label: 'Hackathon Prize Pool', value: '₹1.7 Lakhs' },
];

const doubled = [...items, ...items];

export default function Marquee() {
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            {i < doubled.length - 1 && <span className="marquee-sep" />}
          </div>
        ))}
      </div>
    </div>
  );
}
