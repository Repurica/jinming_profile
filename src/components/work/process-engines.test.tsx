import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ExperienceProvider } from "@/components/experience/experience-provider";
import { LoanProcessEngine } from "./loan-process-engine";
import { OrderFlowEngine } from "./order-flow-engine";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("proof-of-work process engines", () => {
  it("runs a visible order ticket through every workflow stage", () => {
    vi.useFakeTimers();
    render(
      <ExperienceProvider>
        <OrderFlowEngine />
      </ExperienceProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Run order" }));
    expect(screen.getByRole("status")).toHaveTextContent("Ticket at CUSTOMER");

    for (const stage of ["ORDER", "RESTAURANT SYSTEM", "KITCHEN", "PREPARATION", "SUPPLY / INVENTORY"]) {
      act(() => vi.advanceTimersByTime(520));
      expect(screen.getByRole("status")).toHaveTextContent(`Ticket at ${stage}`);
    }
  });

  it("completes directly when reduced motion is requested", async () => {
    vi.spyOn(window, "matchMedia").mockImplementation(
      (query) =>
        ({
          matches: query.includes("prefers-reduced-motion"),
          media: query,
          onchange: null,
          addListener: () => undefined,
          removeListener: () => undefined,
          addEventListener: () => undefined,
          removeEventListener: () => undefined,
          dispatchEvent: () => false,
        }) as MediaQueryList,
    );
    render(
      <ExperienceProvider>
        <OrderFlowEngine />
      </ExperienceProvider>,
    );

    await act(async () => undefined);
    fireEvent.click(screen.getByRole("button", { name: "Run order" }));
    expect(screen.getByRole("status")).toHaveTextContent("Ticket at SUPPLY / INVENTORY");
  });

  it("morphs emphasis across all Loan Ranger perspectives", async () => {
    const user = userEvent.setup();
    render(<LoanProcessEngine />);

    for (const stage of ["APPLICATION", "REVIEW / PROCESSING", "ISSUANCE", "MAINTENANCE"]) {
      expect(screen.getByText(stage)).toBeVisible();
    }

    await user.click(screen.getByRole("radio", { name: "Dealer" }));
    expect(screen.getByRole("radio", { name: "Dealer" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("region", { name: "Dealer perspective" })).toBeVisible();

    await user.click(screen.getByRole("radio", { name: "Financial institution" }));
    expect(screen.getByRole("region", { name: "Financial institution perspective" })).toBeVisible();
  });
});
