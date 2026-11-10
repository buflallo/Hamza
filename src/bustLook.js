import * as THREE from "three";

// How the bust looks: lit by the painting, carved marble with shadow baked into
// its folds, and the cobalt survey scan past the seam. Shared by the live scene
// and the script that renders the still images, so both always match.

export const MODEL = "bust/hamza.glb";
const PAINTING = "background2.webp";

const NOISE = `
float h3(vec3 p){p=fract(p*0.3183099+.1);p*=17.0;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float n3(vec3 x){vec3 i=floor(x);vec3 f=fract(x);f=f*f*(3.0-2.0*f);
return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),f.x),f.y),
mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),f.x),f.y),f.z);}
float fbm(vec3 p){float v=0.,a=.5;for(int k=0;k<5;k++){v+=a*n3(p);p*=2.03;a*=.5;}return v;}
`;

export function setupRenderer(renderer) {
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
}

// Warm key from the painting above, a cobalt rim from behind. The painting
// itself (the environment) does the soft fill.
export function addBustLights(scene) {
  const key = new THREE.DirectionalLight(0xffe2b8, 2.1);
  key.position.set(-1.2, 1.5, 1.2);
  const rim = new THREE.DirectionalLight(0x5b3cff, 2.8);
  rim.position.set(1.4, 0.6, -1.2);
  scene.add(key, rim);
}

// A warm light, like a torch in a chapel, that the live scene moves with the
// cursor across the face. Starts in front, a little above.
export function addTorch(scene) {
  const torch = new THREE.PointLight(0xffcf94, 0.9, 0, 2);
  torch.position.set(0, 0.25, 1.15);
  scene.add(torch);
  return torch;
}

// The painted ceiling as the light around the head: the painting fills the
// sky, the ground fades to the page's dark. Prefiltered for every roughness.
export function loadEnvironment(renderer) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const w = 1024;
      const h = 512;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      const horizon = h * 0.56;
      // sky: the painting, wrapped once around
      ctx.drawImage(image, 0, 0, w, horizon);
      // ground: the painting's warm dark fading into the page colour
      const ground = ctx.createLinearGradient(0, horizon - 40, 0, h);
      ground.addColorStop(0, "rgba(70, 52, 40, 0.0)");
      ground.addColorStop(0.12, "rgba(58, 44, 36, 1)");
      ground.addColorStop(1, "rgba(18, 16, 16, 1)");
      ctx.fillStyle = ground;
      ctx.fillRect(0, horizon - 40, w, h - horizon + 40);
      const texture = new THREE.CanvasTexture(canvas);
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      const pmrem = new THREE.PMREMGenerator(renderer);
      const env = pmrem.fromEquirectangular(texture).texture;
      texture.dispose();
      pmrem.dispose();
      resolve(env);
    };
    image.onerror = () => resolve(null); // no painting: lights alone still work
    image.src = PAINTING;
  });
}

// One material for the whole head: veined, polished marble left of the seam,
// a cobalt survey scan with lime contour lines right of it, a yellow line on
// the cut. `aoShade` (baked into the model) darkens the folds.
export function bustMaterial(height, hasShade) {
  const uniforms = {
    uSeam: { value: 0.5 },
    uRes: { value: new THREE.Vector2(1, 1) },
    uHeight: { value: height },
    uDpr: { value: 1 },
    uHasShade: { value: hasShade ? 1 : 0 },
  };
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xf4f0e9,
    roughness: 0.4,
    metalness: 0,
    clearcoat: 0.16,
    clearcoatRoughness: 0.45,
    sheen: 0.55,
    sheenColor: new THREE.Color(0xffe2bf),
    sheenRoughness: 0.6,
    envMapIntensity: 0.85,
  });
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        "#include <common>\nattribute float aoShade;\nvarying vec3 vP;\nvarying float vShade;",
      )
      .replace(
        "#include <begin_vertex>",
        "#include <begin_vertex>\nvP = position;\nvShade = aoShade;",
      );
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
varying vec3 vP;
varying float vShade;
uniform float uSeam;
uniform vec2 uRes;
uniform float uHeight;
uniform float uDpr;
uniform float uHasShade;
${NOISE}`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
vec3 mp = vP / uHeight * 6.0;
float mt = fbm(mp * 1.3);
float vein = 1.0 - smoothstep(0.0, 0.12, abs(sin(mp.x * 1.7 + mp.y * 0.9 + mt * 7.0)));
float fine = 1.0 - smoothstep(0.0, 0.035, abs(sin(mp.y * 3.1 - mp.z * 2.0 + fbm(mp * 2.7) * 9.0)));
vec3 marble = mix(diffuseColor.rgb, vec3(0.56, 0.54, 0.57), vein * 0.5 + fine * 0.22);
marble *= 0.94 + 0.06 * fbm(mp * 6.0);
// how open this point is: 1 on the cheek, low deep in the ivy and curls
float open = mix(1.0, smoothstep(0.02, 0.78, vShade), uHasShade);
float seamX = uRes.x * (1.0 - uSeam);
float blue = step(seamX, gl_FragCoord.x);
diffuseColor.rgb = mix(marble, vec3(0.02, 0.001, 0.5), blue);
// carved folds hold shadow even in direct light
diffuseColor.rgb *= mix(1.0, pow(open, 1.3), 0.55);`,
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
// polished where hands and weather would wear it, raw stone in the folds
roughnessFactor = mix(mix(0.74, 0.36, open), 0.75, blue);`,
      )
      .replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
// fine grain in the stone (a little bump, computed on screen)
{
  float grain = 0.00032 * fbm(mp * 24.0) * (1.0 - blue);
  vec3 sx = dFdx(-vViewPosition);
  vec3 sy = dFdy(-vViewPosition);
  vec3 r1 = cross(sy, normal);
  vec3 r2 = cross(normal, sx);
  float det = dot(sx, r1);
  vec3 grad = sign(det) * (dFdx(grain) * r1 + dFdy(grain) * r2);
  normal = normalize(abs(det) * normal - grad);
}`,
      )
      .replace(
        "#include <aomap_fragment>",
        `#include <aomap_fragment>
// the painting's light does not reach into the folds
reflectedLight.indirectDiffuse *= open;
reflectedLight.indirectSpecular *= mix(1.0, open, 0.85);`,
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
float yy = vP.y / uHeight * 70.0;
float lineDist = abs(fract(yy) - 0.5) / max(fwidth(yy), 1e-4);
float contour = 1.0 - min(lineDist, 1.0);
// the scan glows from inside: a soft halo around each line
contour += 0.18 * exp(-lineDist * 0.5);
float rim = pow(1.0 - abs(dot(normal, normalize(vViewPosition))), 2.5);
totalEmissiveRadiance += blue * vec3(0.75, 1.0, 0.0) * (contour * 0.9 + rim * 0.5);
// marble lets a little warm light through its thin, open edges
totalEmissiveRadiance += (1.0 - blue) * vec3(0.95, 0.66, 0.42) * 0.07 * rim * open;
float seamDist = abs(gl_FragCoord.x - seamX) / uDpr;
float cut = 1.0 - smoothstep(0.0, 1.5, seamDist);
cut += 0.45 * exp(-seamDist * 0.18); // the cut glows onto the stone beside it
totalEmissiveRadiance += vec3(1.0, 1.0, 0.0) * cut * step(0.002, uSeam) * step(uSeam, 0.998) * 2.0;`,
      )
      .replace(
        "#include <dithering_fragment>",
        `#include <dithering_fragment>
// print grain: fixed to the screen like ink on paper, only on the bust
{
  vec2 g = floor(gl_FragCoord.xy / max(uDpr, 1.0));
  float n = fract(sin(dot(g, vec2(12.9898, 78.233))) * 43758.5453);
  gl_FragColor.rgb += (n - 0.5) * 0.045;
}`,
      );
  };
  return { material, uniforms };
}

// Give a loaded model the bust material and fit it to one unit tall, centred.
export function prepareBust(object) {
  const size = new THREE.Box3()
    .setFromObject(object)
    .getSize(new THREE.Vector3());
  let hasShade = false;
  object.traverse((node) => {
    if (!node.isMesh) return;
    const shade = node.geometry.getAttribute("_ao");
    if (shade) {
      node.geometry.setAttribute("aoShade", shade);
      hasShade = true;
    }
  });
  const { material, uniforms } = bustMaterial(size.y, hasShade);
  object.traverse((node) => {
    if (node.isMesh) node.material = material;
  });
  object.scale.setScalar(1 / size.y);
  const center = new THREE.Box3()
    .setFromObject(object)
    .getCenter(new THREE.Vector3());
  object.position.sub(center);
  return { material, uniforms };
}
