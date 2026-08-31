import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Home from "./page";

it("exposes a skip link and main landmark", () => {
  render(<Home />);

  expect(screen.getByRole("link", { name: /skip to main content/i })).toHaveAttribute(
    "href",
    "#main-content",
  );
  expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
});
