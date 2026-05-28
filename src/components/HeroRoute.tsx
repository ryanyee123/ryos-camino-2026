'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Town coordinates mapped to SVG viewBox (0 0 800 200).
 * Derived from real lng/lat, walking order: Sarria → Santiago (right to left).
 */
const towns = [
  { x: 750, y: 150, label: 'Sarria' },
  { x: 625, y: 133, label: 'Portomarín' },
  { x: 468, y: 88, label: 'Palas de Rei' },
  { x: 379, y: 59, label: 'Melide' },
  { x: 288, y: 50, label: 'Arzúa' },
  { x: 161, y: 65, label: 'O Pedrouzo' },
  { x: 50, y: 83, label: 'Santiago' },
];

/** Build a smooth cubic bezier path through points (Catmull-Rom → cubic bezier) */
function buildPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return '';

  const d: string[] = [`M ${points[0].x},${points[0].y}`];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    // Catmull-Rom to cubic bezier control points (tension = 0.3)
    const t = 0.3;
    const cp1x = p1.x + (p2.x - p0.x) * t;
    const cp1y = p1.y + (p2.y - p0.y) * t;
    const cp2x = p2.x - (p3.x - p1.x) * t;
    const cp2y = p2.y - (p3.y - p1.y) * t;

    d.push(`C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`);
  }

  return d.join(' ');
}

export default function HeroRoute() {
  const pathRef = useRef<SVGPathElement>(null);
  const [ready, setReady] = useState(false);
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    setPathLength(len);
    // Trigger animation on next frame
    requestAnimationFrame(() => setReady(true));
  }, []);

  const d = buildPath(towns);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg
        viewBox="0 0 800 200"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        fill="none"
      >
        {/* Faint ghost of the full path */}
        <path
          d={d}
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.06"
        />

        {/* Animated route trace */}
        <path
          ref={pathRef}
          d={d}
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{
            strokeDasharray: pathLength || 1000,
            strokeDashoffset: ready ? 0 : pathLength || 1000,
            transition: 'stroke-dashoffset 2.4s cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: 0.18,
          }}
        />

        {/* Town dots — fade in sequentially */}
        {towns.map((town, i) => (
          <circle
            key={town.label}
            cx={town.x}
            cy={town.y}
            r={i === 0 || i === towns.length - 1 ? 4 : 2.5}
            fill={i === 0 || i === towns.length - 1 ? 'var(--color-accent)' : 'var(--color-ink-faint)'}
            style={{
              opacity: ready ? (i === 0 || i === towns.length - 1 ? 0.25 : 0.12) : 0,
              transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)`,
              transitionDelay: `${0.4 + i * 0.3}s`,
            }}
          />
        ))}

        {/* Start & end labels */}
        <text
          x={towns[0].x}
          y={towns[0].y + 18}
          textAnchor="middle"
          className="text-[10px] font-medium"
          fill="var(--color-ink-faint)"
          style={{
            opacity: ready ? 0.3 : 0,
            transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '0.7s',
          }}
        >
          Sarria
        </text>
        <text
          x={towns[towns.length - 1].x}
          y={towns[towns.length - 1].y + 18}
          textAnchor="middle"
          className="text-[10px] font-medium"
          fill="var(--color-ink-faint)"
          style={{
            opacity: ready ? 0.3 : 0,
            transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
            transitionDelay: '2.2s',
          }}
        >
          Santiago
        </text>
      </svg>
    </div>
  );
}
