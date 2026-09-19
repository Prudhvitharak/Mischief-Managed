import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const container = document.getElementById("viewer");

/* Scene */
const scene = new THREE.Scene();

/* Camera */
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 1.5, 4);

/* Renderer */
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

container.appendChild(renderer.domElement);

/* Controls */
const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enablePan = false;
controls.enableZoom = false;

controls.autoRotate = true;
controls.autoRotateSpeed = 1;

controls.target.set(0, 1, 0);

/* Lights */

scene.add(
  new THREE.AmbientLight(
    0xffffff,
    2.5
  )
);

const keyLight =
new THREE.DirectionalLight(
  0xffffff,
  4
);

keyLight.position.set(
  5,
  10,
  10
);

scene.add(keyLight);

const fillLight =
new THREE.DirectionalLight(
  0xffffff,
  2
);

fillLight.position.set(
  -5,
  3,
  5
);

scene.add(fillLight);

/* DRACO */

const dracoLoader =
new DRACOLoader();

dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
);

/* GLTF */

const loader =
new GLTFLoader();

loader.setDRACOLoader(
  dracoLoader
);

loader.load(

  "./assets/Model.glb",

  (gltf)=>{

      const model =
      gltf.scene;

      model.scale.set(
        2,
        2,
        2
      );

      model.position.set(
        0,
        -1.2,
        0
      );

      scene.add(model);

      console.log("Loaded");
  },

  (xhr)=>{

      console.log(
        (xhr.loaded / xhr.total * 100)
        + "% loaded"
      );
  },

  (error)=>{

      console.error(
        "Model failed:",
        error
      );
  }
);

/* Animation */

function animate(){

    requestAnimationFrame(
      animate
    );

    controls.update();

    renderer.render(
      scene,
      camera
    );
}

animate();

/* Resize */

window.addEventListener(
  "resize",
  ()=>{

    camera.aspect =
    window.innerWidth /
    window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }
);
