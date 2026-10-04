import { useEffect, useRef } from "react";

// Fixed canvas behind the whole page: a slow, endlessly scrolling candlestick
// chart with a moving average, drawn faintly so content stays readable.

const CANDLE_W = 7;
const GAP = 7;
const STEP = CANDLE_W + GAP;
const SPEED = 14; // px per second
const MA_PERIOD = 12;

const UP = "rgba(201, 162, 75, 0.22)";
const DOWN = "rgba(155, 151, 143, 0.13)";
const MA = "rgba(201, 162, 75, 0.35)";
const GRID = "rgba(255, 255, 255, 0.025)";

type Candle = { o: number; h: number; l: number; c: number };

function makeFeed(seed = 100) {
  let price = seed;
  let drift = 0;
  return (): Candle => {
    // Random walk with momentum and mean reversion keeps the chart in range
    drift = drift * 0.85 + (Math.random() - 0.5) * 1.6 + (100 - price) * 0.012;
    const o = price;
    const c = o + drift + (Math.random() - 0.5) * 1.2;
    const h = Math.max(o, c) + Math.random() * 1.4;
    const l = Math.min(o, c) - Math.random() * 1.4;
    price = c;
    return { o, h, l, c };
  };
}

export function MarketBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const next = makeFeed();
    let candles: Candle[] = [];
    let w = 0;
    let h = 0;
    let offset = 0;
    let last = performance.now();
    let raf = 0;
    let lo = NaN;
    let hi = NaN;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const needed = Math.ceil(w / STEP) + MA_PERIOD + 2;
      while (candles.length < needed) candles.push(next());
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = GRID;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let y = 0.5; y < h; y += 80) (ctx.moveTo(0, y), ctx.lineTo(w, y));
      for (let x = 0.5 - (offset % 160); x < w; x += 160) (ctx.moveTo(x, 0), ctx.lineTo(x, h));
      ctx.stroke();

      // Only the candles on screen define the price scale
      const visible = candles.slice(MA_PERIOD);
      let min = Infinity;
      let max = -Infinity;
      for (const c of visible) (min = Math.min(min, c.l)), (max = Math.max(max, c.h));
      const top = h * 0.2;
      const span = h * 0.6;
      // Ease the scale toward its target so it never jumps
      lo = Number.isNaN(lo) ? min : lo + (min - lo) * 0.02;
      hi = Number.isNaN(hi) ? max : hi + (max - hi) * 0.02;
      const y = (p: number) => top + span - ((p - lo) / (hi - lo || 1)) * span;

      visible.forEach((c, i) => {
        const x = i * STEP - offset;
        const cx = Math.round(x + CANDLE_W / 2) + 0.5;
        const color = c.c >= c.o ? UP : DOWN;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(cx, y(c.h));
        ctx.lineTo(cx, y(c.l));
        ctx.stroke();
        const yo = y(c.o);
        const yc = y(c.c);
        ctx.fillRect(Math.round(x), Math.min(yo, yc), CANDLE_W, Math.max(Math.abs(yc - yo), 1));
      });

      ctx.strokeStyle = MA;
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      visible.forEach((_, i) => {
        let sum = 0;
        for (let k = 0; k < MA_PERIOD; k++) sum += candles[i + MA_PERIOD - k]!.c;
        const px = i * STEP - offset + CANDLE_W / 2;
        const py = y(sum / MA_PERIOD);
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      });
      ctx.stroke();
    };

    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.1);
      last = t;
      offset += SPEED * dt;
      while (offset >= STEP) {
        offset -= STEP;
        candles.shift();
        candles.push(next());
      }
      draw();
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
