export const risks = [
  {
    id: "training",
    label: "TRAINING",
    evidence: "Improved internal cybersecurity training modules and aligned material with current policies.",
  },
  {
    id: "phishing",
    label: "PHISHING",
    evidence:
      "Coordinated an internal phishing campaign with internal teams and external vendors across setup, testing, and execution.",
  },
  {
    id: "audit",
    label: "AUDIT",
    evidence: "Identified possible security gaps during auditing.",
  },
  {
    id: "document-risk",
    label: "DOCUMENT RISK",
    evidence: "Helped reduce confidential-document exposure risk.",
  },
] as const;

export const campaignStages = ["PREP", "VENDOR COORDINATION", "TEST", "EXECUTION", "REVIEW"] as const;
