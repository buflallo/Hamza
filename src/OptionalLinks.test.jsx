import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("./data/content", async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    CONTACT_EMAIL: "hello@example.com",
    CV_URL: "cv.pdf",
    PROJECTS: [
      {
        ...original.PROJECTS[0],
        repo: "https://example.com/repo",
        demo: "https://example.com/demo",
      },
      ...original.PROJECTS.slice(1),
    ],
  };
});

test("footer shows email and CV links when configured", async () => {
  const { default: Footer } = await import("./Footer");
  render(<Footer />);
  expect(screen.getByRole("link", { name: "EMAIL" })).toHaveAttribute(
    "href",
    "mailto:hello@example.com",
  );
  const cv = screen.getByRole("link", { name: "CV" });
  expect(cv).toHaveAttribute("href", "cv.pdf");
  expect(cv).not.toHaveAttribute("target");
});

test("projects show code and live links only where configured", async () => {
  const { default: Projects } = await import("./Projects");
  render(<Projects />);
  expect(
    screen.getByRole("link", { name: /Code for Minishell/ }),
  ).toHaveAttribute("href", "https://example.com/repo");
  expect(
    screen.getByRole("link", { name: /Live demo of Minishell/ }),
  ).toBeInTheDocument();
  expect(screen.queryAllByRole("link", { name: /Code for/ })).toHaveLength(1);
});
