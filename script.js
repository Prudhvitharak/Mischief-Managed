import * as THREE from "three";

import { OrbitControls }
from "three/addons/controls/OrbitControls.js";

import { GLTFLoader }
from "three/addons/loaders/GLTFLoader.js";

import { DRACOLoader }
from "three/addons/loaders/DRACOLoader.js";

const viewer =
document.getElementById("viewer");

const scene =
new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(

    35,

    viewer.clientWidth /
    viewer.clientHeight,

    0.1,

    1000
);

camera.position.set(
    0,
    0.8,
    4.5
);

const renderer =
new THREE.WebGLRenderer({

    alpha:true,
    antialias:true
});

renderer.setSize(
    viewer.clientWidth,
    viewer.clientHeight
);

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.outputColorSpace =
THREE.SRGBColorSpace;

viewer.appendChild(
    renderer.domElement
);

/* CONTROLS */

const controls =
new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableZoom = false;
controls.enablePan = false;

controls.autoRotate = true;
controls.autoRotateSpeed = 1;

/* LIGHTS */

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        3
    )
);

const light1 =
new THREE.DirectionalLight(
    0xffffff,
    4
);

light1.position.set(
    5,
    10,
    10
);

scene.add(light1);

const light2 =
new THREE.DirectionalLight(
    0xffffff,
    2
);

light2.position.set(
    -5,
    5,
    5
);

scene.add(light2);

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

let model;

loader.load(
    "./assets/Model.glb",

    (gltf)=>{

        model = gltf.scene;

        scene.add(model);

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

        console.log("Loaded");
    },

    undefined,

    (error)=>{
        console.error(error);
    }
);

/* ANIMATION */

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

/* RESIZE */

window.addEventListener(

    "resize",

    ()=>{

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
