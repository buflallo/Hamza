import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// try to import threejs
import * as THREE from "three";
// orbitcontrol
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import gltf
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import tween
import { useEffect, useRef, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';


export default function About() {
  const refContainer = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!refContainer.current) return;
    const dimensions = {
      width: refContainer.current.clientWidth,
      height: refContainer.current.clientHeight,
    };
    setIsLoading(true);
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      dimensions.width / dimensions.height,
      0.1,
      1000
    );
    var renderer = new THREE.WebGLRenderer({
      alpha: true,
    });
    renderer.setSize(dimensions.width , dimensions.height);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);
    // refcontainer append loading bar
    
    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    let loader = new GLTFLoader();
    let controls;
    let object;
    var ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(ambientLight);
    var light = new THREE.PointLight(0xffffff, 1, 20); // warm yellow light
    light.position.set(0, 300, dimensions.height / 2);
    var lightHolder = new THREE.Group();
    lightHolder.add(light);
    scene.add(lightHolder);

    // Create a directional light
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Soft white light with intensity 0.5
    directionalLight.position.set(-1, 1, 1); // Position the light from top-left
    scene.add(directionalLight);
    var material = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa, // Custom base color (light gray)
      roughness: 0.9, // Increase roughness for a less reflective surface
      metalness: 0.05, // Decrease metalness for a non-metallic appearance
    });

    loader.load(
      "david/scene.gltf",
      function (gltf) {
        gltf.scene.traverse(function (node) {
          if (node.isMesh) {
            node.material = material;
          }
        });
        object = gltf.scene;
        object.scale.set(0.04, 0.04, 0.04);
        // Compute the bounding box of the object
        var box = new THREE.Box3().setFromObject(object);

        // Compute the object's center point
        var center = box.getCenter(new THREE.Vector3());
        // edit the x of center  to move the object to the right
        center.x = 0;
        // Move the object to the center of the scene
        object.position.sub(center);
        scene.add(object);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        if (xhr.loaded === xhr.total)
          setIsLoading(false);

      },
      function (error) {
        console.error("An error happened", error);
      }
    );

    camera.position.set(0, 0, 1);
    // let the object up in the view
    var animate = function () {
      requestAnimationFrame(animate);
      // object && (object.rotation.x += 0.01);
      object && (object.rotation.y -= 0.01);
      lightHolder.quaternion.copy(camera.quaternion);
      renderer.render(scene, camera);
      // TWEEN.update();
    };
    animate();
    return () => {
      // === THREE.JS CODE END ===
      // i have two scenes, remove the whole scene
      scene.clear();
      refContainer.current &&
        refContainer.current.removeChild(refContainer.current.firstChild);
    };
  }, []);
  return (
    <Box
      id="About"
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
          variant="h3"
          color="#FFFFFF"
          fontSize={{ xs: "80px", md: "7vw" }}
          sx={{ textTransform: "uppercase" }}
        >
          Hello I am Hamza.
        </Typography>
        <br />
        <Typography
          variant="h4"
          fontSize={{ xs: "20px", md: "calc(6vw/(1.618*1.5))" }}
          color="#FFFFFF"
          fontWeight="500"
          textTransform={"uppercase"}
        >
          As a full stack developer at 1337 Coding School, I'm passionate about
          crafting user-centric websites. With a degree in computer science and
          expertise in React, Nest, Laravel and Vue.js, I've led projects like dynamic
          multilingual platforms for Sté IQRAE Négoce and responsive e-commerce
          sites for Royale Maroc d'Agriculture. Now seeking internship
          opportunities to expand my skills and contribute to innovative
          projects
        </Typography>
      </Box>
      <Box
        ref={refContainer}
        sx={{
          width: { xs: "100%", md: "40%" },
          // position: "relative",
          height: { xs: "60vh", md: "auto" },
          overflow: "hidden",
          // right: "0",
          // bottom: "-1200px",
        }}
      >
        {isLoading && <LinearProgress />}
      </Box>
    </Box>
  );
}
