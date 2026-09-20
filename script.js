import * as THREE from "https://cdn.skypack.dev/three@0.165.0";

import { GLTFLoader } from "https://cdn.skypack.dev/three@0.165.0/examples/jsm/loaders/GLTFLoader";

import { DRACOLoader } from "https://cdn.skypack.dev/three@0.165.0/examples/jsm/loaders/DRACOLoader";

/* ------------------------
   CONTAINER
------------------------ */

const container = document.getElementById("model-container");

/* ------------------------
   SCENE
------------------------ */

const scene = new THREE.Scene();

/* ------------------------
   CAMERA
------------------------ */

const camera = new THREE.PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    100
);

camera.position.set(0, 0, 5);

/* ------------------------
   RENDERER
------------------------ */

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(renderer.domElement);

/* ------------------------
   LIGHTING
------------------------ */

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    2
);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    2.5
);

directionalLight.position.set(
    5,
    5,
    5
);

scene.add(directionalLight);

/* ------------------------
   DRACO
------------------------ */

const dracoLoader = new DRACOLoader();

dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
);

/* ------------------------
   GLTF LOADER
------------------------ */

const loader = new GLTFLoader();

loader.setDRACOLoader(
    dracoLoader
);

/* ------------------------
   MODEL
------------------------ */

let model;

loader.load(

    "assets/Model.glb",

    (gltf) => {

        model = gltf.scene;

        scene.add(model);

        const scale = 1.3;

        model.scale.set(
            scale,
            scale,
            scale
        );

        model.position.set(
            0,
            -1.2,
            0
        );

        console.log("Model Loaded");

    },

    undefined,

    (error) => {

        console.error(
            "Model Load Error:",
            error
        );

    }

);

/* ------------------------
   ANIMATION
------------------------ */

function animate() {

    requestAnimationFrame(
        animate
    );

    if (model) {

        model.position.y =
            -1.2 +
            Math.sin(
                Date.now() * 0.0015
            ) * 0.12;

    }

    renderer.render(
        scene,
        camera
    );
}

animate();

/* ------------------------
   RESIZE
------------------------ */

window.addEventListener(
    "resize",
    () => {

        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );

        camera.aspect =
            container.clientWidth /
            container.clientHeight;

        camera.updateProjectionMatrix();

    }
);

/* ------------------------
   OPEN BUTTON
------------------------ */

const openButton =
    document.getElementById(
        "openButton"
    );

if (openButton) {

    openButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "map.html";

        }
    );

}
