import { afterEach, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Projects from "./Projects";

afterEach(() => vi.restoreAllMocks());

test("each project video has a pause control that toggles playback", () => {
  const pause = vi
    .spyOn(HTMLMediaElement.prototype, "pause")
    .mockImplementation(function pauseMock() {
      Object.defineProperty(this, "paused", {
        value: true,
        configurable: true,
      });
      this.dispatchEvent(new Event("pause"));
    });
  const play = vi
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockImplementation(function playMock() {
      Object.defineProperty(this, "paused", {
        value: false,
        configurable: true,
      });
      this.dispatchEvent(new Event("play"));
      return Promise.resolve();
    });

  const { container } = render(<Projects />);
  // jsdom never autoplays; browsers report paused = false once autoplay starts.
  Object.defineProperty(container.querySelector("video"), "paused", {
    value: false,
    configurable: true,
  });
  const button = screen.getByRole("button", {
    name: "Pause Minishell preview",
  });
  fireEvent.click(button);
  expect(pause).toHaveBeenCalledTimes(1);
  fireEvent.click(
    screen.getByRole("button", { name: "Play Minishell preview" }),
  );
  expect(play).toHaveBeenCalledTimes(1);
});

test("videos do not autoplay when reduced motion is requested", () => {
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: query.includes("reduce"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));
  const { container } = render(<Projects />);
  container.querySelectorAll("video").forEach((video) => {
    expect(video.autoplay).toBe(false);
  });
  expect(
    screen.getByRole("button", { name: "Play Minishell preview" }),
  ).toBeInTheDocument();
});
