import { ProfileHero } from "@/components/home/profile-hero";
import { SystemMapSection } from "@/components/home/system-map-section";
import { ProofOfWorkSection } from "@/components/home/proof-of-work-section";

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
        <SystemMapSection />
        <ProofOfWorkSection />
      </main>
    </>
  );
}
