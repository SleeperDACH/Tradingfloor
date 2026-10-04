import { createFileRoute, Link, notFound } from "@tanstack/react-router";

const pages = {
  impressum: { title: "Impressum", body: "[PLATZHALTER: Angaben gemäß § 5 DDG – Name, Anschrift, Kontakt, ggf. USt-IdNr.]" },
  datenschutz: { title: "Datenschutzerklärung", body: "[PLATZHALTER: Datenschutzerklärung nach DSGVO einfügen]" },
  agb: { title: "AGB", body: "[PLATZHALTER: Allgemeine Geschäftsbedingungen einfügen]" },
  widerruf: { title: "Widerrufsbelehrung", body: "[PLATZHALTER: Widerrufsbelehrung einfügen]" },
} as const;

type Slug = keyof typeof pages;

export const Route = createFileRoute("/rechtliches/$slug")({
  loader: ({ params }) => {
    const page = pages[params.slug as Slug];
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Rechtliches"} – Bersach Tradingfloor` }, { name: "robots", content: "noindex" }],
  }),
  component: Legal,
});

function Legal() {
  const page = Route.useLoaderData();
  return (
    <main className="min-h-screen px-5 py-24">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="text-sm text-muted-foreground hover:text-gold">← Zurück zur Startseite</Link>
        <h1 className="mt-10 text-5xl">{page.title}</h1>
        <div className="gold-line my-8" />
        <p className="whitespace-pre-line text-muted-foreground">{page.body}</p>
      </div>
    </main>
  );
}
