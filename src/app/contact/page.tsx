import type { Metadata } from "next";
import { ContactTerminal } from "@/components/contact/contact-terminal";
import { RouteShell } from "@/components/route-shell";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <RouteShell label="07 / SIGNAL" title="Start with a clear signal." intro="Build an outreach draft locally. No message is sent and no personal channel is fabricated.">
      <ContactTerminal />
    </RouteShell>
  );
}
