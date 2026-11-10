import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import {
  MODEL,
  addBustLights,
  loadEnvironment,
  prepareBust,
  setupRenderer,
} from "./bustLook";

// The hero and About load the same file; keep it in memory for the second one.
THREE.Cache.enabled = true;

// Two ways the head appears. About: facing you, the seam driven by scroll.
// Hero: in marble profile, framed exactly like the still it replaces.
const MODES = {
  about: {
    cameraZ: 3.05,
    lift: -0.05,
    baseYaw: 0,
    turn: 0.55,
    tilt: 0.12,
    seam: true,
  },
  hero: {
    cameraZ: 2.755,
    lift: 0,
    baseYaw: -1.05,
    turn: 0.32,
    tilt: 0.08,
    seam: false,
  },
};

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const smooth = (t) => t * t * (3 - 2 * t);

// How far the seam has opened (0 marble … 1 blueprint) for the About section's
// box: it starts when the top is halfway up the viewport, sits near the middle
// while you read, and finishes as the section leaves.
export const seamFor = (top, height, viewport) =>
  smooth(clamp01((viewport * 0.5 - top) / (height + viewport * 0.2)));

// The live bust: turns toward the cursor and, in About, opens from marble to
// blueprint as you scroll. Reduced motion: a still split, no turning.
export default function BustScene({ stageRef, mode = "about" }) {
  const holder = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const container = holder.current;
    if (!stage || !container) return undefined;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const section = stage.closest("section") || stage;
    const setup = MODES[mode] || MODES.about;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return undefined; // no WebGL: the still image stays
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    setupRenderer(renderer);
    renderer.domElement.className = "bust-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.01, 50);
    camera.position.set(0, 0, setup.cameraZ);
    addBustLights(scene);
    const pivot = new THREE.Group();
    pivot.position.y = setup.lift; // About: a little low, clear of the labels
    scene.add(pivot);

    let uniforms = null;
    let material = null;
    let environment = null;
    let disposed = false;
    let visible = false;
    let loadStarted = false;
    let frame = 0;
    let yaw = 0;
    let pitch = 0;
    let targetYaw = 0;
    let targetPitch = 0;
    let lastFrame = 0;
    let lastSeam = -1;
    let restTimer = 0;

    const draw = () => renderer.render(scene, camera);

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (uniforms) renderer.getDrawingBufferSize(uniforms.uRes.value);
      draw();
    };

    // Returns true when the seam moved since the last frame.
    const updateSeam = () => {
      if (!setup.seam) {
        if (uniforms) uniforms.uSeam.value = 0; // all marble
        return false;
      }
      if (reduce) return false;
      const box = section.getBoundingClientRect();
      const seam = seamFor(box.top, box.height, window.innerHeight);
      if (Math.abs(seam - lastSeam) < 0.0001) return false;
      lastSeam = seam;
      stage.style.setProperty("--seam", seam.toFixed(4));
      if (uniforms) uniforms.uSeam.value = seam;
      return true;
    };

    // Draws only while something moves, then sleeps until the pointer or the
    // page does: no work, and no battery, while the head is at rest.
    const loop = (now = performance.now()) => {
      frame = 0;
      if (disposed || !visible) {
        lastFrame = 0;
        return;
      }
      const seamMoved = updateSeam();
      // ease by time, not frames, so slow machines turn just as fast
      const dt = lastFrame ? Math.min(now - lastFrame, 100) : 16.7;
      lastFrame = now;
      const ease = 1 - Math.pow(0.94, dt / 16.7);
      yaw += (targetYaw - yaw) * ease;
      pitch += (targetPitch - pitch) * ease;
      pivot.rotation.set(pitch, setup.baseYaw + yaw, 0);
      draw();
      const turning =
        Math.abs(targetYaw - yaw) > 0.0004 ||
        Math.abs(targetPitch - pitch) > 0.0004;
      if (turning || seamMoved) frame = requestAnimationFrame(loop);
      else lastFrame = 0;
    };
    const start = () => {
      if (!reduce && !frame) frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (event) => {
      targetYaw = ((event.clientX / window.innerWidth) * 2 - 1) * setup.turn;
      targetPitch = ((event.clientY / window.innerHeight) * 2 - 1) * setup.tilt;
      start();
      // after a while without the pointer, settle back to the resting pose
      window.clearTimeout(restTimer);
      restTimer = window.setTimeout(() => {
        targetYaw = 0;
        targetPitch = 0;
        start();
      }, 6000);
    };
    if (!reduce) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      if (setup.seam) {
        window.addEventListener("scroll", start, { passive: true });
      }
    }

    const load = () => {
      if (loadStarted) return;
      loadStarted = true;
      // the painting that lights the head arrives alongside the model
      loadEnvironment(renderer).then((env) => {
        if (disposed) {
          if (env) env.dispose();
          return;
        }
        environment = env;
        scene.environment = env;
        if (uniforms) draw();
      });
      new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(
        MODEL,
        (gltf) => {
          if (disposed) return;
          const object = gltf.scene;
          ({ material, uniforms } = prepareBust(object));
          uniforms.uDpr.value = dpr;
          pivot.add(object);
          pivot.rotation.set(0, setup.baseYaw, 0);
          updateSeam();
          resize();
          stage.classList.add("is-live");
          start();
        },
        undefined,
        (error) => console.error("Failed to load the bust", error),
      );
    };

    // Wait until the page has loaded and gone quiet, so the first screen
    // stays as fast as the stills; then load as the stage comes near.
    let ready = false;
    let idleHandle = 0;
    const whenIdle = (callback) =>
      window.requestIdleCallback
        ? window.requestIdleCallback(callback, { timeout: 2500 })
        : window.setTimeout(callback, 900);
    const goLive = () => {
      ready = true;
      if (visible) {
        load();
        start();
      }
    };
    const onPageLoad = () => {
      idleHandle = whenIdle(goLive);
    };
    if (document.readyState === "complete") onPageLoad();
    else window.addEventListener("load", onPageLoad, { once: true });

    // Only load and animate while the stage is (nearly) on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && ready) {
          load();
          start();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(stage);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onPageLoad);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleHandle);
      window.clearTimeout(idleHandle);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", start);
      window.clearTimeout(restTimer);
      pivot.traverse((node) => {
        if (node.isMesh) node.geometry.dispose();
      });
      if (material) material.dispose();
      if (environment) environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      stage.classList.remove("is-live");
      if (setup.seam) stage.style.setProperty("--seam", "0.5");
    };
  }, [stageRef, mode]);

  return <div className={`bust-scene bust-scene-${mode}`} ref={holder} />;
}
