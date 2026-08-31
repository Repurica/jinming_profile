import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { PersonJsonLd } from "@/components/seo/person-json-ld";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CAO JINMING — JINMING / SYSTEM",
    template: "%s — JINMING / SYSTEM",
  },
  description:
    "Cao Jinming turns complex business workflows into usable product systems across FinTech, software, cybersecurity, and data.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    title: "CAO JINMING — JINMING / SYSTEM",
    description: "Between business problems and technical systems.",
  },
  twitter: {
    card: "summary",
    title: "CAO JINMING — JINMING / SYSTEM",
    description: "Between business problems and technical systems.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <PersonJsonLd />
        {children}
      </body>
    </html>
  );
}
