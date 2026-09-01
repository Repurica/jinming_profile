import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RouteShell } from "@/components/route-shell";
import { getProjectBySlug, projects } from "@/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <RouteShell label="CASE FILE" title={project.name} intro={project.summary}>
      <article className="case-page route-content">
        <header className="case-register">
          <div><span>ROLE</span><strong>{project.role}</strong></div>
          <div><span>PERIOD</span><strong>{project.period ?? "Not supplied"}</strong></div>
          <div><span>LOCATION</span><strong>{project.location ?? "Not supplied"}</strong></div>
        </header>
        <dl className="case-system-record">
          <div><dt>PROBLEM</dt><dd>{project.problem}</dd></div>
          <div><dt>SYSTEM</dt><dd>{project.system}</dd></div>
          <div><dt>PROOF</dt><dd>{project.proof}</dd></div>
        </dl>
        <section className="case-facts"><h2>Factual record</h2><ol>{project.facts.map((fact, index) => <li key={fact}><span>0{index + 1}</span><p>{fact}</p></li>)}</ol></section>
        <footer className="case-capabilities"><span>CONNECTED CAPABILITIES</span><p>{project.capabilities.join(" / ")}</p><Link href="/#system-map">RETURN TO SYSTEM MAP ↑</Link></footer>
      </article>
    </RouteShell>
  );
}
