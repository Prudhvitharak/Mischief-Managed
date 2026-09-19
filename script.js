import * as THREE from "three";

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
    100
);

camera.position.set(
    0,
    1,
    4
);

/* Renderer */

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderer.setSize(
    viewer.clientWidth,
    viewer.clientHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.outputColorSpace =
THREE.SRGBColorSpace;

viewer.appendChild(
    renderer.domElement
);

/* Lights */

scene.add(
    new THREE.AmbientLight(
        0xffffff,
        3
    )
);

const keyLight =
new THREE.DirectionalLight(
    0xffffff,
    5
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
    5,
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

let model;

loader.load(

    "./assets/Model.glb",

    (gltf)=>{

        model = gltf.scene;

        scene.add(model);

        /* Adjust these 2 values only */

        model.scale.set(
            1.2,
            1.2,
            1.2
        );

        model.position.set(
            0,
            -0.5,
            0
        );

        console.log(
            "Model Loaded Successfully"
        );
    },

    (xhr)=>{

        if(xhr.total){

            console.log(
                Math.round(
                    (xhr.loaded / xhr.total) * 100
                ) + "% loaded"
            );
        }
    },

    (error)=>{

        console.error(
            "Failed to load model",
            error
        );
    }
);

/* Animation */

function animate(){

    requestAnimationFrame(
        animate
    );

    if(model){

        model.rotation.y +=
        0.004;
    }

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
        viewer.clientWidth /
        viewer.clientHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            viewer.clientWidth,
            viewer.clientHeight
        );
    }
);
