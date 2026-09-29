import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { useEffect, useRef, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function About() {
  const refContainer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const container = refContainer.current;
    if (!container) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const size = () => ({
      width: container.clientWidth || 1,
      height: container.clientHeight || 1,
    });

    const scene = new THREE.Scene();
    const { width, height } = size();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute(
      "aria-label",
      "Rotating 3D sculpture of David",
    );
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x404040));
    const light = new THREE.PointLight(0xffffff, 1, 20);
    light.position.set(0, 300, height / 2);
    const lightHolder = new THREE.Group();
    lightHolder.add(light);
    scene.add(lightHolder);
    // A warm light that chases the pointer (drifts on its own when idle).
    const chaser = new THREE.PointLight(0xfff2c4, 3, 0, 1.5);
    chaser.position.set(0, 0.6, 1.2);
    scene.add(chaser);
    const chaseTarget = new THREE.Vector3(0, 0.6, 1.2);
    let lastPointer = -Infinity;
    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      chaseTarget.set(
        Math.max(-1.6, Math.min(1.6, nx * 1.4)),
        Math.max(-1.2, Math.min(1.2, -ny * 1.1)),
        1.2,
      );
      lastPointer = performance.now();
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-1, 1, 1);
    scene.add(directionalLight);

    const material = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa,
      roughness: 0.9,
      metalness: 0.05,
    });

    let object;
    let disposed = false;
    let visible = false;
    let frame = 0;
    let loadStarted = false;

    // The turn breathes (slow -> a touch faster -> slow) and surges with scroll.
    let surge = 0;
    let lastScroll = window.scrollY;
    const render = (now = performance.now()) => {
      frame = 0;
      if (disposed || !visible) return;
      const scrollDelta = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      surge = Math.min(0.09, surge * 0.94 + scrollDelta * 0.0009);
      if (object && !reduceMotion.matches) {
        const breath = 0.006 + 0.004 * Math.sin(now / 1800);
        object.rotation.y -= breath + surge;
      }
      if (!reduceMotion.matches) {
        if (now - lastPointer > 2500) {
          chaseTarget.set(
            Math.cos(now / 2400) * 1.3,
            0.4 + Math.sin(now / 3100) * 0.7,
            1.2,
          );
        }
        chaser.position.lerp(chaseTarget, 0.06);
      }
      lightHolder.quaternion.copy(camera.quaternion);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };

    const loadModel = () => {
      if (loadStarted) return;
      loadStarted = true;
      setIsLoading(true);
      new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).load(
        "david/scene.glb",
        (gltf) => {
          if (disposed) return;
          gltf.scene.traverse((node) => {
            if (node.isMesh) node.material = material;
          });
          object = gltf.scene;
          object.scale.set(0.04, 0.04, 0.04);
          const center = new THREE.Box3()
            .setFromObject(object)
            .getCenter(new THREE.Vector3());
          center.x = 0;
          object.position.sub(center);
          scene.add(object);
          setIsLoading(false);
          renderer.render(scene, camera);
        },
        undefined,
        (error) => {
          console.error("Failed to load 3D model", error);
          if (!disposed) setIsLoading(false);
        },
      );
    };

    // Only load and animate while the section is (nearly) on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          loadModel();
          if (!frame) frame = requestAnimationFrame(render);
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(container);

    const onResize = () => {
      const { width: w, height: h } = size();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      scene.traverse((node) => {
        if (node.isMesh) node.geometry.dispose();
      });
      material.dispose();
      renderer.dispose();
      scene.clear();
      renderer.domElement.remove();
    };
  }, []);
  return (
    <Box
      component="section"
      id="About"
      aria-labelledby="about-title"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        pt: "12vh",
        gap: "50px",
        pl: "5vw",
        pr: "3vw",
      }}
    >
      <Box
        sx={{
          display: { xs: "flex", sm: "inline-flex" },
          width: { xs: "100%", md: "60%" },
          flexDirection: "column",
          mt: "auto",
          mb: "auto",
        }}
      >
        <Typography
          id="about-title"
          variant="h3"
          component="h2"
          className="misreg"
          color="#FFFFFF"
          fontSize={{ xs: "80px", md: "7vw" }}
          sx={{ textTransform: "uppercase" }}
        >
          Hello I am Hamza.
        </Typography>
        <br />
        <Typography
          variant="h4"
          component="p"
          fontSize={{ xs: "20px", md: "calc(6vw/(1.618*1.5))" }}
          color="#FFFFFF"
          fontWeight="500"
          textTransform={"uppercase"}
        >
          As a full stack developer at 1337 Coding School, I'm passionate about
          crafting user-centric websites. With a degree in computer science and
          expertise in React, Nest, Laravel and Vue.js, I've led projects like
          dynamic multilingual platforms for Sté IQRAE Négoce and responsive
          e-commerce sites for Royale Maroc d'Agriculture. Now seeking
          internship opportunities to expand my skills and contribute to
          innovative projects.
        </Typography>
      </Box>
      <Box
        ref={refContainer}
        sx={{
          width: { xs: "100%", md: "40%" },
          height: { xs: "60vh", md: "auto" },
          overflow: "hidden",
        }}
      >
        {isLoading && <LinearProgress />}
      </Box>
    </Box>
  );
}
