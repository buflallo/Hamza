import { afterEach, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Projects from "./Projects";

afterEach(() => vi.restoreAllMocks());

// jsdom has no media playback; make play/pause flip `paused` and fire events.
const mockPlayback = () => {
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
  return { play, pause };
};

const reduceMotion = (reduce) =>
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: reduce && query.includes("reduce"),
    media: query,
    addEventListener() {},
    removeEventListener() {},
  }));

test("each preview has a play control that toggles playback", () => {
  const { play, pause } = mockPlayback();
  render(<Projects />);
  fireEvent.click(
    screen.getByRole("button", { name: "Play Minishell preview" }),
  );
  expect(play).toHaveBeenCalledTimes(1);
  fireEvent.click(
    screen.getByRole("button", { name: "Pause Minishell preview" }),
  );
  expect(pause).toHaveBeenCalledTimes(1);
});

test("hovering a row plays its preview, leaving it pauses", () => {
  reduceMotion(false);
  const { play, pause } = mockPlayback();
  render(<Projects />);
  const row = screen.getByText("Webserv").closest("li");
  fireEvent.mouseEnter(row);
  expect(play).toHaveBeenCalledTimes(1);
  fireEvent.mouseLeave(row);
  expect(pause).toHaveBeenCalledTimes(1);
});

test("nothing plays on its own when reduced motion is requested", () => {
  reduceMotion(true);
  const { play } = mockPlayback();
  const { container } = render(<Projects />);
  container.querySelectorAll("video").forEach((video) => {
    expect(video.autoplay).toBe(false);
  });
  fireEvent.mouseEnter(screen.getByText("Webserv").closest("li"));
  expect(play).not.toHaveBeenCalled();
});

test("a project without media shows no preview, and AZUL links its press", () => {
  render(<Projects />);
  const row = screen.getByText("Cloud-1").closest("li");
  expect(row.querySelector("video")).toBeNull();
  expect(
    screen.getByRole("link", { name: "Press about AZUL Cloud" }),
  ).toHaveAttribute("href", expect.stringContaining("moroccoworldnews.com"));
});
