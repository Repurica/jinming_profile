import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ExperienceProvider } from "@/components/experience/experience-provider";
import { Initialization } from "./initialization";
import { ProfileHero } from "./profile-hero";

afterEach(() => vi.restoreAllMocks());

describe("profile hero", () => {
  it("shows approved positioning and durable recruiter destinations", () => {
    render(
      <ExperienceProvider>
        <ProfileHero />
      </ExperienceProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /cao jinming/i, level: 1 }),
    ).toBeVisible();
    expect(screen.getByText("I turn complex workflows into usable product systems.")).toBeVisible();
    expect(screen.getByRole("link", { name: /read the work/i })).toHaveAttribute("href", "#work");
    expect(screen.getByRole("link", { name: /open resume/i })).toHaveAttribute("href", "/resume");
    expect(screen.getByText("I BUILD BETWEEN THEM.")).toBeVisible();
  });

  it("links key artifacts to their factual case files", () => {
    render(
      <ExperienceProvider>
        <ProfileHero />
      </ExperienceProvider>,
    );

    expect(screen.getByRole("link", { name: /order ticket/i })).toHaveAttribute(
      "href",
      "/work/mafe-bento",
    );
    expect(screen.getByRole("link", { name: /security warning/i })).toHaveAttribute(
      "href",
      "/work/sbs-transit",
    );
    expect(screen.getByRole("link", { name: /loan sheet/i })).toHaveAttribute(
      "href",
      "/work/loan-ranger",
    );
    expect(screen.getByRole("link", { name: /logistics label/i })).toHaveAttribute(
      "href",
      "/work/project-caritas-ix",
    );
  });

  it("bypasses initialization when reduced motion is requested", async () => {
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
        <Initialization />
      </ExperienceProvider>,
    );

    await waitFor(() =>
      expect(screen.queryByText("SYSTEM INITIALIZATION")).not.toBeInTheDocument(),
    );
  });

  it("lets users skip the blocking initialization sequence", async () => {
    const user = userEvent.setup();
    render(
      <ExperienceProvider>
        <Initialization />
      </ExperienceProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Skip initialization" }));

    expect(screen.queryByText("SYSTEM INITIALIZATION")).not.toBeInTheDocument();
  });
});
