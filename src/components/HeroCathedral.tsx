'use client';

import { useEffect, useRef } from 'react';

/* ── Obradoiro facade — LEFT HALF (15 cols × 17 rows) ────────────────────
   Mirror horizontally to build full 29-col bitmap:
     full[c] = leftHalf[c <= 14 ? c : 28 - c]
   Legend: . empty, # stone, o lit window, T cross finial, D door          */
const LEFT_HALF: string[] = [
  '....T..........',
  '....#..........',
  '...###........T',
  '...###........#',
  '...#o#.......##',
  '...###......###',
  '...#o#.....####',
  '...###.....#ooo',
  '...############',
  '...#o#o#o#o#o#o',
  '...############',
  '...#o#o#o#o#o#o',
  '...############',
  '..#############',
  '..##########DDD',
  '.##############',
  '###############',
];

const CHAR_MAP: Record<string, number> = { '.': 0, '#': 1, 'o': 2, 'T': 3, 'D': 4 };

function buildBitmap(): number[][] {
  return LEFT_HALF.map((row) => {
    const left = row.split('').map((ch) => CHAR_MAP[ch] ?? 0);
    const full: number[] = [];
    for (let c = 0; c <= 28; c++) full.push(left[c <= 14 ? c : 28 - c]);
    return full;
  });
}

const BITMAP = buildBitmap();
const CAT_COLS = 29;
const CAT_ROWS = 17;
const SKY_ROWS = 4;
const GROUND_ROWS = 2;
const TOTAL_ROWS = SKY_ROWS + CAT_ROWS + GROUND_ROWS; // 4 sky + 17 cathedral + 2 ground = 23

/* ── Palette ─────────────────────────────────────────────────────────────── */
const STONE  = '#4A453E';
const WINDOW = '#C25A2B';
const DOOR   = '#332E28';
const GROUND = '#CBB9A3';
const WARM   = '#E8A06B';
const STAR_C = '#B79A82';

const PILGRIM_HEAD = '#C25A2B'; // terracotta hat/hair
const PILGRIM_BODY = '#3F3A33';
const PILGRIM_PACK = '#5C554B'; // warm brown, lighter than body

const GAP_RATIO = 0.18;
const WALK_SPEED = 0.06; // cells per idle frame
const WIPE_MS = 1800;

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function easeOut(t: number) {
  return 1 - (1 - t) ** 3;
}

function colorOf(v: number): string | null {
  if (v === 1) return STONE;
  if (v === 2 || v === 3) return WINDOW;
  if (v === 4) return DOOR;
  return null;
}

/* ── Stars ───────────────────────────────────────────────────────────────── */

type Star = { col: number; row: number; phase: number; speed: number };

function makeStars(totalCols: number, catStart: number): Star[] {
  const rng = mulberry32(42);
  const out: Star[] = [];
  for (let c = 0; c < totalCols; c++) {
    for (let r = 0; r < TOTAL_ROWS - GROUND_ROWS; r++) {
      const bc = c - catStart;
      if (bc >= 0 && bc < CAT_COLS) {
        const br = r - SKY_ROWS;
        if (br >= 0 && br < CAT_ROWS && BITMAP[br][bc]) continue;
      }
      if (rng() < 0.025) {
        out.push({
          col: c,
          row: r,
          phase: rng() * Math.PI * 2,
          speed: 0.5 + rng() * 1.5,
        });
      }
    }
  }
  return out;
}

/* ── Pilgrim sprites ─────────────────────────────────────────────────────
   Simple vertical-stack pilgrims: 3 pixels tall, 3 wide max.
   h = head (terracotta), s = body (charcoal), b = backpack (warm brown)

   Facing right (left-side pilgrims walk toward cathedral):
     Frame A (stride):  .h.    Frame B (standing):  .h.
                         bs.                          bs.
                         s.s                          .s.

   Facing left = mirror horizontally.
   ──────────────────────────────────────────────────────────────────────── */

type SpritePx = { dc: number; dr: number; color: string };

function parseSprite(rows: string[], mirror: boolean): SpritePx[] {
  const out: SpritePx[] = [];
  const h = rows.length;
  const w = rows[0].length;
  for (let r = 0; r < h; r++) {
    for (let c = 0; c < w; c++) {
      const ch = rows[r][mirror ? w - 1 - c : c];
      if (ch === '.') continue;
      const color =
        ch === 'h' ? PILGRIM_HEAD : ch === 'b' ? PILGRIM_PACK : PILGRIM_BODY;
      out.push({ dc: c, dr: r - (h - 1), color });
    }
  }
  return out;
}

// _R = facing right (left-side), _L = facing left (right-side, mirrored)
const SP = {
  walkA_R: parseSprite(['.h.', 'bs.', 's.s'], false),
  walkA_L: parseSprite(['.h.', 'bs.', 's.s'], true),
  walkB_R: parseSprite(['.h.', 'bs.', '.s.'], false),
  walkB_L: parseSprite(['.h.', 'bs.', '.s.'], true),
};

type Pilgrim = {
  kind: 'walker' | 'stander';
  side: 'left' | 'right';
  x: number;
  walkFrame: 0 | 1;
  frameCount: number;
  hopPhase: number;
};

function makePilgrims(totalCols: number, catStart: number): Pilgrim[] {
  const rng = mulberry32(99);
  const out: Pilgrim[] = [];
  const catEnd = catStart + CAT_COLS;

  function addSide(side: 'left' | 'right') {
    const space = side === 'left' ? catStart : totalCols - catEnd;
    if (space < 6) return;

    // Stander near the steps
    const standX = side === 'left' ? catStart - 4 : catEnd + 1;
    if (standX >= 0 && standX + 3 <= totalCols) {
      out.push({
        kind: 'stander', side, x: standX,
        walkFrame: 1, frameCount: 0, hopPhase: rng() * Math.PI * 2,
      });
    }

    // Walkers — spread across the walk range
    const walkMin = side === 'left' ? 1 : catEnd;
    const walkMax = side === 'left' ? catStart - 3 : totalCols - 3;
    const walkRange = walkMax - walkMin;
    if (walkRange > 5) {
      const count = space > 25 ? 3 : space > 15 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        out.push({
          kind: 'walker', side,
          x: walkMin + (walkRange * (i + rng() * 0.5)) / count,
          walkFrame: rng() > 0.5 ? 1 : 0,
          frameCount: Math.floor(rng() * 16),
          hopPhase: 0,
        });
      }
    }
  }

  addSide('left');
  addSide('right');
  return out;
}

/* ── Component ───────────────────────────────────────────────────────────── */

export default function HeroCathedral() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = cvRef.current!;
    const box = boxRef.current!;
    const ctx = cv.getContext('2d')!;

    const prefersStatic = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const doWipe = !prefersStatic;

    let raf = 0;
    let t0 = 0;
    let wipeDone = false;

    // Layout state
    let w = 0;
    let h = 0;
    let cell = 0;
    let dot = 0;
    let cols = 0;
    let catStart = 0;
    let ox = 0;
    let stars: Star[] = [];
    let pilgrims: Pilgrim[] = [];

    function resize() {
      const rect = box.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      w = rect.width;
      h = rect.height;
      const dpr = devicePixelRatio || 1;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cv.style.width = `${w}px`;
      cv.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cell = Math.floor(h / TOTAL_ROWS);
      if (cell * CAT_COLS > w) cell = Math.floor(w / CAT_COLS);
      const gap = Math.max(1, Math.round(cell * GAP_RATIO));
      dot = cell - gap;
      cols = Math.floor(w / cell);
      catStart = Math.floor((cols - CAT_COLS) / 2);
      ox = Math.floor((w - cols * cell) / 2);
      stars = makeStars(cols, catStart);
      pilgrims = makePilgrims(cols, catStart);
    }

    function fillPx(c: number, r: number, color: string, a = 1) {
      ctx.globalAlpha = a;
      ctx.fillStyle = color;
      ctx.fillRect(ox + c * cell, r * cell, dot, dot);
    }

    function updatePilgrims() {
      const catEnd = catStart + CAT_COLS;
      for (const p of pilgrims) {
        if (p.kind !== 'walker') continue;
        if (p.side === 'left') {
          p.x += WALK_SPEED;
          if (p.x > catStart - 3) p.x = 1;
        } else {
          p.x -= WALK_SPEED;
          if (p.x < catEnd) p.x = cols - 3;
        }
        p.frameCount++;
        if (p.frameCount % 8 === 0) {
          p.walkFrame = p.walkFrame === 0 ? 1 : 0;
        }
      }
    }

    function drawPilgrims(edge: number, full: boolean, now: number) {
      // Pilgrims stand on the top ground row (feet row)
      const feetRow = TOTAL_ROWS - GROUND_ROWS;

      for (const p of pilgrims) {
        const ix = Math.floor(p.x);
        if (ix > edge) continue;

        const facesLeft = p.side === 'right';
        let sprite: SpritePx[];
        let yOff = 0;

        if (p.kind === 'stander') {
          sprite = facesLeft ? SP.walkB_L : SP.walkB_R;
          // Gentle hop cycle
          if (!prefersStatic && full && Math.sin(now * 0.003 + p.hopPhase) > 0.92) {
            yOff = -1;
          }
        } else {
          sprite = p.walkFrame === 0
            ? (facesLeft ? SP.walkA_L : SP.walkA_R)
            : (facesLeft ? SP.walkB_L : SP.walkB_R);
        }

        for (const sp of sprite) {
          const c = ix + sp.dc;
          const r = feetRow + sp.dr + yOff;
          if (c < 0 || c >= cols || c > edge || r < 0) continue;
          const isEdge = c === edge && !full;
          fillPx(c, r, isEdge ? WARM : sp.color);
        }
      }
    }

    function draw(reveal: number, now: number) {
      ctx.clearRect(0, 0, w, h);
      const full = reveal >= cols;
      const edge = Math.floor(reveal);

      // Ground / horizon — full width, 2 rows thick
      for (let gr = TOTAL_ROWS - GROUND_ROWS; gr < TOTAL_ROWS; gr++) {
        for (let c = 0; c <= Math.min(edge, cols - 1); c++) {
          fillPx(c, gr, c === edge && !full ? WARM : GROUND);
        }
      }

      // Stars
      for (const s of stars) {
        if (s.col > edge) continue;
        const isEdge = s.col === edge && !full;
        const a = full
          ? 0.2 + 0.5 * (0.5 + 0.5 * Math.sin(now * 0.001 * s.speed + s.phase))
          : 0.55;
        fillPx(s.col, s.row, isEdge ? WARM : STAR_C, a);
      }

      // Cathedral bitmap (offset by SKY_ROWS)
      for (let br = 0; br < CAT_ROWS; br++) {
        const cr = br + SKY_ROWS;
        for (let bc = 0; bc < CAT_COLS; bc++) {
          const v = BITMAP[br][bc];
          if (!v) continue;
          const c = catStart + bc;
          if (c > edge) continue;
          const isEdge = c === edge && !full;
          let a = 1;
          if (v === 2 && full) {
            a = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(now * 0.0012 + bc * 0.7));
          }
          fillPx(c, cr, isEdge ? WARM : colorOf(v)!, a);
        }
      }

      // Pilgrims
      drawPilgrims(edge, full, now);

      ctx.globalAlpha = 1;
    }

    let lastIdle = 0;

    function tick(now: number) {
      if (!w) {
        raf = requestAnimationFrame(tick);
        return;
      }

      // Wipe animation
      if (doWipe && !wipeDone) {
        if (!t0) t0 = now;
        const p = Math.min((now - t0) / WIPE_MS, 1);
        draw(easeOut(p) * cols, now);
        if (p >= 1) wipeDone = true;
        raf = requestAnimationFrame(tick);
        return;
      }

      // Reduced motion: single static draw, no loop
      if (prefersStatic) {
        draw(cols, now);
        return;
      }

      // Idle: walk pilgrims, twinkle & pulse, throttled to ~12 fps
      if (now - lastIdle > 80) {
        lastIdle = now;
        updatePilgrims();
        draw(cols, now);
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(box);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={boxRef}
      className="mx-auto px-0 md:max-w-6xl md:px-6 h-[120px] md:h-[150px]"
      aria-hidden="true"
    >
      <canvas ref={cvRef} className="block w-full h-full" />
    </div>
  );
}
