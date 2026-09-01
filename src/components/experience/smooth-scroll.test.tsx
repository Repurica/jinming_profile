import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ExperienceProvider } from "./experience-provider";
import { SmoothScroll } from "./smooth-scroll";

const mocks = vi.hoisted(() => ({
  destroy: vi.fn(),
  off: vi.fn(),
  on: vi.fn(),
  raf: vi.fn(),
  scrollTriggerUpdate: vi.fn(),
  tickerAdd: vi.fn(),
  tickerRemove: vi.fn(),
}));

vi.mock("lenis", () => ({
  default: class MockLenis {
    destroy = mocks.destroy;
    off = mocks.off;
    on = mocks.on;
    raf = mocks.raf;
  },
}));

vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    ticker: {
      add: mocks.tickerAdd,
      lagSmoothing: vi.fn(),
      remove: mocks.tickerRemove,
    },
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { update: mocks.scrollTriggerUpdate },
}));

describe("SmoothScroll", () => {
  it("updates ScrollTrigger from Lenis and removes the integration on cleanup", async () => {
    const { unmount } = render(
      <ExperienceProvider>
        <SmoothScroll />
      </ExperienceProvider>,
    );

    await waitFor(() =>
      expect(mocks.on).toHaveBeenCalledWith("scroll", mocks.scrollTriggerUpdate),
    );

    unmount();

    expect(mocks.off).toHaveBeenCalledWith("scroll", mocks.scrollTriggerUpdate);
    expect(mocks.destroy).toHaveBeenCalledOnce();
  });
});