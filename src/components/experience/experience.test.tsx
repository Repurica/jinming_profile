import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { CommandPalette } from "./command-palette";
import { ExperienceProvider } from "./experience-provider";
import { RecruiterLens } from "./recruiter-lens";

function Shell({ children }: { children: ReactNode }) {
  return <ExperienceProvider>{children}</ExperienceProvider>;
}

describe("global experience controls", () => {
  it("changes recruiter lens with arrow keys", async () => {
    const user = userEvent.setup();
    render(
      <Shell>
        <RecruiterLens />
      </Shell>,
    );

    const fintech = screen.getByRole("radio", { name: "FinTech" });
    fintech.focus();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("radio", { name: "Engineering" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    expect(document.documentElement).toHaveAttribute("data-lens", "engineering");
  });

  it("opens with Ctrl+K, runs commands, and restores focus on Escape", async () => {
    const user = userEvent.setup();
    const navigate = vi.fn();
    render(
      <Shell>
        <button type="button">Palette origin</button>
        <CommandPalette onNavigate={navigate} />
      </Shell>,
    );

    const origin = screen.getByRole("button", { name: "Palette origin" });
    origin.focus();
    await user.keyboard("{Control>}k{/Control}");

    expect(screen.getByRole("dialog", { name: "System command palette" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: /open resume/i }));
    expect(navigate).toHaveBeenCalledWith("/resume");

    origin.focus();
    await user.keyboard("{Control>}k{/Control}");
    const dialog = screen.getByRole("dialog");
    await user.keyboard("{Escape}");
    await waitForElementToBeRemoved(dialog);
    expect(origin).toHaveFocus();
  });
});
