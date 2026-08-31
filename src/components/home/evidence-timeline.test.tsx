import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { EvidenceGraph } from "@/components/evidence/evidence-graph";
import { RiskLayer } from "@/components/risk/risk-layer";
import { TimelineView } from "@/components/timeline/timeline-view";

describe("risk, evidence, and timeline chapters", () => {
  it("exposes all risk modes and campaign stages without metrics", async () => {
    const user = userEvent.setup();
    render(<RiskLayer />);

    for (const risk of ["TRAINING", "PHISHING", "AUDIT", "DOCUMENT RISK"]) {
      expect(screen.getByRole("radio", { name: risk })).toBeVisible();
    }
    for (const stage of ["PREP", "VENDOR COORDINATION", "TEST", "EXECUTION", "REVIEW"]) {
      expect(screen.getByText(stage)).toBeVisible();
    }

    await user.click(screen.getByRole("radio", { name: "AUDIT" }));
    expect(screen.getByRole("region", { name: "AUDIT risk evidence" })).toBeVisible();
  });

  it("connects a capability only to supplied evidence and never percentages", async () => {
    const user = userEvent.setup();
    const { container } = render(<EvidenceGraph />);

    await user.click(screen.getByRole("button", { name: "Cybersecurity" }));
    const evidence = screen.getByRole("region", { name: "Cybersecurity evidence" });
    expect(within(evidence).getByText("SBS Transit")).toBeVisible();
    expect(within(evidence).getByText("Cybersecurity second major")).toBeVisible();
    expect(container).not.toHaveTextContent("%");
  });

  it("filters the timeline while preserving chronological order", async () => {
    const user = userEvent.setup();
    const { container } = render(<TimelineView />);

    await user.click(screen.getByRole("radio", { name: "Work" }));
    const years = Array.from(container.querySelectorAll("time")).map((node) => Number(node.textContent));
    expect(years).toEqual([...years].sort((a, b) => a - b));
    expect(screen.getByText("SBS Transit")).toBeVisible();
    expect(screen.queryByText("Project Caritas IX")).not.toBeInTheDocument();
  });
});
