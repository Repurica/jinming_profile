import Link from "next/link";

const links = [
  ["SYSTEM", "/#system"],
  ["WORK", "/#work"],
  ["TIMELINE", "/timeline"],
  ["PROFILE", "/profile"],
  ["SIGNAL", "/contact"],
] as const;

export function SystemDock() {
  return (
    <nav className="system-dock" aria-label="System chapters">
      <span className="dock-status"><i /> SYSTEM ONLINE</span>
      {links.map(([label, href], index) => (
        <Link key={label} href={href} data-cursor="OPEN FILE →">
          <span>0{index + 1}</span>
          {label}
        </Link>
      ))}
      <span className="dock-command">⌘ K</span>
    </nav>
  );
}
