import "@testing-library/jest-dom";

// jsdom lacks these browser APIs.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver ??= NoopObserver;
globalThis.ResizeObserver ??= NoopObserver;
window.matchMedia ??= (query) => ({
  matches: false,
  media: query,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
});
window.scrollTo ??= () => {};
