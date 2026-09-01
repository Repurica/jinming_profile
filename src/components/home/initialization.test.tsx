import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ExperienceProvider } from "@/components/experience/experience-provider";
import { Initialization } from "./initialization";

const animation = vi.hoisted(() => ({
  complete: undefined as (() => void) | undefined,
}));

vi.mock("@gsap/react", async () => {
  const { useLayoutEffect } = await vi.importActual<typeof import("react")>("react");

  return {
    useGSAP: (
      callback: () => void | (() => void),
      config: { dependencies?: unknown[] },
    ) => {
      // The test double intentionally follows useGSAP's caller-supplied dependencies.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      useLayoutEffect(callback, config.dependencies);
    },
  };
});

vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    timeline: vi.fn(({ onComplete }: { onComplete: () => void }) => {
      animation.complete = onComplete;
      const timeline = {
        from: vi.fn(),
        to: vi.fn(),
        kill: vi.fn(),
      };
      timeline.from.mockReturnValue(timeline);
      timeline.to.mockReturnValue(timeline);
      return timeline;
    }),
  },
}));

vi.mock("split-type", () => ({
  default: class SplitTypeMock {
    chars: HTMLElement[] = [];
    revert = vi.fn();
  },
}));

function installMotionPreference(reducedMotion: boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query) =>
      ({
        matches: reducedMotion && query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }) as MediaQueryList,
  );
}

function InitializationFixture() {
  return (
    <ExperienceProvider>
      <button type="button">Underlying control</button>
      <main id="main-content" tabIndex={-1}>
        Main content
      </main>
      <Initialization />
    </ExperienceProvider>
  );
}

describe("Initialization", () => {
  beforeEach(() => {
    animation.complete = undefined;
    installMotionPreference(false);
  });

  it("presents the blocking sequence as a labelled modal dialog", () => {
    render(<InitializationFixture />);

    const dialog = screen.getByRole("dialog", { name: "System initialization" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("loops focus on the skip control and moves it to main after manual dismissal", async () => {
    const user = userEvent.setup();
    render(<InitializationFixture />);

    const skip = screen.getByRole("button", { name: "Skip initialization" });
    const underlying = screen.getByRole("button", { name: "Underlying control" });
    expect(skip).toHaveFocus();

    await user.tab();
    expect(skip).toHaveFocus();
    await user.tab({ shift: true });
    expect(skip).toHaveFocus();
    expect(underlying).not.toHaveFocus();

    await user.click(skip);

    expect(skip).not.toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it("does not move focus to main when the animation completes automatically", () => {
    render(<InitializationFixture />);
    const underlying = screen.getByRole("button", { name: "Underlying control" });
    underlying.focus();

    act(() => animation.complete?.());

    expect(screen.queryByRole("dialog", { name: "System initialization" })).not.toBeInTheDocument();
    expect(underlying).toHaveFocus();
    expect(screen.getByRole("main")).not.toHaveFocus();
  });

  it("does not steal focus while bypassing initialization for reduced motion", async () => {
    installMotionPreference(true);
    const origin = document.createElement("button");
    document.body.append(origin);
    origin.focus();

    render(<InitializationFixture />);

    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "System initialization" }),
      ).not.toBeInTheDocument(),
    );
    expect(origin).toHaveFocus();
    expect(screen.getByRole("main")).not.toHaveFocus();
    origin.remove();
  });
});