'use client';

import { useEffect, useRef } from 'react';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function RollingDigit({
  digit,
  shouldAnimate,
  delay,
}: {
  digit: number;
  shouldAnimate: boolean;
  delay: number;
}) {
  return (
    <span className="inline-block overflow-hidden" style={{ height: '1em' }}>
      <span
        className="flex flex-col will-change-transform"
        style={{
          transition: shouldAnimate
            ? `transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
            : 'none',
          transform: `translateY(${-digit * 10}%)`,
        }}
      >
        {DIGITS.map((d) => (
          <span
            key={d}
            className="block"
            style={{ height: '1em', lineHeight: '1' }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function AnimatedValue({ value }: { value: string }) {
  const hasMounted = useRef(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      hasMounted.current = true;
    });
    return () => cancelAnimationFrame(id);
  }, []);

  let digitIndex = 0;

  return (
    <span className="inline-flex" aria-label={value}>
      {value.split('').map((char, i) => {
        const n = parseInt(char, 10);
        if (!isNaN(n)) {
          const stagger = digitIndex * 40;
          digitIndex++;
          return (
            <RollingDigit
              key={i}
              digit={n}
              shouldAnimate={hasMounted.current}
              delay={stagger}
            />
          );
        }
        return <span key={i}>{char}</span>;
      })}
    </span>
  );
}
