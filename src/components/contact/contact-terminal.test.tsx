import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import WorkPage from "@/app/work/[slug]/page";
import { ResumeDocument } from "@/components/resume/resume-document";
import { ContactTerminal } from "./contact-terminal";

describe("signal and secondary route fallbacks", () => {
  it("shows no dead personal links and reports copied, never sent", async () => {
    const user = userEvent.setup();
    const copyText = vi.fn().mockResolvedValue(undefined);
    render(<ContactTerminal copyText={copyText} />);

    expect(screen.queryByRole("link", { name: /email|linkedin/i })).not.toBeInTheDocument();
    expect(screen.getByText(/direct channels are not configured/i)).toBeVisible();

    await user.click(screen.getByRole("button", { name: /copy outreach draft/i }));
    expect(copyText).toHaveBeenCalledOnce();
    expect(screen.getByRole("status")).toHaveTextContent("Draft copied");
    expect(screen.getByRole("status")).not.toHaveTextContent(/sent/i);
  });

  it("renders every known case and invokes the 404 boundary for an unknown slug", async () => {
    const known = await WorkPage({ params: Promise.resolve({ slug: "mafe-bento" }) });
    const { unmount } = render(known);
    expect(screen.getByRole("heading", { name: "MaFe Bento", level: 1 })).toBeVisible();
    unmount();

    await expect(
      WorkPage({ params: Promise.resolve({ slug: "not-a-case" }) }),
    ).rejects.toThrow();
  });

  it("offers browser print/save without a nonexistent PDF download", () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => undefined);
    render(<ResumeDocument />);

    fireEvent.click(screen.getByRole("button", { name: /print or save as pdf/i }));
    expect(print).toHaveBeenCalledOnce();
    expect(screen.queryByRole("link", { name: /download/i })).not.toBeInTheDocument();
  });
});
