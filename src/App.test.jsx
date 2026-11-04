import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Projects from "./Projects";
import Footer from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { NAV_SECTIONS, PROJECTS, SOCIAL_LINKS } from "./data/content";

// The About section renders a WebGL scene, which jsdom cannot do.
vi.mock("./About", () => ({ default: () => <section id="About" /> }));

test("navigation links to every section", () => {
  render(<ResponsiveAppBar />);
  NAV_SECTIONS.forEach((name) => {
    expect(screen.getByRole("tab", { name })).toHaveAttribute(
      "href",
      `#${name}`,
    );
  });
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
    const link = screen.getByRole("link", { name: label.toUpperCase() });
    expect(link).toHaveAttribute("href", href);
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
