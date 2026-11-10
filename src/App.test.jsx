import { expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Projects from "./Projects";
import Footer from "./Footer";
import Masthead from "./Masthead";
import { NAV, PROJECTS, SOCIAL_LINKS } from "./data/content";

// The About section renders a WebGL scene, which jsdom cannot do.
vi.mock("./About", () => ({ default: () => <section id="About" /> }));

test("the numbered index links to every section", () => {
  render(<Masthead />);
  NAV.forEach(({ id, label }) => {
    expect(screen.getByRole("link", { name: label })).toHaveAttribute(
      "href",
      `#${id}`,
    );
  });
});

test("the index button folds the list open and shut", () => {
  render(<Masthead />);
  const toggle = screen.getByRole("button", { name: /Index/ });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  fireEvent.keyDown(window, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("projects renders one video per project with media", () => {
  const { container } = render(<Projects />);
  const withMedia = PROJECTS.filter((project) => project.media);
  expect(container.querySelectorAll("video")).toHaveLength(withMedia.length);
  PROJECTS.forEach(({ title }) => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});

test("footer links to every social profile safely", () => {
  render(<Footer />);
  SOCIAL_LINKS.forEach(({ label, href }) => {
    const link = screen.getByRole("link", { name: label });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
