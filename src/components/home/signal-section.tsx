import Link from "next/link";
import { ContactTerminal } from "@/components/contact/contact-terminal";

export function SignalSection() {
  return (
    <section className="chapter signal-section" id="signal" aria-labelledby="signal-title">
      <header className="chapter-header">
        <div><p className="chapter-label">07 / SIGNAL</p><h2 id="signal-title">A useful<br />first message.</h2></div>
        <p>No fake form submission. Build and copy a concise outreach draft, or open the dedicated contact route.</p>
      </header>
      <ContactTerminal />
      <Link className="section-route-link" href="/contact">OPEN CONTACT ROUTE ↗</Link>
    </section>
  );
}
