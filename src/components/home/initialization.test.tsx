import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ExperienceProvider } from "@/components/experience/experience-provider";
import { Initialization } from "./initialization";

const animation = vi.hoisted(() => ({
  complete: undefined as (() => void) | undefined,
}));

const motionPreference = {
  reduced: false,
  listeners: new Set<() => void>(),
};

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
  motionPreference.reduced = reducedMotion;
  motionPreference.listeners.clear();
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query) =>
      ({
        get matches() {
          return motionPreference.reduced && query.includes("prefers-reduced-motion");
        },
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: (_type: string, listener: () => void) => {
          motionPreference.listeners.add(listener);
        },
        removeEventListener: (_type: string, listener: () => void) => {
          motionPreference.listeners.delete(listener);
        },
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  );
}

function setMotionPreference(reducedMotion: boolean) {
  motionPreference.reduced = reducedMotion;
  motionPreference.listeners.forEach((listener) => listener());
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

  it("moves focus to main when the animation completes with dialog focus", () => {
    render(<InitializationFixture />);

    expect(screen.getByRole("button", { name: "Skip initialization" })).toHaveFocus();

    act(() => animation.complete?.());

    expect(screen.queryByRole("dialog", { name: "System initialization" })).not.toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it("preserves external focus when the animation completes", () => {
    render(<InitializationFixture />);
    const underlying = screen.getByRole("button", { name: "Underlying control" });
    underlying.focus();

    act(() => animation.complete?.());

    expect(screen.queryByRole("dialog", { name: "System initialization" })).not.toBeInTheDocument();
    expect(underlying).toHaveFocus();
    expect(screen.getByRole("main")).not.toHaveFocus();
  });

  it("moves focus to main when reduced motion changes with dialog focus", async () => {
    render(<InitializationFixture />);

    expect(screen.getByRole("button", { name: "Skip initialization" })).toHaveFocus();

    act(() => setMotionPreference(true));

    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "System initialization" }),
      ).not.toBeInTheDocument(),
    );
    expect(screen.getByRole("main")).toHaveFocus();
  });

  it("preserves external focus when reduced motion changes", async () => {
    render(<InitializationFixture />);
    const underlying = screen.getByRole("button", { name: "Underlying control" });
    underlying.focus();

    act(() => setMotionPreference(true));

    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", { name: "System initialization" }),
      ).not.toBeInTheDocument(),
    );
    expect(underlying).toHaveFocus();
    expect(screen.getByRole("main")).not.toHaveFocus();
  });
});