import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import logoLight from "@/assets/bersach-logo-light.svg";
import logoDark from "@/assets/bersach-logo.svg";

const ABLEFY_LINK = "#"; // [ABLEFY-LINK] hier einsetzen

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bersach Tradingfloor – Inner Circle | Futures-Trading Community" },
      { name: "description", content: "Die geschlossene Trading-Community von Bersach: Analysen, Live-Austausch und Struktur für Futures-Trader. 24,99 € / Monat, monatlich kündbar." },
      { property: "og:title", content: "Bersach Tradingfloor – Inner Circle" },
      { property: "og:description", content: "Trade nicht allein. Werde Teil des Inner Circle – die Paid Community für Futures-Trader." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Logo({ light = true }: { light?: boolean }) {
  return (
    <a href="#top" aria-label="Bersach Startseite" className="flex items-center">
      <img src={light ? logoLight : logoDark} alt="Bersach" className="h-8 w-auto" />
    </a>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-gold">{children}</p>;
}

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

const features = [
  { t: "Exklusiver Discord-Bereich", d: "Geschlossene Channels nur für Mitglieder – fokussiert, ohne Lärm.", i: "M4 5h16v11H8l-4 4V5z" },
  { t: "[Marktanalysen täglich/wöchentlich]", d: "Strukturierte Vorbereitung auf die Session mit klaren Levels.", i: "M3 20h18M6 16l4-5 3 3 5-7" },
  { t: "[Live-Sessions & Trade-Reviews]", d: "Gemeinsam traden, Entscheidungen nachvollziehen, besser werden.", i: "M15 10l5-3v10l-5-3M3 6h12v12H3z" },
  { t: "Prop-Firm & Risikomanagement", d: "Austausch zu Challenges, Regeln und sauberem Risiko.", i: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" },
  { t: "Trading-Psychologie & Disziplin", d: "Routinen und Mindset für konstante Ergebnisse.", i: "M12 3a6 6 0 016 6c0 3-2 4-2 7H8c0-3-2-4-2-7a6 6 0 016-6zM9 20h6" },
  { t: "Direkter Draht zu den Tradern", d: "Fragen stellen und Antworten von erfahrenen Tradern bekommen.", i: "M8 12h8M12 8v8M12 21a9 9 0 100-18 9 9 0 000 18z" },
];

const traders = [
  { n: "Leon", r: "Rohstoffe", a: ["[Funded Accounts]", "[Trading-Erfahrung seit …]", "[Auszahlungen]"] },
  { n: "Felix", r: "Krypto", a: ["BTC, ETH & Altcoins", "Swing- & Scalptrades", "Positionsverwaltung mit Eigenkapital"] },
  { n: "William", r: "Indizes & Öl", a: ["[Apex Trader Funding Accounts]", "[Mentor-Programm]", "[Weiterer Erfolg]"] },
  { n: "Sophie", r: "Rohstoffe", a: ["[Erfolg 1]", "[Erfolg 2]", "[Erfolg 3]"] },
  { n: "Lennard", r: "Forex & Rohstoffe", a: ["[Erfolg 1]", "[Erfolg 2]", "[Erfolg 3]"] },
];

const stats = [
  { v: 500, s: "+", l: "[X] Mitglieder" },
  { v: 120, s: "+", l: "[X] bestandene Challenges" },
  { v: 80, s: "+", l: "[X] Auszahlungen" },
];

const included = [
  "Zugang zum exklusiven Discord-Bereich",
  "[Marktanalysen täglich/wöchentlich]",
  "[Live-Sessions & Trade-Reviews]",
  "Prop-Firm- & Risikomanagement-Austausch",
  "Trading-Psychologie & Disziplin",
  "Direkter Kontakt zu Leon, Felix, William, Sophie & Lennard",
];

const faqs = [
  { q: "Wie kann ich kündigen?", a: "Die Mitgliedschaft ist monatlich kündbar – direkt über dein Ablefy-Kundenkonto. [Details ergänzen]" },
  { q: "Wie komme ich auf den Server?", a: "Nach dem Kauf erhältst du per E-Mail deinen persönlichen Discord-Einladungslink. Damit wird dein Inner-Circle-Bereich freigeschaltet." },
  { q: "Brauche ich Vorkenntnisse?", a: "Grundkenntnisse im Futures-Trading sind hilfreich. [Ergänzen, ob auch Einsteiger willkommen sind]" },
  { q: "Ist das Anlageberatung?", a: "Nein. Alle Inhalte dienen ausschließlich der Bildung und dem Austausch. Es gibt keine Handelsempfehlungen." },
  { q: "Welche Märkte werden behandelt?", a: "[z. B. Index-Futures wie NQ, ES …]" },
  { q: "Wie läuft die Zahlung ab?", a: "Die Zahlung erfolgt sicher über Ablefy – per Kreditkarte, PayPal und weiteren Methoden." },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (t: number) => {
        const p = Math.min((t - start) / 1600, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(!localStorage.getItem("cookie-consent")); }, []);
  if (!show) return null;
  const close = (v: string) => { localStorage.setItem("cookie-consent", v); setShow(false); };
  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-md border border-gold/40 bg-ink p-5 text-on-ink shadow-2xl md:inset-x-auto md:right-6 md:bottom-6">
      <p className="text-sm text-on-ink-muted">
        Wir verwenden Cookies, um diese Website zu verbessern. [PLATZHALTER: DSGVO-Text anpassen] Mehr in der{" "}
        <Link to="/rechtliches/$slug" params={{ slug: "datenschutz" }} className="text-gold-light underline">Datenschutzerklärung</Link>.
      </p>
      <div className="mt-4 flex gap-3">
        <button onClick={() => close("all")} className="btn-gold !px-4 !py-2 text-sm">Akzeptieren</button>
        <button onClick={() => close("necessary")} className="btn-outline-gold !px-4 !py-2 text-sm">Nur notwendige</button>
      </div>
    </div>
  );
}

function Index() {
  useReveal();
  return (
    <div id="top">
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-24 pb-24 text-on-ink md:pt-32 md:pb-36">
        <div className="reveal relative mx-auto max-w-3xl text-center">
          <Eyebrow>Bersach Tradingfloor · Inner Circle</Eyebrow>
          <h1 className="text-5xl leading-[1.05] md:text-7xl">
            Trade nicht allein.<br />
            <span className="text-gold">Werde Teil des Inner Circle.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-on-ink-muted md:text-lg">
            Die geschlossene Trading-Community von Bersach: Analysen, Live-Austausch und Struktur für Trader, die es ernst meinen.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#preis" className="btn-gold">Jetzt beitreten</a>
            <a href="#inner-circle" className="btn-outline-gold">Mehr erfahren</a>
          </div>
          <p className="mt-6 text-sm text-on-ink-muted">Nur 24,99 € / Monat. Monatlich kündbar.</p>
        </div>
      </section>

      {/* Was ist */}
      <section id="inner-circle" className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="reveal mx-auto max-w-2xl text-center">
            <Eyebrow>Die Community</Eyebrow>
            <h2 className="text-4xl md:text-5xl">Was ist der Inner Circle?</h2>
            <p className="mt-5 text-muted-foreground">
              Ein geschlossener Kreis von Futures-Tradern, die gemeinsam strukturiert arbeiten, sich austauschen und voneinander lernen.
            </p>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.t} className="reveal bg-background p-8 transition-colors hover:bg-card">
                <div className="text-gold"><Icon d={f.i} /></div>
                <h3 className="mt-5 text-2xl">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trader */}
      <section className="px-5 py-24 text-on-ink md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="reveal text-center">
            <Eyebrow>Das Team</Eyebrow>
            <h2 className="text-4xl md:text-5xl">Die Trader hinter Bersach</h2>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-6">
            {traders.map((t) => (
              <article key={t.n} className="reveal w-full rounded-md border border-gold/40 p-8 md:w-[calc((100%-3rem)/3)] text-center transition-colors hover:border-gold">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-gold/60 bg-ink-soft text-xs text-on-ink-muted">
                  [Foto]
                </div>
                <h3 className="mt-6 text-3xl">{t.n}</h3>
                <p className="mt-1 text-sm text-gold-light">{t.r}</p>
                <div className="gold-line my-6" />
                <ul className="space-y-2 text-left text-sm text-on-ink-muted">
                  {t.a.map((a) => (
                    <li key={a} className="flex gap-3"><span className="text-gold">—</span>{a}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Erfolge */}
      <section className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="reveal text-center">
            <Eyebrow>Ergebnisse</Eyebrow>
            <h2 className="text-4xl md:text-5xl">Erfolge der Community</h2>
          </div>
          <div className="mt-14 grid gap-10 border-y py-12 text-center sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.l} className="reveal">
                <div className="text-6xl font-semibold tracking-tight text-gold"><Counter to={s.v} suffix={s.s} /></div>
                <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="-mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <figure key={i} className="w-72 shrink-0 snap-center rounded-md border p-6 md:w-80">
                <div className="flex aspect-[4/3] items-center justify-center rounded-sm border border-dashed border-gold/50 text-xs text-muted-foreground">
                  [Screenshot Auszahlung {i}]
                </div>
                <blockquote className="mt-5 text-xl">„[Community-Stimme {i}]“</blockquote>
                <figcaption className="mt-2 text-xs text-muted-foreground">— [Name / Discord-Name]</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">← Wischen für mehr →</p>
        </div>
      </section>

      {/* So funktioniert's */}
      <section className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="reveal text-center">
            <Eyebrow>In drei Schritten</Eyebrow>
            <h2 className="text-4xl md:text-5xl">So funktioniert's</h2>
          </div>
          <ol className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              ["Beitreten", "Klicke auf den Button und schließe deine Mitgliedschaft ab."],
              ["Einladung erhalten", "Du bekommst deinen persönlichen Discord-Einladungslink."],
              ["Loslegen", "Inner-Circle-Bereich freischalten und direkt einsteigen."],
            ].map(([t, d], i) => (
              <li key={t} className="reveal text-center">
                <div className="text-7xl font-semibold tracking-tight text-gold">0{i + 1}</div>
                <div className="gold-line mx-auto my-5 w-16" />
                <h3 className="text-2xl">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Preis */}
      <section id="preis" className="px-5 py-24 text-on-ink md:py-32">
        <div className="reveal mx-auto max-w-md rounded-md border border-gold/50">
          <div className="rounded-md bg-ink p-8 text-center md:p-10">
            <Eyebrow>Mitgliedschaft</Eyebrow>
            <h2 className="text-4xl">Inner Circle</h2>
            <div className="mt-6 text-6xl font-semibold tracking-tight text-gold">24,99 €</div>
            <p className="text-sm text-on-ink-muted">pro Monat</p>
            <div className="gold-line my-8" />
            <ul className="space-y-3 text-left text-sm">
              {included.map((x) => (
                <li key={x} className="flex gap-3">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12l5 5 9-10" /></svg>
                  {x}
                </li>
              ))}
            </ul>
            <a href={ABLEFY_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold mt-10 w-full py-4 text-base">Jetzt Mitglied werden</a>
            <p className="mt-4 text-xs text-on-ink-muted">Monatlich kündbar. Sichere Zahlung über Ablefy.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-2xl">
          <div className="reveal text-center">
            <Eyebrow>Fragen</Eyebrow>
            <h2 className="text-4xl md:text-5xl">Häufige Fragen</h2>
          </div>
          <div className="mt-12 border-t">
            {faqs.map((f) => (
              <details key={f.q} className="group border-b py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-2xl text-gold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-24 text-center text-on-ink md:py-32">
        <div className="reveal">
          <h2 className="text-4xl md:text-6xl">Bereit für den <span className="text-gold">nächsten Schritt?</span></h2>
          <a href={ABLEFY_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold mt-10">Jetzt Mitglied werden</a>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="px-5 pb-10 text-on-ink">
        <p className="mx-auto max-w-3xl border-t border-gold/20 pt-8 text-center text-xs leading-relaxed text-on-ink-muted">
          Alle Inhalte dienen ausschließlich Bildungs- und Informationszwecken und stellen keine Anlageberatung oder Handelsempfehlung dar. Trading mit Futures ist mit erheblichen Risiken verbunden und kann zum Verlust des eingesetzten Kapitals führen. Es werden keine Gewinne oder Renditen garantiert. Vergangene Ergebnisse sind keine Garantie für zukünftige Ergebnisse.
        </p>
      </div>

      {/* Footer */}
      <footer className="border-t border-gold/20 px-5 py-10 text-on-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 md:flex-row md:justify-between">
          <Logo />
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-on-ink-muted">
            {([["impressum", "Impressum"], ["datenschutz", "Datenschutz"], ["agb", "AGB"], ["widerruf", "Widerrufsbelehrung"]] as const).map(([s, l]) => (
              <Link key={s} to="/rechtliches/$slug" params={{ slug: s }} className="hover:text-gold-light">{l}</Link>
            ))}
          </nav>
          <div className="flex gap-4 text-on-ink-muted">
            <a href="#" aria-label="Instagram [Link einfügen]" className="hover:text-gold-light">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg>
            </a>
            <a href="#" aria-label="TikTok [Link einfügen]" className="hover:text-gold-light">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M16.5 3c.3 2.2 1.6 3.6 3.8 3.8v3.1c-1.4.1-2.6-.3-3.8-1v6.3c0 3.5-2.8 5.8-6 5.8-3.3 0-5.8-2.6-5.8-5.8 0-3.6 3.2-6.2 6.8-5.6v3.2c-1.6-.4-3.6.6-3.6 2.4 0 1.5 1.2 2.6 2.6 2.6 1.6 0 2.8-1.1 2.8-3V3h3.2z" /></svg>
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-on-ink-muted">©️ {new Date().getFullYear()} Bersach Tradingfloor</p>
      </footer>

      <CookieBanner />
    </div>
  );
}
