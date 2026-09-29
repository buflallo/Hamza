import { afterEach, expect, test, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import useScrollFrame from "./useScrollFrame";
import useActiveSection from "./useActiveSection";

afterEach(() => vi.restoreAllMocks());

test("useScrollFrame coalesces scroll events into one call per frame", () => {
  const frames = [];
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) =>
    frames.push(cb),
  );
  vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});
  const callback = vi.fn();
  renderHook(() => useScrollFrame(callback));
  expect(callback).toHaveBeenCalledTimes(1); // initial run

  act(() => {
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("scroll"));
  });
  expect(frames).toHaveLength(1);
  act(() => frames[0]());
  expect(callback).toHaveBeenCalledTimes(2);
});

test("useScrollFrame removes its listeners on unmount", () => {
  const remove = vi.spyOn(window, "removeEventListener");
  const { unmount } = renderHook(() => useScrollFrame(() => {}));
  unmount();
  expect(remove).toHaveBeenCalledWith("scroll", expect.any(Function));
  expect(remove).toHaveBeenCalledWith("resize", expect.any(Function));
});

test("useActiveSection reports the section that is intersecting", () => {
  let notify;
  class FakeObserver {
    constructor(cb) {
      notify = cb;
    }
    observe() {}
    disconnect() {}
  }
  vi.stubGlobal("IntersectionObserver", FakeObserver);
  document.body.innerHTML =
    '<section id="A"></section><section id="B"></section>';
  const ids = ["A", "B"];
  const { result } = renderHook(() => useActiveSection(ids));
  expect(result.current).toBeNull();

  act(() =>
    notify([{ target: document.getElementById("B"), isIntersecting: true }]),
  );
  expect(result.current).toBe("B");
  act(() =>
    notify([{ target: document.getElementById("B"), isIntersecting: false }]),
  );
  expect(result.current).toBeNull();
  vi.unstubAllGlobals();
});

test("backdrop layers hand over: painting, print, ghost, then yellow", async () => {
  const { layerOpacities } = await import("./useBackgroundTransition");
  const top = layerOpacities(0, 5);
  expect(top.full).toBe(1);
  expect(top.ghost).toBe(0);
  const middle = layerOpacities(3, 3);
  expect(middle.full).toBe(0);
  expect(middle.print).toBe(0);
  expect(middle.ghost).toBeCloseTo(0.55);
  const bottom = layerOpacities(6, 0);
  expect(bottom.ghost).toBe(0);
  expect(bottom.veil).toBe(0);
  expect(bottom.foot).toBe(1);
});
