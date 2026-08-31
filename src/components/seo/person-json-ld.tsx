import { education, profile, skills } from "@/content";

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    description: profile.context,
    alumniOf: education.map((entry) => ({
      "@type": "EducationalOrganization",
      name: entry.institution,
    })),
    knowsAbout: [...skills.programming, ...skills.areas],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
