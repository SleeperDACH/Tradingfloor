import { createRootRoute, HeadContent, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
  notFoundComponent: () => (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-center text-on-ink">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">404</p>
      <h1 className="text-5xl">Seite nicht gefunden</h1>
      <Link to="/" className="btn-outline-gold mt-10">Zur Startseite</Link>
    </main>
  ),
});
