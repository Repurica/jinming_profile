import type { Capability } from "./types";

export const capabilities: readonly Capability[] = [
  {
    id: "full-stack",
    name: "Full-Stack",
    lenses: ["engineering", "workflow"],
    evidence: ["MaFe Bento", "SMU Ellipsis Coders Assembly", "Node.js"],
  },
  {
    id: "workflow-design",
    name: "Workflow Design",
    lenses: ["workflow", "fintech"],
    evidence: ["MaFe Bento", "Loan Ranger", "Project Caritas IX"],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    lenses: ["security"],
    evidence: ["SBS Transit", "Cybersecurity second major", "Open Source Intelligence"],
  },
  {
    id: "fintech",
    name: "FinTech",
    lenses: ["fintech"],
    evidence: ["Loan Ranger", "Financial Technology major", "Financial Technology & Analytics"],
  },
  {
    id: "analytics",
    name: "Analytics",
    lenses: ["fintech", "engineering"],
    evidence: ["Loan Ranger", "Data Analytics", "Financial Technology & Analytics"],
  },
  {
    id: "cloud",
    name: "Cloud",
    lenses: ["engineering"],
    evidence: ["AWS", "Cloud Infrastructure Architecture"],
  },
  {
    id: "mentoring",
    name: "Mentoring",
    lenses: ["engineering", "workflow"],
    evidence: ["SMU Ellipsis Coders Assembly"],
  },
  {
    id: "architecture",
    name: "Architecture",
    lenses: ["engineering"],
    evidence: ["MaFe Bento", "Cloud Infrastructure Architecture"],
  },
] as const;

export const systemCapabilities = [
  "WEB",
  "FINTECH",
  "CYBERSECURITY",
  "WORKFLOW",
  "DATA",
  "CLOUD",
  "PRODUCT",
  "LEADERSHIP",
  "ARCHITECTURE",
  "RISK",
  "ANALYTICS",
  "AUDITING",
] as const;
