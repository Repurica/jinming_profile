import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SystemMap } from "./system-map";
import { SystemMapMobile } from "./system-map-mobile";

describe("System Map", () => {
  it("selects a project with the keyboard and exposes its factual preview", async () => {
    const user = userEvent.setup();
    render(<SystemMap />);

    const mafe = screen.getByRole("button", { name: "MAFE BENTO" });
    mafe.focus();
    await user.keyboard("{Enter}");

    const preview = screen.getByRole("region", { name: "MAFE BENTO system preview" });
    expect(within(preview).getByText("PROBLEM")).toBeVisible();
    expect(within(preview).getByText("ROLE")).toBeVisible();
    expect(within(preview).getByText("SYSTEM")).toBeVisible();
    expect(within(preview).getByText("PROOF")).toBeVisible();
    expect(within(preview).getByRole("link", { name: /enter case/i })).toHaveAttribute(
      "href",
      "/work/mafe-bento",
    );
  });

  it("marks only connected capability nodes as active", async () => {
    const user = userEvent.setup();
    render(<SystemMap />);

    await user.click(screen.getByRole("button", { name: "MAFE BENTO" }));

    expect(screen.getByRole("button", { name: "WEB" })).toHaveAttribute("data-connected", "true");
    expect(screen.getByRole("button", { name: "ARCHITECTURE" })).toHaveAttribute(
      "data-connected",
      "true",
    );
    expect(screen.getByRole("button", { name: "CYBERSECURITY" })).toHaveAttribute(
      "data-connected",
      "false",
    );
  });

  it("provides a mobile vertical project narrative", () => {
    render(<SystemMapMobile />);

    expect(screen.getByText("MOBILE SYSTEM NARRATIVE")).toBeVisible();
    expect(screen.getByRole("button", { name: /mafe bento.*inspect/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /sbs transit.*inspect/i })).toBeVisible();
  });
});
