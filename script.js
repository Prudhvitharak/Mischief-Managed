import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const viewer = document.getElementById("viewer");

const isMobile = window.matchMedia("(max-width: 600px)").matches;

/* Scene */

const scene = new THREE.Scene();

/* Camera */

const camera = new THREE.PerspectiveCamera(
    isMobile ? 42 : 35,
    viewer.clientWidth / viewer.clientHeight,
    0.1,
    100
);

camera.position.set(
    0,
    isMobile ? 0.8 : 1,
    isMobile ? 5 : 4
);

/* Renderer */

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.outputColorSpace = THREE.SRGBColorSpace;

viewer.appendChild(renderer.domElement);

/* Lights */

scene.add(new THREE.AmbientLight(0xffffff, 3));

const keyLight = new THREE.DirectionalLight(0xffffff, 5);
keyLight.position.set(5, 10, 10);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 2);
fillLight.position.set(-5, 5, 5);
scene.add(fillLight);

/* DRACO */

const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
);

/* GLTF */

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

let model;

loader.load(
    "./assets/Model.glb",

    (gltf) => {
        model = gltf.scene;
        scene.add(model);

        const scale = isMobile ? 0.85 : 1.2;

        model.scale.set(scale, scale, scale);

        model.position.set(
            0,
            isMobile ? 1.05 : 1.3,
            0
        );
    },

    (xhr) => {
        if (xhr.total) {
            console.log(
                Math.round((xhr.loaded / xhr.total) * 100) + "% loaded"
            );
        }
    },

    (error) => {
        console.error("Failed to load model", error);
    }
);

/* Resize */

function resizeViewer() {
    const width = viewer.clientWidth;
    const height = viewer.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);
}

resizeViewer();

/* Animation */

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y += 0.004;
    }

    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", resizeViewer);
