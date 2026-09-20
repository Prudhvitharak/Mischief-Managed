import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

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

        const scale = 1.7;

        model.scale.set(
            scale,
            scale,
            scale
        );

        model.position.set(
            0,
            0,
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
            -0.5 +
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
document.getElementById("openButton");

const modal =
document.getElementById("passwordModal");

openButton.addEventListener(
    "click",
    () => {

        modal.classList.add("show");

    }
);

const hintBtn =
document.getElementById("hintBtn");

const hintText =
document.getElementById("hintText");

hintBtn.addEventListener(
    "click",
    () => {

        hintText.style.display =
        hintText.style.display === "block"
        ? "none"
        : "block";

    }
);

document
.getElementById("unlockBtn")
.addEventListener(
    "click",
    () => {

        const password =
        document
        .getElementById("passwordInput")
        .value;

        if(
            password === "0.32"
        ){

            window.location.href =
            "map.html";

        }
        else{

            alert(
                "Mischief Managed... Incorrect Password."
            );
        }

    }
);
