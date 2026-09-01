import type { Metadata } from "next";
import { RouteShell } from "@/components/route-shell";
import { education, profile, skills } from "@/content";

export const metadata: Metadata = { title: "Profile", alternates: { canonical: "/profile" } };

export default function ProfilePage() {
  return (
    <RouteShell label="01 / PROFILE" title={profile.name} intro={profile.positioning}>
      <section className="route-content profile-route-content">
        <div className="route-lead"><span>POSITION</span><p>{profile.context}</p><strong>{profile.bridge}</strong></div>
        <div className="route-records">
          <h2>Education</h2>
          {education.map((entry) => <article key={entry.program}><span>{entry.period}</span><h3>{entry.institution}</h3><p>{entry.program}</p>{entry.exposure ? <small>Additional exposure: {entry.exposure.join(", ")}</small> : null}</article>)}
        </div>
        <div className="route-records">
          <h2>Skills</h2>
          <article><span>PROGRAMMING</span><p>{skills.programming.join(" · ")}</p></article>
          <article><span>AREAS</span><p>{skills.areas.join(" · ")}</p></article>
          <article><span>LANGUAGES</span><p>{skills.languages.join(" · ")}</p></article>
        </div>
      </section>
    </RouteShell>
  );
}
