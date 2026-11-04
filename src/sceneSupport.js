// Wide screens with WebGL get the live bust; phones and the rest keep stills.
export const wantsScene = () =>
  typeof window !== "undefined" &&
  typeof window.WebGLRenderingContext !== "undefined" &&
  window.matchMedia("(min-width: 900px)").matches;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
