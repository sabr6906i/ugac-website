import { motion, useReducedMotion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

function toLines({ text, lines }) {
  if (lines) {
    return lines.map(line => Array.isArray(line) ? line : [{ text: line }]);
  }
  return String(text || '')
    .split('\n')
    .map(line => [{ text: line }]);
}

function renderChars(text) {
  return Array.from(text).map((char, index) => (
    <motion.span
      key={`${char}-${index}`}
      className="split-char"
      aria-hidden="true"
      variants={{
        hidden: { y: '92%', opacity: 0 },
        show: { y: '0%', opacity: 1 },
      }}
      transition={{ duration: 0.85, ease }}
    >
      {char}
    </motion.span>
  ));
}

export default function SplitTextReveal({
  as = 'div',
  text,
  lines,
  className = '',
  amount = 0.35,
  delay = 0,
}) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as] || motion.div;
  const preparedLines = toLines({ text, lines });
  const label = preparedLines
    .map(line => line.map(segment => segment.text).join(''))
    .join(' ');

  if (reduceMotion) {
    return (
      <Tag className={className} aria-label={label}>
        {preparedLines.map((line, lineIndex) => (
          <span key={lineIndex} className="split-line-static">
            {line.map((segment, segmentIndex) => (
              <span key={segmentIndex} className={segment.className || undefined}>
                {segment.text}
              </span>
            ))}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag
      className={`${className} split-text-reveal`.trim()}
      aria-label={label}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delay,
            staggerChildren: 0.035,
          },
        },
      }}
    >
      {preparedLines.map((line, lineIndex) => (
        <span key={lineIndex} className="split-line" aria-hidden="true">
          {line.map((segment, segmentIndex) => (
            <span key={segmentIndex} className={segment.className || undefined}>
              {segment.text.split(/(\s+)/).map((part, partIndex) => (
                /\s+/.test(part) ? (
                  <span key={`space-${partIndex}`} className="split-space" aria-hidden="true">
                    {part.replace(/ /g, '\u00a0')}
                  </span>
                ) : (
                  <span key={`${part}-${partIndex}`} className="split-word">
                    {renderChars(part)}
                  </span>
                )
              ))}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
