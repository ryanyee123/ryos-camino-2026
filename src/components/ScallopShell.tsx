'use client';

import { useEffect, useState } from 'react';

const RIB_COUNT = 9;
const ANGLE_SPAN = 110; // -55° to +55° — tighter spread, less fan-like
const CENTER_X = 150;
const CENTER_Y = 190;
const NOTCH_DIST = 80; // distance from center where ribs begin (~55% of total)
const TIP_DIST = 145; // distance from center to rib tips
const RIB_TIP_HALF = 14; // half-width at tip
const RIB_BASE_HALF = 5; // half-width at notch line (narrow, visible gaps)
const SCALLOP_BULGE = 10; // how far the tip curves past the rib end

const ANGLES = Array.from({ length: RIB_COUNT }, (_, i) =>
  -ANGLE_SPAN / 2 + (i * ANGLE_SPAN) / (RIB_COUNT - 1)
);

const fmt = (n: number) => Math.round(n * 10) / 10;

function rotatePoint(x: number, y: number, angleDeg: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [
    x * Math.cos(rad) - y * Math.sin(rad) + CENTER_X,
    -(x * Math.sin(rad) + y * Math.cos(rad)) + CENTER_Y,
  ];
}

// Layer 1: Solid base body — covers entire lower portion of the shell
// Top edge follows an arc at NOTCH_DIST, sides taper to hinge, ear knobs at ±75°
const BASE_PATH = (() => {
  const earAngle = 60; // just outside outermost rib (55°)
  const earDist = 45;
  const earProtrude = 22; // large protrusion for visible ear knobs

  // Build top arc as series of points along the notch line
  const arcPoints: [number, number][] = [];
  const arcSteps = 24;
  for (let i = 0; i <= arcSteps; i++) {
    const a = -earAngle + (i / arcSteps) * (earAngle * 2);
    arcPoints.push(rotatePoint(0, NOTCH_DIST, a));
  }

  // Ear knob: the peak of each ear bump
  const [earLPeakX, earLPeakY] = rotatePoint(0, earDist + earProtrude, -earAngle);
  const [earRPeakX, earRPeakY] = rotatePoint(0, earDist + earProtrude, earAngle);

  // Ear entry/exit: where the shell edge meets the ear on inner and outer sides
  const [earLEntryX, earLEntryY] = rotatePoint(0, earDist - 2, -(earAngle - 4));
  const [earLExitX, earLExitY] = rotatePoint(0, earDist - 2, -(earAngle + 6));
  const [earREntryX, earREntryY] = rotatePoint(0, earDist - 2, earAngle - 4);
  const [earRExitX, earRExitY] = rotatePoint(0, earDist - 2, earAngle + 6);

  // Bottom knob
  const knobR = 8;

  return [
    // Start at bottom center
    `M ${fmt(CENTER_X)} ${fmt(CENTER_Y + knobR)}`,
    // Bottom knob — small rounded bump
    `A ${knobR} ${knobR} 0 1 1 ${fmt(CENTER_X + 0.01)} ${fmt(CENTER_Y + knobR)}`,
    // Taper up left side to ear
    `L ${fmt(earLExitX)} ${fmt(earLExitY)}`,
    // Left ear knob — big rounded bump using cubic bezier
    `C ${fmt(earLExitX - 5)} ${fmt(earLExitY - 12)} ${fmt(earLPeakX - 8)} ${fmt(earLPeakY + 2)} ${fmt(earLPeakX)} ${fmt(earLPeakY)}`,
    `C ${fmt(earLPeakX + 8)} ${fmt(earLPeakY - 2)} ${fmt(earLEntryX - 3)} ${fmt(earLEntryY - 10)} ${fmt(earLEntryX)} ${fmt(earLEntryY)}`,
    // Connect to top arc start
    `L ${fmt(arcPoints[0][0])} ${fmt(arcPoints[0][1])}`,
    // Top arc across the notch line
    ...arcPoints.slice(1).map(([px, py]) => `L ${fmt(px)} ${fmt(py)}`),
    // Connect to right ear
    `L ${fmt(earREntryX)} ${fmt(earREntryY)}`,
    // Right ear knob — big rounded bump using cubic bezier
    `C ${fmt(earREntryX + 3)} ${fmt(earREntryY - 10)} ${fmt(earRPeakX - 8)} ${fmt(earRPeakY - 2)} ${fmt(earRPeakX)} ${fmt(earRPeakY)}`,
    `C ${fmt(earRPeakX + 8)} ${fmt(earRPeakY + 2)} ${fmt(earRExitX + 5)} ${fmt(earRExitY - 12)} ${fmt(earRExitX)} ${fmt(earRExitY)}`,
    // Taper down right side to bottom
    `L ${fmt(CENTER_X)} ${fmt(CENTER_Y + knobR)}`,
    'Z',
  ].join(' ');
})();

// Layer 2: 9 rib extensions from notch line to scalloped tip
const RIB_PATHS = ANGLES.map((angle) => {
  // Base of rib (at notch line)
  const [blx, bly] = rotatePoint(-RIB_BASE_HALF, NOTCH_DIST, angle);
  const [brx, bry] = rotatePoint(RIB_BASE_HALF, NOTCH_DIST, angle);

  // Tip of rib
  const [tlx, tly] = rotatePoint(-RIB_TIP_HALF, TIP_DIST, angle);
  const [trx, try_] = rotatePoint(RIB_TIP_HALF, TIP_DIST, angle);

  // Scallop control point (beyond tip)
  const [cpx, cpy] = rotatePoint(0, TIP_DIST + SCALLOP_BULGE, angle);

  return `M ${fmt(blx)} ${fmt(bly)} L ${fmt(tlx)} ${fmt(tly)} Q ${fmt(cpx)} ${fmt(cpy)} ${fmt(trx)} ${fmt(try_)} L ${fmt(brx)} ${fmt(bry)} Z`;
});

// Transform origin for each rib: the point where it meets the base (at notch line)
const RIB_ORIGINS = ANGLES.map((angle) => {
  const [ox, oy] = rotatePoint(0, NOTCH_DIST, angle);
  return `${fmt(ox)}px ${fmt(oy)}px`;
});

function getUnfoldDistance(index: number): number {
  return Math.abs(index - Math.floor(RIB_COUNT / 2));
}

type ScallopShellProps = {
  className?: string;
  animate?: boolean;
  delay?: number;
};

export function ScallopShell({ className = '', animate = false, delay = 200 }: ScallopShellProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setRevealed(true));
    });
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const show = !animate || revealed;

  return (
    <svg
      className={className}
      viewBox="0 0 300 200"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Layer 1: Solid base body with ear knobs */}
      <path
        d={BASE_PATH}
        style={animate ? {
          opacity: show ? 1 : 0,
          transition: show ? `opacity 200ms ease-out ${delay}ms` : undefined,
        } : undefined}
      />

      {/* Layer 2: 9 rib extensions from notch line to scalloped tips */}
      {RIB_PATHS.map((d, i) => {
        const animDelay = delay + 200 + getUnfoldDistance(i) * 60;

        return (
          <path
            key={i}
            d={d}
            style={animate ? {
              transformOrigin: RIB_ORIGINS[i],
              opacity: show ? 1 : 0,
              transform: show ? 'scale(1)' : 'scale(0)',
              transition: show
                ? `opacity 400ms cubic-bezier(0.22, 1, 0.36, 1) ${animDelay}ms, transform 400ms cubic-bezier(0.22, 1, 0.36, 1) ${animDelay}ms`
                : undefined,
            } : undefined}
          />
        );
      })}
    </svg>
  );
}
