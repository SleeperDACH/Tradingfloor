import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { delay, ScrollRevealText, useReveal } from "@/components/motion";
import logoLight from "@/assets/bersach-logo-light.svg";
import logoDark from "@/assets/bersach-logo.svg";

const ABLEFY_LINK = "https://myablefy.com/s/bersach/bersach-tradingfloor-inner-circle-b0dd80af/payment";
const DISCORD_LINK = "https://discord.gg/sG4nu6CjEK";

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

const DiscordIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>
);

function DiscordButton({ className = "" }: { className?: string }) {
  return (
    <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" className={`btn-discord gap-2.5 ${className}`}>
      <DiscordIcon />
      Discord-Server beitreten
    </a>
  );
}

const features = [
  { t: "Exklusiver Discord-Bereich", d: ["Analysen und Setups verfolgen", "Fragen direkt stellen", "Mit anderen Tradern austauschen", "Feedback erfahrener Trader zu deinen eigenen Trades"], i: "M4 5h16v11H8l-4 4V5z" },
  { t: "Tägliche Marktanalysen", d: "Jeden Tag ein klarer Blick auf die Märkte – mit Tradeideen, die sich an der aktuellen Marktlage orientieren.", i: "M3 20h18M6 16l4-5 3 3 5-7" },
  { t: "Live-Sessions & Trade-Reviews", d: "Wöchentliches Livetrading, täglicher Austausch und direktes Feedback von erfahrenen Tradern zu deinen Trades.", i: "M15 10l5-3v10l-5-3M3 6h12v12H3z" },
  { t: "Prop-Firm & Risikomanagement", d: "Austausch zu Challenges, Regeln und sauberem Risiko.", i: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" },
  { t: "Trading-Psychologie & Disziplin", d: "Routinen und Mindset für konstante Ergebnisse.", i: "M12 3a6 6 0 016 6c0 3-2 4-2 7H8c0-3-2-4-2-7a6 6 0 016-6zM9 20h6" },
  { t: "Direkter Draht zu den Tradern", d: "Fragen stellen und Antworten von erfahrenen Tradern bekommen.", i: "M8 12h8M12 8v8M12 21a9 9 0 100-18 9 9 0 000 18z" },
];

const markets = {
  crypto: "M12 3a9 9 0 100 18 9 9 0 000-18zM9.5 7.5v9M9.5 7.5h3.25a2.25 2.25 0 010 4.5H9.5M9.5 12h3.75a2.25 2.25 0 010 4.5H9.5M11 6v1.5M13 6v1.5M11 16.5V18M13 16.5V18",
  gold: "M2 20l1.5-5h7l1.5 5zM12 20l1.5-5h7l1.5 5zM7 15l1.5-5h7l1.5 5",
  index: "M3 3v18h18M6.5 15.5l4-4.5 3 3 5-6.5M15 7.5h3.5V11",
  oil: "M12 3s-6 7-6 11a6 6 0 0012 0c0-4-6-11-6-11z",
};

const traders = [
  { n: "Leon", r: "Rohstoffe", m: [markets.gold], a: ["Gold, Silber & Öl", "Saubere Einstiege auf niedrigen Timeframes", "Volumen & Divergenzen"] },
  { n: "Felix", r: "Krypto", m: [markets.crypto], a: ["BTC, ETH & Altcoins", "Swing- & Scalptrades", "Positionsverwaltung mit Eigenkapital"] },
  { n: "William", r: "Indizes & Öl", m: [markets.index, markets.oil], a: ["S&P 500 & Öl", "Zahlreiche Auszahlungen", "Klare Regeln für Einstiege nach Trend"] },
];

const included = [
  "Zugang zum exklusiven Discord-Bereich",
  "Tägliche Marktanalysen mit Tradeideen",
  "Wöchentliches Livetrading & Trade-Reviews",
  "Prop-Firm- & Risikomanagement-Austausch",
  "Trading-Psychologie & Disziplin",
  "Direkter Kontakt zu Leon, Felix & William",
];

const faqs = [
  { q: "Wie kann ich kündigen?", a: "Die Mitgliedschaft ist monatlich kündbar – direkt über dein Ablefy-Kundenkonto. [Details ergänzen]" },
  { q: "Wie komme ich auf den Server?", a: "Über den Button „Discord-Server beitreten“ kommst du jederzeit auf unseren Server. Den Inner-Circle-Bereich schalten wir nach dem Kauf frei – deinen persönlichen Einladungslink dafür erhältst du per E-Mail." },
  { q: "Brauche ich Vorkenntnisse?", a: "Nein. Anfänger sind bei uns ausdrücklich willkommen. Durch den direkten Austausch mit erfahrenen Tradern lernst du schnell und praxisnah – Fragen sind jederzeit erwünscht." },
  { q: "Ist das Anlageberatung?", a: "Nein. Wir dokumentieren unsere eigenen Trades transparent, damit du Entscheidungen nachvollziehen und daraus lernen kannst. Das ist jedoch keine Anlageberatung und kein Financial Advice – jedes Mitglied handelt eigenverantwortlich." },
  { q: "Welche Märkte werden behandelt?", a: "Krypto (BTC, ETH & Altcoins), Rohstoffe wie Gold, Silber und Öl sowie Indizes wie den S&P 500." },
  { q: "Wie läuft die Zahlung ab?", a: "Die Zahlung erfolgt sicher über Ablefy – per Kreditkarte, PayPal und weiteren Methoden." },
];

const nav = [
  ["#inner-circle", "Community"],
  ["#team", "Team"],
  ["#ablauf", "Ablauf"],
  ["#preis", "Preis"],
  ["#faq", "FAQ"],
] as const;

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${scrolled ? "border-white/[0.06] bg-ink/70 backdrop-blur-xl" : "border-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="hidden gap-8 text-sm text-on-ink-muted md:flex">
          {nav.map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-on-ink">{label}</a>
          ))}
        </nav>
        <a href="#preis" className="btn-gold !px-4 !py-2 text-sm">Jetzt beitreten</a>
      </div>
    </header>
  );
}

// Pill at the bottom of the screen once the hero is gone; hides again near the
// price and final CTA so it never doubles up with them.
function FloatingCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const visible = new Map<Element, boolean>();
    const ids = ["hero", "preis", "final"];
    const update = () => {
      const consent = !!localStorage.getItem("cookie-consent");
      setShow(consent && visible.size === ids.length && ![...visible.values()].some(Boolean));
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => visible.set(e.target, e.isIntersecting));
      update();
    });
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    window.addEventListener("cookie-consent", update);
    return () => {
      io.disconnect();
      window.removeEventListener("cookie-consent", update);
    };
  }, []);
  return (
    <a
      href="#preis"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-full border border-white/10 bg-ink-soft/80 py-2 pr-2 pl-5 text-on-ink shadow-2xl backdrop-blur-xl transition-all duration-500 ${show ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
    >
      <span className="leading-tight">
        <span className="block text-sm font-medium whitespace-nowrap">Inner Circle</span>
        <span className="block text-xs whitespace-nowrap text-on-ink-muted">24,99 € / Monat · monatlich kündbar</span>
      </span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
    </a>
  );
}

function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(!localStorage.getItem("cookie-consent")); }, []);
  if (!show) return null;
  const close = (v: string) => { localStorage.setItem("cookie-consent", v); setShow(false); window.dispatchEvent(new Event("cookie-consent")); };
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
      <Header />

      {/* Hero */}
      <section id="hero" className="relative isolate overflow-hidden px-5 pt-36 pb-28 text-on-ink md:pt-48 md:pb-40">
        <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90%]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="word-in mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs tracking-wide text-on-ink-muted backdrop-blur" style={delay(0)}>
            <span className="relative flex h-1.5 w-1.5"><span className="absolute inset-0 animate-ping rounded-full bg-gold opacity-60" /><span className="relative h-1.5 w-1.5 rounded-full bg-gold" /></span>
            Bersach Tradingfloor · Inner Circle
          </p>
          <h1 className="text-5xl leading-[1.05] md:text-7xl">
            {"Trade nicht allein.".split(" ").map((w, i) => (
              <span key={w} className="word-in inline-block" style={delay(i + 1)}>{w}&nbsp;</span>
            ))}
            <br />
            {"Werde Teil des".split(" ").map((w, i) => (
              <span key={w} className="word-in inline-block" style={delay(i + 4)}>{w}&nbsp;</span>
            ))}
            <span className="word-in accent inline-block" style={delay(7)}>Inner Circle.</span>
          </h1>
          <p className="word-in mx-auto mt-7 max-w-xl text-base text-on-ink-muted md:text-lg" style={delay(9)}>
            Die geschlossene Trading-Community von Bersach: Analysen, Live-Austausch und Struktur für Trader, die es ernst meinen.
          </p>
          <div className="word-in mt-10 flex flex-col justify-center gap-3 sm:flex-row" style={delay(10)}>
            <a href="#preis" className="btn-gold">Jetzt beitreten</a>
            <a href="#inner-circle" className="btn-outline-gold">Mehr erfahren</a>
          </div>
          <p className="word-in mt-6 text-sm text-on-ink-muted" style={delay(11)}>Nur 24,99 € / Monat. Monatlich kündbar.</p>
          <div className="word-in" style={delay(12)}>
            <DiscordButton className="mt-8 w-full sm:w-auto" />
          </div>
        </div>
      </section>

      {/* Was ist */}
      <section id="inner-circle" className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Was ist der Inner Circle?</Eyebrow>
          <ScrollRevealText
            className="max-w-5xl text-3xl leading-[1.2] font-medium tracking-tight md:text-5xl"
            text="Ein geschlossener Kreis von *Futures-Tradern,* die gemeinsam strukturiert arbeiten, sich austauschen und *voneinander* lernen. Mit täglichen Analysen, Live-Sessions und direktem Draht zu erfahrenen Tradern."
          />
          <div className="reveal mt-32 md:mt-40">
            <Eyebrow>Was dich erwartet</Eyebrow>
            <h2 className="text-4xl md:text-6xl">Alles, was du für deinen <span className="accent">Trading-Alltag</span> brauchst.</h2>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={f.t} className="reveal spotlight card p-8" style={delay(i % 3)}>
                <div className="flex items-center justify-between text-gold"><Icon d={f.i} /><span className="text-xs text-on-ink-muted">0{i + 1}</span></div>
                <h3 className="mt-5 text-2xl">{f.t}</h3>
                {Array.isArray(f.d) ? (
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    {f.d.map((x) => (
                      <li key={x} className="flex gap-3"><span className="text-gold">—</span>{x}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trader */}
      <section id="team" className="px-5 py-24 text-on-ink md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="reveal text-center">
            <Eyebrow>Das Team</Eyebrow>
            <h2 className="text-4xl md:text-6xl">Die Trader hinter <span className="accent">Bersach</span></h2>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-6">
            {traders.map((t, i) => (
              <article key={t.n} className="reveal spotlight card w-full p-8 text-center md:w-[calc((100%-3rem)/3)]" style={delay(i)}>
                <div className="flex h-16 items-center justify-center gap-4 text-gold" aria-hidden="true">
                  {t.m.map((d) => (
                    <svg key={d} viewBox="0 0 24 24" className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
                  ))}
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

      {/* So funktioniert's */}
      <section id="ablauf" className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="reveal text-center">
            <Eyebrow>In drei Schritten</Eyebrow>
            <h2 className="text-4xl md:text-6xl">So <span className="accent">funktioniert's</span></h2>
          </div>
          <ol className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              ["Beitreten", "Klicke auf den Button und schließe deine Mitgliedschaft ab."],
              ["Einladung erhalten", "Du bekommst deinen persönlichen Discord-Einladungslink."],
              ["Loslegen", "Inner-Circle-Bereich freischalten und direkt einsteigen."],
            ].map(([t, d], i) => (
              <li key={t} className="reveal text-center" style={delay(i, 140)}>
                <div className="accent text-8xl">0{i + 1}</div>
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
        <div className="reveal price-card mx-auto max-w-md">
          <div className="spotlight card p-8 text-center md:p-10">
            <Eyebrow>Mitgliedschaft</Eyebrow>
            <h2 className="text-4xl">Inner <span className="accent">Circle</span></h2>
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
      <section id="faq" className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-2xl">
          <div className="reveal text-center">
            <Eyebrow>Fragen</Eyebrow>
            <h2 className="text-4xl md:text-6xl">Häufige <span className="accent">Fragen</span></h2>
          </div>
          <div className="mt-12 border-t">
            {faqs.map((f, i) => (
              <details key={f.q} className="reveal group border-b py-5" style={delay(i, 60)}>
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
      <section id="final" className="relative isolate overflow-hidden px-5 py-28 text-center text-on-ink md:py-40">
        <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0 -z-10 rotate-180" />
        <div className="reveal">
          <h2 className="text-5xl md:text-7xl">Bereit für den <span className="accent">nächsten Schritt?</span></h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={ABLEFY_LINK} target="_blank" rel="noopener noreferrer" className="btn-gold">Jetzt Mitglied werden</a>
            <DiscordButton />
          </div>
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
            <a href={DISCORD_LINK} target="_blank" rel="noopener noreferrer" aria-label="Discord" className="hover:text-gold-light">
              <DiscordIcon />
            </a>
            <a href="https://www.instagram.com/bersach.dresden/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gold-light">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg>
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-on-ink-muted">©️ {new Date().getFullYear()} Bersach Tradingfloor</p>
      </footer>

      <FloatingCta />
      <CookieBanner />
    </div>
  );
}
