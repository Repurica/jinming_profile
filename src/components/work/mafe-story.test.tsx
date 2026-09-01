import { act, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ExperienceProvider } from "@/components/experience/experience-provider";
import { MafeStory } from "./mafe-story";

const mocks = vi.hoisted(() => ({
  to: vi.fn(),
}));

vi.mock("@gsap/react", async () => {
  const { useLayoutEffect, useRef } = await vi.importActual<typeof import("react")>("react");

  return {
    useGSAP: (
      callback: () => void | (() => void),
      config: { dependencies?: unknown[]; revertOnUpdate?: boolean },
    ) => {
      const cleanup = useRef<Array<() => void>>([]);

      useLayoutEffect(() => {
        if (config.revertOnUpdate) {
          cleanup.current.forEach((dispose) => dispose());
          cleanup.current = [];
        }

        const dispose = callback();
        if (dispose) cleanup.current.push(dispose);
        // The test double intentionally follows useGSAP's caller-supplied dependencies.
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, config.dependencies);

      useLayoutEffect(
        () => () => {
          cleanup.current.forEach((dispose) => dispose());
          cleanup.current = [];
        },
        [],
      );
    },
  };
});

vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    to: mocks.to,
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

function installMotionPreference(initialReducedMotion: boolean) {
  let reducedMotion = initialReducedMotion;
  const listeners = new Set<() => void>();

  vi.spyOn(window, "matchMedia").mockImplementation(
    (query) =>
      ({
        get matches() {
          if (query.includes("prefers-reduced-motion: reduce")) return reducedMotion;
          if (query.includes("prefers-reduced-motion: no-preference")) return !reducedMotion;
          return query.includes("min-width: 901px");
        },
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: (type: string, listener: EventListenerOrEventListenerObject) => {
          if (type === "change") {
            listeners.add(() => {
              if (typeof listener === "function") listener(new Event("change"));
              else listener.handleEvent(new Event("change"));
            });
          }
        },
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }) as MediaQueryList,
  );

  return {
    setReducedMotion(value: boolean) {
      reducedMotion = value;
      listeners.forEach((listener) => listener());
    },
  };
}

beforeEach(() => {
  mocks.to.mockReset();
  mocks.to.mockImplementation((target: HTMLElement) => {
    const root = target.parentElement;
    const parent = root?.parentElement;
    const spacer = document.createElement("div");
    spacer.className = "pin-spacer";
    target.style.transform = "matrix(1, 0, 0, 1, -800, 0)";

    if (root && parent) {
      parent.insertBefore(spacer, root);
      spacer.append(root);
    }

    return {
      kill: () => {
        target.style.transform = "";
        if (root && root.parentElement === spacer) spacer.replaceWith(root);
      },
    };
  });
});

afterEach(() => vi.restoreAllMocks());

describe("MaFe reduced-motion lifecycle", () => {
  it("does not initialize pinning when reduced motion is active at hydration", async () => {
    installMotionPreference(true);

    const { container } = render(
      <ExperienceProvider>
        <MafeStory />
      </ExperienceProvider>,
    );

    await waitFor(() => expect(container.querySelector(".pin-spacer")).not.toBeInTheDocument());
    expect(mocks.to).not.toHaveBeenCalled();
    expect(container.querySelector<HTMLElement>(".mafe-story-track")?.style.transform).toBe("");
  });

  it("reverts pinning on preference changes and restores it only for normal motion", async () => {
    const preference = installMotionPreference(false);
    const { container } = render(
      <ExperienceProvider>
        <MafeStory />
      </ExperienceProvider>,
    );

    expect(container.querySelector(".pin-spacer")).toBeInTheDocument();

    act(() => preference.setReducedMotion(true));
    await waitFor(() => expect(container.querySelector(".pin-spacer")).not.toBeInTheDocument());
    expect(container.querySelector<HTMLElement>(".mafe-story-track")?.style.transform).toBe("");

    act(() => preference.setReducedMotion(false));
    await waitFor(() => expect(container.querySelector(".pin-spacer")).toBeInTheDocument());
    expect(mocks.to).toHaveBeenCalledTimes(2);
  });
});
