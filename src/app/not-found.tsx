import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page" id="main-content">
      <span>ERROR / 404</span>
      <h1>System file<br />not found.</h1>
      <p>The requested route or case file is not part of the supplied system.</p>
      <Link href="/">RETURN TO JINMING / SYSTEM →</Link>
    </main>
  );
}
