import { ProfileHero } from "@/components/home/profile-hero";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <main id="main-content" tabIndex={-1}>
        <div id="system">
          <ProfileHero />
        </div>
      </main>
    </>
  );
}
