import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const viewer = document.getElementById("viewer");

/* Scene */
const scene = new THREE.Scene();

/* Camera */
const camera = new THREE.PerspectiveCamera(
    35,
    viewer.clientWidth / viewer.clientHeight,
    0.1,
    1000
);

camera.position.set(0, 1.2, 4);

/* Renderer */
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(
    viewer.clientWidth,
    viewer.clientHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

viewer.appendChild(renderer.domElement);

/* Controls */
const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.5;

/* Lighting */

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        3
    )
);

const keyLight = new THREE.DirectionalLight(
    0xffffff,
    5
);

keyLight.position.set(
    5,
    10,
    10
);

scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(
    0xffffff,
    2
);

fillLight.position.set(
    -5,
    5,
    5
);

scene.add(fillLight);

/* Draco Loader */

const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
);

/* GLB Loader */

const loader = new GLTFLoader();

loader.setDRACOLoader(
    dracoLoader
);

loader.load(

    "./assets/Model.glb",

    (gltf) => {

        const model = gltf.scene;

        /* Mobile Friendly */

        if(window.innerWidth < 768){

            model.scale.set(
                1.0,
                1.0,
                1.0
            );

            model.position.set(
                0,
                -0.1,
                0
            );

        } else {

            model.scale.set(
                1.3,
                1.3,
                1.3
            );

            model.position.set(
                0,
                -0.3,
                0
            );
        }

        scene.add(model);

        console.log("Model Loaded");

    },

    (xhr) => {

        console.log(
            Math.round(
                xhr.loaded / xhr.total * 100
            ) + "% loaded"
        );

    },

    (error) => {

        console.error(
            "Failed loading model",
            error
        );

    }

);

/* Animation Loop */

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
    () => {

        camera.aspect =
            viewer.clientWidth /
            viewer.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            viewer.clientWidth,
            viewer.clientHeight
        );
    }
);
