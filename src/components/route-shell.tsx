import Link from "next/link";
import type { ReactNode } from "react";

export function RouteShell({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <main className="route-page" id="main-content" tabIndex={-1}>
        <header className="route-header">
          <nav aria-label="Breadcrumb"><Link href="/">JINMING / SYSTEM</Link><span>→</span><span>{label}</span></nav>
          <p>{label}</p>
          <h1>{title}</h1>
          <strong>{intro}</strong>
        </header>
        {children}
      </main>
    </>
  );
}
