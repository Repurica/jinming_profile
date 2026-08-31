import { describe, expect, it } from "vitest";
import {
  capabilities,
  contactChannels,
  education,
  getProjectBySlug,
  profile,
  projects,
  skills,
  timelineEntries,
} from "./index";

describe("factual content", () => {
  it("keeps Jinming's approved positioning verbatim", () => {
    expect(profile.name).toBe("Cao Jinming");
    expect(profile.positioning).toBe("I turn complex workflows into usable product systems.");
    expect(profile.context).toBe(
      "FinTech & Analytics at SMU, working across software, cybersecurity, data, and business process design.",
    );
  });

  it("contains only the supplied education records", () => {
    expect(education).toHaveLength(2);
    expect(education.map((entry) => entry.period)).toEqual([
      "Aug 2025–Dec 2026",
      "Aug 2022–Dec 2025",
    ]);
    expect(education[0]?.program).toBe(
      "Master of IT in Business, Financial Technology & Analytics",
    );
    expect(education[1]?.program).toBe(
      "Bachelor of Science, Major in Financial Technology, Second Major in Cybersecurity",
    );
  });

  it("contains the five supplied projects and roles with unique slugs", () => {
    expect(projects.map((project) => project.name)).toEqual([
      "MaFe Bento",
      "SBS Transit",
      "Loan Ranger",
      "Project Caritas IX",
      "SMU Ellipsis Coders Assembly",
    ]);
    expect(projects.map((project) => project.role)).toEqual([
      "Full Stack Web Developer",
      "Cybersecurity Intern",
      "Project",
      "Logistics Head",
      "Mentor",
    ]);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(getProjectBySlug("mafe-bento")?.period).toBe("Sep 2025–May 2026");
  });

  it("keeps every unavailable personal channel null", () => {
    expect(contactChannels).toEqual({
      email: null,
      linkedIn: null,
      resumePdf: null,
      headshot: null,
      workAuthorization: null,
    });
  });

  it("preserves supplied skills, capability labels, and timeline years", () => {
    expect(skills.programming).toEqual(["Python", "C++", "Node.js"]);
    expect(skills.languages).toEqual(["English", "Chinese"]);
    expect(capabilities.map((capability) => capability.name)).toEqual([
      "Full-Stack",
      "Workflow Design",
      "Cybersecurity",
      "FinTech",
      "Analytics",
      "Cloud",
      "Mentoring",
      "Architecture",
    ]);
    expect([...new Set(timelineEntries.map((entry) => entry.year))]).toEqual([
      2022, 2023, 2024, 2025, 2026,
    ]);
  });
});
