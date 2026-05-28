// PLACEHOLDER topo pattern — generated via noise field + marching squares.
// Swap in a designed SVG asset later by replacing the <svg> contents.
// Keep the wrapper + parallax logic intact.
'use client';

import { useEffect, useRef, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Parameters (tuned via dev panel, now hardcoded)
// ---------------------------------------------------------------------------

const OPACITY = 0.04;
const STROKE_WIDTH = 1.2;
const NOISE_SCALE = 3.3;
const CONTOUR_LEVELS = 14;
const OCTAVES = 4;
const SMOOTHING = 0.25;

// ---------------------------------------------------------------------------
// 2D Value noise (deterministic, no dependencies)
// ---------------------------------------------------------------------------

function hashInt(x: number, y: number): number {
  let h = (x * 374761393 + y * 668265263 + 1013904223) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h = h ^ (h >>> 16);
  return h;
}

function noise2d(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;

  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const v00 = (hashInt(ix, iy) & 0xffff) / 0xffff;
  const v10 = (hashInt(ix + 1, iy) & 0xffff) / 0xffff;
  const v01 = (hashInt(ix, iy + 1) & 0xffff) / 0xffff;
  const v11 = (hashInt(ix + 1, iy + 1) & 0xffff) / 0xffff;

  const a = v00 + (v10 - v00) * sx;
  const b = v01 + (v11 - v01) * sx;
  return a + (b - a) * sy;
}

function fbm(x: number, y: number, octaves: number): number {
  let value = 0;
  let amplitude = 1;
  let frequency = 1;
  let maxAmp = 0;

  for (let i = 0; i < octaves; i++) {
    value += noise2d(x * frequency, y * frequency) * amplitude;
    maxAmp += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  return value / maxAmp;
}

// ---------------------------------------------------------------------------
// Marching squares — extract iso-lines from a scalar field
// ---------------------------------------------------------------------------

type Point = [number, number];
type Segment = [Point, Point];

function sampleField(gridW: number, gridH: number): number[][] {
  const field: number[][] = [];
  for (let j = 0; j <= gridH; j++) {
    const row: number[] = [];
    for (let i = 0; i <= gridW; i++) {
      row.push(fbm((i / gridW) * NOISE_SCALE, (j / gridH) * NOISE_SCALE, OCTAVES));
    }
    field.push(row);
  }
  return field;
}

function extractSegments(field: number[][], threshold: number, cellW: number, cellH: number): Segment[] {
  const rows = field.length - 1;
  const cols = field[0].length - 1;
  const segments: Segment[] = [];

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const bl = field[j][i];
      const br = field[j][i + 1];
      const tr = field[j + 1][i + 1];
      const tl = field[j + 1][i];

      const caseIdx =
        (bl >= threshold ? 1 : 0) |
        (br >= threshold ? 2 : 0) |
        (tr >= threshold ? 4 : 0) |
        (tl >= threshold ? 8 : 0);

      if (caseIdx === 0 || caseIdx === 15) continue;

      const t = (v1: number, v2: number) => {
        const d = v2 - v1;
        return Math.abs(d) < 1e-8 ? 0.5 : (threshold - v1) / d;
      };

      const x0 = i * cellW;
      const y0 = j * cellH;

      const bottom: Point = [x0 + t(bl, br) * cellW, y0];
      const right: Point = [x0 + cellW, y0 + t(br, tr) * cellH];
      const top: Point = [x0 + t(tl, tr) * cellW, y0 + cellH];
      const left: Point = [x0, y0 + t(bl, tl) * cellH];

      switch (caseIdx) {
        case 1: case 14: segments.push([left, bottom]); break;
        case 2: case 13: segments.push([bottom, right]); break;
        case 3: case 12: segments.push([left, right]); break;
        case 4: case 11: segments.push([right, top]); break;
        case 6: case 9: segments.push([bottom, top]); break;
        case 7: case 8: segments.push([left, top]); break;
        case 5: {
          const center = (bl + br + tr + tl) / 4;
          if (center >= threshold) {
            segments.push([left, top]);
            segments.push([bottom, right]);
          } else {
            segments.push([left, bottom]);
            segments.push([right, top]);
          }
          break;
        }
        case 10: {
          const center = (bl + br + tr + tl) / 4;
          if (center >= threshold) {
            segments.push([left, bottom]);
            segments.push([right, top]);
          } else {
            segments.push([left, top]);
            segments.push([bottom, right]);
          }
          break;
        }
      }
    }
  }

  return segments;
}

// ---------------------------------------------------------------------------
// Chain segments into polylines
// ---------------------------------------------------------------------------

function chainSegments(segments: Segment[]): Point[][] {
  if (segments.length === 0) return [];

  const EPS = 0.01;
  const key = (p: Point) => `${(p[0] / EPS) | 0},${(p[1] / EPS) | 0}`;

  const adj = new Map<string, number[]>();
  for (let i = 0; i < segments.length; i++) {
    for (const p of segments[i]) {
      const k = key(p);
      const list = adj.get(k) ?? [];
      list.push(i);
      adj.set(k, list);
    }
  }

  const used = new Set<number>();
  const chains: Point[][] = [];

  for (let startIdx = 0; startIdx < segments.length; startIdx++) {
    if (used.has(startIdx)) continue;
    used.add(startIdx);

    const chain: Point[] = [segments[startIdx][0], segments[startIdx][1]];

    let extended = true;
    while (extended) {
      extended = false;
      const tail = chain[chain.length - 1];
      const k = key(tail);
      const neighbors = adj.get(k);
      if (!neighbors) break;
      for (const ni of neighbors) {
        if (used.has(ni)) continue;
        const seg = segments[ni];
        const k0 = key(seg[0]);
        const k1 = key(seg[1]);
        if (k0 === k) {
          chain.push(seg[1]);
          used.add(ni);
          extended = true;
          break;
        } else if (k1 === k) {
          chain.push(seg[0]);
          used.add(ni);
          extended = true;
          break;
        }
      }
    }

    extended = true;
    while (extended) {
      extended = false;
      const head = chain[0];
      const k = key(head);
      const neighbors = adj.get(k);
      if (!neighbors) break;
      for (const ni of neighbors) {
        if (used.has(ni)) continue;
        const seg = segments[ni];
        const k0 = key(seg[0]);
        const k1 = key(seg[1]);
        if (k0 === k) {
          chain.unshift(seg[1]);
          used.add(ni);
          extended = true;
          break;
        } else if (k1 === k) {
          chain.unshift(seg[0]);
          used.add(ni);
          extended = true;
          break;
        }
      }
    }

    if (chain.length >= 3) chains.push(chain);
  }

  return chains;
}

// ---------------------------------------------------------------------------
// Polyline → smooth SVG path (Catmull-Rom → cubic bezier)
// ---------------------------------------------------------------------------

function polylineToPath(pts: Point[]): string {
  if (pts.length < 2) return '';
  if (pts.length === 2) {
    return `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)} L${pts[1][0].toFixed(1)},${pts[1][1].toFixed(1)}`;
  }

  const d: string[] = [`M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`];

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(i + 2, pts.length - 1)];

    const cp1x = p1[0] + (p2[0] - p0[0]) * SMOOTHING;
    const cp1y = p1[1] + (p2[1] - p0[1]) * SMOOTHING;
    const cp2x = p2[0] - (p3[0] - p1[0]) * SMOOTHING;
    const cp2y = p2[1] - (p3[1] - p1[1]) * SMOOTHING;

    d.push(
      `C${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`,
    );
  }

  return d.join(' ');
}

// ---------------------------------------------------------------------------
// Pre-generate contour paths at module level (deterministic)
// ---------------------------------------------------------------------------

const VB_W = 1600;
const VB_H = 1000;
const GRID_W = 100;
const GRID_H = 62;

function generateContours(): string[] {
  const field = sampleField(GRID_W, GRID_H);
  const cellW = VB_W / GRID_W;
  const cellH = VB_H / GRID_H;

  let min = Infinity;
  let max = -Infinity;
  for (const row of field) {
    for (const v of row) {
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }

  const paths: string[] = [];
  const margin = (max - min) * 0.05;

  for (let i = 1; i <= CONTOUR_LEVELS; i++) {
    const threshold = min + margin + ((max - min - 2 * margin) * i) / (CONTOUR_LEVELS + 1);
    const segments = extractSegments(field, threshold, cellW, cellH);
    const chains = chainSegments(segments);
    for (const chain of chains) {
      const path = polylineToPath(chain);
      if (path) paths.push(path);
    }
  }

  return paths;
}

const contourPaths = generateContours();

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TopoBackground() {
  const innerRef = useRef<SVGSVGElement>(null);

  const setup = useCallback(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReduced) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const MAX_TRANSLATE = 12;

    const onMouseMove = (e: MouseEvent) => {
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
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <svg
        ref={innerRef}
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-[calc(100%+24px)] h-[calc(100%+24px)] -top-3 -left-3"
        style={{ opacity: OPACITY, willChange: 'transform' }}
      >
        {contourPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#1C1917"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
}
