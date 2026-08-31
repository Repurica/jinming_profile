import type { Project, ProjectSlug } from "./types";

export const projects: readonly Project[] = [
  {
    slug: "mafe-bento",
    mapLabel: "MAFE BENTO",
    name: "MaFe Bento",
    role: "Full Stack Web Developer",
    location: "Singapore",
    period: "Sep 2025–May 2026",
    summary:
      "Mapped restaurant workflows into requirements, architecture, implementation, deployment, and post-launch iteration for an online ordering platform.",
    problem:
      "Translate the order-to-preparation work of restaurant owners and kitchen staff into a usable product workflow.",
    system:
      "An end-to-end online ordering platform, with technical and functional design for a proposed supply-chain-management system.",
    proof:
      "User flows, acceptance criteria, architecture, implementation, deployment, feature iteration, inventory logic, supplier data flows, and scalability considerations.",
    facts: [
      "Worked with restaurant owners and kitchen staff.",
      "Mapped order-to-preparation workflows and converted them into functional requirements.",
      "Defined user flows and acceptance criteria.",
      "Handled requirements, architecture, implementation, deployment, and post-launch feature iteration.",
      "Produced technical and functional design for a proposed supply-chain-management system.",
    ],
    capabilities: ["WEB", "WORKFLOW", "PRODUCT", "ARCHITECTURE", "CLOUD"],
    lenses: ["engineering", "workflow"],
  },
  {
    slug: "sbs-transit",
    mapLabel: "SBS TRANSIT",
    name: "SBS Transit",
    role: "Cybersecurity Intern",
    location: "Singapore",
    period: "May 2024–Aug 2024",
    summary:
      "Worked across cybersecurity training, phishing-campaign coordination, auditing, and confidential-document exposure risk.",
    problem:
      "Support cybersecurity awareness and reduce risk across training, campaign execution, auditing, and document handling.",
    system:
      "Updated training material, coordinated campaign operations, and contributed risk observations during auditing.",
    proof:
      "Training aligned with current policies, vendor and internal-team coordination, identified possible security gaps, and confidential-document risk work.",
    facts: [
      "Improved internal cybersecurity training modules and aligned material with current policies.",
      "Coordinated an internal phishing campaign with internal teams and external vendors across setup, testing, and execution.",
      "Identified possible security gaps during auditing.",
      "Helped reduce confidential-document exposure risk.",
    ],
    capabilities: ["CYBERSECURITY", "RISK", "AUDITING", "WORKFLOW"],
    lenses: ["security", "workflow"],
  },
  {
    slug: "loan-ranger",
    mapLabel: "LOAN RANGER",
    name: "Loan Ranger",
    role: "Project",
    location: null,
    period: null,
    summary:
      "A design-thinking and analytics project for the vehicle-loan lifecycle across application, issuance, and maintenance.",
    problem:
      "Improve the vehicle-loan lifecycle for customers, dealers, and financial institutions.",
    system:
      "A process view spanning application, review and processing, issuance, and maintenance.",
    proof:
      "Considered customer experience, dealer experience, and process efficiency for financial institutions.",
    facts: [
      "Used design thinking and analytics.",
      "Considered customer experience and dealer experience.",
      "Considered process efficiency for financial institutions.",
    ],
    capabilities: ["FINTECH", "ANALYTICS", "WORKFLOW", "PRODUCT"],
    lenses: ["fintech", "workflow"],
  },
  {
    slug: "project-caritas-ix",
    mapLabel: "CARITAS IX",
    name: "Project Caritas IX",
    role: "Logistics Head",
    location: null,
    period: null,
    summary:
      "Designed and implemented tracking systems for purchasing, transit, inventory, record accuracy, and logistical coordination.",
    problem: "Coordinate purchasing, transit, inventory, and records accurately.",
    system: "Tracking systems for logistics operations and coordination.",
    proof:
      "Implemented tracking across purchasing, transit, inventory, record accuracy, and logistical coordination.",
    facts: [
      "Designed and implemented tracking systems for purchasing and transit.",
      "Tracked inventory and record accuracy.",
      "Supported logistical coordination.",
    ],
    capabilities: ["WORKFLOW", "DATA", "LEADERSHIP"],
    lenses: ["workflow", "engineering"],
  },
  {
    slug: "smu-ellipsis-coders-assembly",
    mapLabel: "ELLIPSIS",
    name: "SMU Ellipsis Coders Assembly",
    role: "Mentor",
    location: null,
    period: null,
    summary:
      "Helped juniors with web application development, programming concepts, debugging, and concept clarification.",
    problem: "Help juniors move through programming and web-development blockers.",
    system: "Mentoring through debugging, concept clarification, and application-development guidance.",
    proof:
      "Support covered web application development, programming concepts, debugging, and concept clarification.",
    facts: [
      "Helped juniors with web application development.",
      "Supported programming concepts and debugging.",
      "Clarified technical concepts.",
    ],
    capabilities: ["WEB", "LEADERSHIP"],
    lenses: ["engineering", "workflow"],
  },
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === (slug as ProjectSlug));
}
