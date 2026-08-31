export type RecruiterLens = "fintech" | "engineering" | "security" | "workflow";

export type ProjectSlug =
  | "mafe-bento"
  | "sbs-transit"
  | "loan-ranger"
  | "project-caritas-ix"
  | "smu-ellipsis-coders-assembly";

export type ContactChannels = {
  email: string | null;
  linkedIn: string | null;
  resumePdf: string | null;
  headshot: string | null;
  workAuthorization: string | null;
};

export type Project = {
  slug: ProjectSlug;
  mapLabel: string;
  name: string;
  role: string;
  location: string | null;
  period: string | null;
  summary: string;
  problem: string;
  system: string;
  proof: string;
  facts: readonly string[];
  capabilities: readonly string[];
  lenses: readonly RecruiterLens[];
};

export type Education = {
  institution: "Singapore Management University";
  program: string;
  period: string;
  exposure?: readonly string[];
};

export type TimelineCategory = "education" | "work" | "leadership";

export type TimelineEntry = {
  id: string;
  year: 2022 | 2023 | 2024 | 2025 | 2026;
  title: string;
  detail: string;
  category: TimelineCategory;
  projectSlug?: ProjectSlug;
};

export type Capability = {
  id: string;
  name: string;
  lenses: readonly RecruiterLens[];
  evidence: readonly string[];
};
