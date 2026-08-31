import Link from "next/link";

export function MobileNav() {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <Link href="/" className="mobile-mark" aria-label="Jinming System home">JM/SYS</Link>
      <Link href="/#work">WORK</Link>
      <Link href="/resume">RESUME</Link>
      <Link href="/contact">SIGNAL</Link>
    </nav>
  );
}
