import { createFileRoute, Link, notFound } from "@tanstack/react-router";

type Block = { h: string } | { p: string } | { ul: string[] };

const pages: Record<string, { title: string; body: Block[] }> = {
  impressum: {
    title: "Impressum",
    body: [
      { h: "Angaben gemäß § 5 DDG" },
      { p: "William Berger\n1 zu 1 Mentoring und Dienstleistungen im Bereich Trading\nCharlottenstraße 34\n01099 Dresden" },
      { h: "Kontakt" },
      { p: "E-Mail: william.berger@gmx.de" },
      { h: "Marke" },
      { p: "Bersach" },
    ],
  },
  datenschutz: {
    title: "Datenschutzerklärung",
    body: [
      { h: "Verantwortlicher" },
      { p: "William Berger\nCharlottenstraße 34\n01099 Dresden\nE-Mail: william.berger@gmx.de" },
      { h: "Erhebung und Verarbeitung personenbezogener Daten" },
      { p: "Wir erheben und verarbeiten personenbezogene Daten nur, soweit dies zur Erbringung unserer Leistungen erforderlich ist oder Sie ausdrücklich eingewilligt haben. Dies umfasst insbesondere:" },
      { ul: [
        "Name und Kontaktdaten (bei der Inanspruchnahme von Mentoring-Leistungen)",
        "Kommunikationsdaten (E-Mails, Nachrichten)",
        "Zahlungsdaten (im Rahmen der Vertragsabwicklung)",
        "Technische Daten beim Besuch unserer Online-Auftritte (z. B. IP-Adresse, Zeitpunkt des Zugriffs)",
      ] },
      { h: "Rechtsgrundlagen der Verarbeitung" },
      { p: "Die Verarbeitung Ihrer Daten erfolgt auf folgenden Rechtsgrundlagen:" },
      { ul: [
        "Art. 6 Abs. 1 lit. b DSGVO – zur Erfüllung eines Vertrages (z. B. Mentoring-Vereinbarung)",
        "Art. 6 Abs. 1 lit. a DSGVO – auf Basis Ihrer Einwilligung",
        "Art. 6 Abs. 1 lit. c DSGVO – zur Erfüllung rechtlicher Verpflichtungen",
        "Art. 6 Abs. 1 lit. f DSGVO – auf Basis berechtigter Interessen",
      ] },
      { h: "Weitergabe von Daten an Dritte" },
      { p: "Eine Übermittlung Ihrer persönlichen Daten an Dritte findet grundsätzlich nicht statt, außer wenn dies zur Vertragserfüllung erforderlich ist, wir dazu gesetzlich verpflichtet sind oder Sie ausdrücklich eingewilligt haben. Zahlungsabwicklungen erfolgen über geeignete Zahlungsdienstleister, die ihrerseits zur Einhaltung der DSGVO verpflichtet sind." },
      { h: "Soziale Netzwerke (Instagram, TikTok)" },
      { p: "Wir betreiben Präsenzen auf Instagram und TikTok. Beim Besuch dieser Seiten werden durch die jeweiligen Plattformbetreiber Daten erhoben und verarbeitet. Wir haben keinen Einfluss auf diese Datenverarbeitungen. Nähere Informationen entnehmen Sie bitte den Datenschutzerklärungen von Instagram (Meta Platforms Ireland Ltd.) bzw. TikTok (TikTok Technology Limited)." },
      { h: "Speicherdauer" },
      { p: "Ihre personenbezogenen Daten werden nur so lange gespeichert, wie dies für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Steuerlich relevante Unterlagen werden gemäß § 147 AO für 10 Jahre aufbewahrt. Nach Ablauf der jeweiligen Fristen werden die Daten gelöscht." },
      { h: "Ihre Rechte als betroffene Person" },
      { p: "Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:" },
      { ul: [
        "Recht auf Auskunft (Art. 15 DSGVO)",
        "Recht auf Berichtigung (Art. 16 DSGVO)",
        "Recht auf Löschung (Art. 17 DSGVO)",
        "Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)",
        "Recht auf Datenübertragbarkeit (Art. 20 DSGVO)",
        "Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
      ] },
      { p: "Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: william.berger@gmx.de" },
      { h: "Beschwerderecht bei der Aufsichtsbehörde" },
      { p: "Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Die zuständige Aufsichtsbehörde für Sachsen ist der Sächsische Datenschutz- und Transparenzbeauftragte (SDtB), Devrientstraße 5, 01067 Dresden." },
      { h: "Datensicherheit" },
      { p: "Wir treffen angemessene technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten gegen unbeabsichtigte oder unrechtmäßige Vernichtung, Verlust, Veränderung oder unbefugten Zugriff zu schützen." },
      { h: "Aktualität dieser Datenschutzerklärung" },
      { p: "Diese Datenschutzerklärung ist aktuell gültig und hat den Stand: Juni 2026. Durch die Weiterentwicklung unserer Leistungen oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern." },
    ],
  },
  agb: { title: "AGB", body: [{ p: "[PLATZHALTER: Allgemeine Geschäftsbedingungen einfügen]" }] },
  widerruf: { title: "Widerrufsbelehrung", body: [{ p: "[PLATZHALTER: Widerrufsbelehrung einfügen]" }] },
};

export const Route = createFileRoute("/rechtliches/$slug")({
  loader: ({ params }) => {
    const page = pages[params.slug];
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
        <div className="space-y-4 text-muted-foreground">
          {page.body.map((b, i) =>
            "h" in b ? <h2 key={i} className="pt-6 text-2xl text-foreground">{b.h}</h2>
            : "ul" in b ? <ul key={i} className="list-disc space-y-1 pl-5">{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>
            : <p key={i} className="whitespace-pre-line">{b.p}</p>
          )}
        </div>
      </div>
    </main>
  );
}
