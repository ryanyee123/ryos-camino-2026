// PLACEHOLDER topo pattern — generated procedurally. Swap in a designed SVG asset
// later by replacing the <svg> contents. Keep the wrapper + parallax logic intact.
'use client';

import { useEffect, useRef, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Procedural contour generation
// ---------------------------------------------------------------------------

/** Generate an irregular closed ring (bezier path) around a center point. */
function generateRing(
  cx: number,
  cy: number,
  radius: number,
  points: number,
  seed: number,
): string {
  const pts: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const angle = (Math.PI * 2 * i) / points;
    // Organic wobble using layered sine waves seeded per ring
    const wobble =
      1 +
      0.18 * Math.sin(angle * 3 + seed) +
      0.12 * Math.sin(angle * 5 + seed * 1.7) +
      0.06 * Math.sin(angle * 7 + seed * 2.3);
    pts.push([cx + radius * wobble * Math.cos(angle), cy + radius * wobble * Math.sin(angle)]);
  }

  // Build a smooth closed cubic bezier through the points
  const segs: string[] = [];
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[(i - 1 + pts.length) % pts.length];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % pts.length];
    const p3 = pts[(i + 2) % pts.length];

    // Catmull-Rom → cubic bezier control points
    const tension = 6;
    const cp1x = p1[0] + (p2[0] - p0[0]) / tension;
    const cp1y = p1[1] + (p2[1] - p0[1]) / tension;
    const cp2x = p2[0] - (p3[0] - p1[0]) / tension;
    const cp2y = p2[1] - (p3[1] - p1[1]) / tension;

    if (i === 0) {
      segs.push(`M${p1[0].toFixed(1)},${p1[1].toFixed(1)}`);
    }
    segs.push(
      `C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`,
    );
  }
  segs.push('Z');
  return segs.join(' ');
}

type Island = { cx: number; cy: number; baseRadius: number; rings: number; seed: number };

/** Deterministic set of contour islands spread across the canvas. */
const islands: Island[] = [
  { cx: 160, cy: 180, baseRadius: 40, rings: 6, seed: 1.2 },
  { cx: 520, cy: 120, baseRadius: 55, rings: 7, seed: 3.1 },
  { cx: 880, cy: 280, baseRadius: 48, rings: 5, seed: 5.4 },
  { cx: 1280, cy: 160, baseRadius: 62, rings: 8, seed: 7.8 },
  { cx: 300, cy: 520, baseRadius: 50, rings: 6, seed: 2.5 },
  { cx: 720, cy: 600, baseRadius: 44, rings: 5, seed: 4.9 },
  { cx: 1100, cy: 500, baseRadius: 58, rings: 7, seed: 6.3 },
  { cx: 1440, cy: 650, baseRadius: 42, rings: 5, seed: 8.1 },
  { cx: 200, cy: 800, baseRadius: 52, rings: 6, seed: 0.7 },
  { cx: 600, cy: 880, baseRadius: 46, rings: 5, seed: 9.2 },
];

function generateAllPaths(): string[] {
  const paths: string[] = [];
  for (const island of islands) {
    const points = 12; // vertices per ring — enough for organic feel
    for (let r = 0; r < island.rings; r++) {
      const radius = island.baseRadius + r * 18;
      const seed = island.seed + r * 0.6;
      paths.push(generateRing(island.cx, island.cy, radius, points, seed));
    }
  }
  return paths;
}

// Pre-generate once at module level (deterministic, no randomness)
const contourPaths = generateAllPaths();

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TopoBackground() {
  const innerRef = useRef<SVGSVGElement>(null);

  const setup = useCallback(() => {
    // Guard: desktop with fine pointer + no reduced-motion preference
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReduced) return; // static render, no parallax

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const MAX_TRANSLATE = 12;

    const onMouseMove = (e: MouseEvent) => {
      // Offset from viewport center, normalized to [-1, 1]
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetX = nx * MAX_TRANSLATE;
      targetY = ny * MAX_TRANSLATE;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px,${currentY.toFixed(2)}px,0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const cleanup = setup();
    return () => cleanup?.();
  }, [setup]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      <svg
        ref={innerRef}
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-[calc(100%+24px)] h-[calc(100%+24px)] -top-3 -left-3"
        style={{ opacity: 0.04, willChange: 'transform' }}
      >
        {contourPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#1C1917"
            strokeWidth={1.2}
          />
        ))}
      </svg>
    </div>
  );
}
