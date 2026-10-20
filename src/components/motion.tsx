import { Fragment, useEffect, useRef, type CSSProperties } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Stagger delay for .reveal and .word-in elements
export const delay = (i: number, step = 90): CSSProperties => ({ ["--d" as string]: `${i * step}ms` });

// Fades .reveal elements in (with blur) once they scroll into view, and drives
// the cursor-following glow on .spotlight cards.
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element).closest<HTMLElement>(".spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      io.disconnect();
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
}

// Words light up one after another while the paragraph scrolls through the
// viewport. Wrap a word in *asterisks* to set it as a gold serif accent.
export function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const spans = [...el.querySelectorAll<HTMLSpanElement>(":scope > span")];
    const soft = 4; // how many words fade at the same time
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the text enters the lower part of the screen, 1 when its end reaches the middle
      const start = vh * 0.9;
      const end = vh * 0.5;
      const p = Math.min(1, Math.max(0, (start - r.top) / (r.height + start - end)));
      spans.forEach((s, i) => {
        const t = Math.min(1, Math.max(0, (p * (spans.length + soft) - i) / soft));
        s.style.opacity = String(0.14 + 0.86 * t);
        s.style.filter = t < 1 ? `blur(${(1 - t) * 6}px)` : "none";
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const accent = w.startsWith("*") && w.replace(/[.,!?]$/, "").endsWith("*");
        return (
          <Fragment key={i}>
            <span className={`inline-block will-change-[filter,opacity] ${accent ? "accent" : ""}`}>{accent ? w.replace(/\*/g, "") : w}</span>{" "}
          </Fragment>
        );
      })}
    </p>
  );
}
