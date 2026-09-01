"use client";

import { education, profile, projects, skills } from "@/content";

export function ResumeDocument() {
  return (
    <>
      <a className="skip-link" href="#resume-content">Skip to resume content</a>
      <main className="resume-page" id="resume-content">
        <header className="resume-header">
          <div><p>JINMING / SYSTEM — RESUME FILE</p><h1>{profile.name}</h1><strong>{profile.bridge}</strong></div>
          <button type="button" onClick={() => window.print()}>Print or save as PDF</button>
        </header>
        <section>
          <h2>Profile</h2>
          <div><p>{profile.positioning}</p><p>{profile.context}</p></div>
        </section>
        <section>
          <h2>Experience & projects</h2>
          <div className="resume-entries">
            {projects.map((project) => (
              <article key={project.slug}>
                <header><h3>{project.name}</h3><span>{project.period ?? ""}</span></header>
                <strong>{project.role}{project.location ? ` — ${project.location}` : ""}</strong>
                <p>{project.summary}</p>
                <ul>{project.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>
        <section>
          <h2>Education</h2>
          <div className="resume-entries">
            {education.map((entry) => (
              <article key={entry.program}>
                <header><h3>{entry.institution}</h3><span>{entry.period}</span></header>
                <p>{entry.program}</p>
                {entry.exposure ? <p>Additional exposure: {entry.exposure.join(", ")}.</p> : null}
              </article>
            ))}
          </div>
        </section>
        <section>
          <h2>Skills</h2>
          <div className="resume-skills">
            <p><strong>Programming</strong>{skills.programming.join(" · ")}</p>
            <p><strong>Areas</strong>{skills.areas.join(" · ")}</p>
            <p><strong>Languages</strong>{skills.languages.join(" · ")}</p>
          </div>
        </section>
        <footer>Direct contact channels and a downloadable PDF are not configured in the supplied profile data.</footer>
      </main>
    </>
  );
}
