'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Town coordinates mapped to SVG viewBox (0 0 900 80).
 * Mirroring the map: Santiago on the left (west), Sarria on the right (east).
 * Path defined Sarria → Santiago so the draw animation goes right-to-left.
 * Y positions tuned to approximate the actual route's terrain profile.
 */
const towns = [
  { x: 840, y: 52, label: 'Sarria' },
  { x: 710, y: 34, label: 'Portomarín' },
  { x: 555, y: 28, label: 'Palas de Rei' },
  { x: 450, y: 24, label: 'Melide' },
  { x: 350, y: 32, label: 'Arzúa' },
  { x: 210, y: 42, label: 'O Pedrouzo' },
  { x: 80, y: 48, label: 'Santiago' },
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
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionMq.matches);

    const mobileMq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mobileMq.matches);

    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    setPathLength(len);
    requestAnimationFrame(() => setReady(true));
  }, []);

  const d = buildPath(towns);

  return (
    <div className="mx-auto px-0 md:max-w-6xl md:px-6" aria-hidden="true">
      <div className="py-6">
        <svg
          viewBox={isMobile ? '-10 -10 920 100' : '0 -5 900 90'}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto"
          fill="none"
        >
          {/* Faint ghost of the full path */}
          <path
            d={d}
            stroke="var(--color-accent)"
            strokeWidth={isMobile ? 4 : 1.5}
            strokeLinecap="round"
            opacity={isMobile ? 0.12 : 0.08}
          />

          {/* Animated route trace — draws right-to-left (Sarria → Santiago) */}
          <path
            ref={pathRef}
            d={d}
            stroke="var(--color-accent)"
            strokeWidth={isMobile ? 6 : 2}
            strokeLinecap="round"
            style={
              reducedMotion
                ? { opacity: isMobile ? 0.35 : 0.25 }
                : {
                    strokeDasharray: pathLength || 1000,
                    strokeDashoffset: ready ? 0 : pathLength || 1000,
                    transition:
                      'stroke-dashoffset 4.8s cubic-bezier(0.22, 1, 0.36, 1)',
                    opacity: isMobile ? 0.35 : 0.25,
                  }
            }
          />

          {/* Town dots */}
          {towns.map((town, i) => {
            const isEndpoint = i === 0 || i === towns.length - 1;
            return (
              <circle
                key={town.label}
                cx={town.x}
                cy={town.y}
                r={isEndpoint ? (isMobile ? 8 : 3.5) : (isMobile ? 4.5 : 2)}
                fill={
                  isEndpoint
                    ? 'var(--color-accent)'
                    : 'var(--color-ink-faint)'
                }
                style={
                  reducedMotion
                    ? { opacity: isEndpoint ? (isMobile ? 0.6 : 0.4) : (isMobile ? 0.25 : 0.15) }
                    : {
                        opacity: ready
                          ? isEndpoint
                            ? (isMobile ? 0.6 : 0.4)
                            : (isMobile ? 0.25 : 0.15)
                          : 0,
                        transition:
                          'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                        transitionDelay: `${0.4 + i * 0.3}s`,
                      }
                }
              />
            );
          })}

          {/* Sarria label (right endpoint) */}
          <text
            x={towns[0].x}
            y={towns[0].y - (isMobile ? 18 : 12)}
            textAnchor="middle"
            className={`${isMobile ? 'text-[26px]' : 'text-[14px]'} font-medium`}
            fill="var(--color-ink-muted)"
            style={
              reducedMotion
                ? { opacity: isMobile ? 0.65 : 0.5 }
                : {
                    opacity: ready ? (isMobile ? 0.65 : 0.5) : 0,
                    transition:
                      'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: '0.7s',
                  }
            }
          >
            Sarria
          </text>

          {/* Santiago label (left endpoint) */}
          <text
            x={towns[towns.length - 1].x}
            y={towns[towns.length - 1].y - (isMobile ? 18 : 12)}
            textAnchor="middle"
            className={`${isMobile ? 'text-[26px]' : 'text-[14px]'} font-medium`}
            fill="var(--color-ink-muted)"
            style={
              reducedMotion
                ? { opacity: isMobile ? 0.65 : 0.5 }
                : {
                    opacity: ready ? (isMobile ? 0.65 : 0.5) : 0,
                    transition:
                      'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: '2.2s',
                  }
            }
          >
            Santiago
          </text>
        </svg>
      </div>
    </div>
  );
}
