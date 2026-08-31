import type { ContactChannels, Education } from "./types";

export const profile = {
  name: "Cao Jinming",
  systemName: "JINMING / SYSTEM",
  positioning: "I turn complex workflows into usable product systems.",
  context:
    "FinTech & Analytics at SMU, working across software, cybersecurity, data, and business process design.",
  bridge: "Between business problems and technical systems.",
} as const;

export const contactChannels: ContactChannels = {
  email: null,
  linkedIn: null,
  resumePdf: null,
  headshot: null,
  workAuthorization: null,
};

export const education: readonly Education[] = [
  {
    institution: "Singapore Management University",
    program: "Master of IT in Business, Financial Technology & Analytics",
    period: "Aug 2025–Dec 2026",
    exposure: ["Machine Learning", "Blockchain Technology"],
  },
  {
    institution: "Singapore Management University",
    program:
      "Bachelor of Science, Major in Financial Technology, Second Major in Cybersecurity",
    period: "Aug 2022–Dec 2025",
  },
] as const;

export const skills = {
  programming: ["Python", "C++", "Node.js"],
  areas: [
    "Full-stack development",
    "Cybersecurity",
    "Open Source Intelligence",
    "Data Analytics",
    "AWS",
    "Cloud Infrastructure Architecture",
  ],
  languages: ["English", "Chinese"],
} as const;
