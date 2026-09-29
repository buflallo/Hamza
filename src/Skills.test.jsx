import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Skills from "./Skills";
import { SKILLS } from "./data/content";

test("skill titles keep their words separated", () => {
  render(<Skills />);
  SKILLS.forEach(({ title }) => {
    const heading = screen.getByText(
      (_, el) => el?.tagName === "H5" && el.textContent === title,
    );
    expect(heading).toBeInTheDocument();
  });
});
