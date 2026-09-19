import * as THREE from "three";

import { OrbitControls }
from "three/addons/controls/OrbitControls.js";

import { GLTFLoader }
from "three/addons/loaders/GLTFLoader.js";

import { DRACOLoader }
from "three/addons/loaders/DRACOLoader.js";

const viewer =
document.getElementById("viewer");

/* SCENE */

const scene =
new THREE.Scene();

/* CAMERA */

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
    3.2
);

/* RENDERER */

const renderer =
new THREE.WebGLRenderer({

    alpha:true,
    antialias:true

});

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.setSize(
    viewer.clientWidth,
    viewer.clientHeight
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

controls.minPolarAngle =
Math.PI / 2;

controls.maxPolarAngle =
Math.PI / 2;

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
    5
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

const clock =
new THREE.Clock();

loader.load(

    "./assets/Model.glb",

    (gltf)=>{

        model =
        gltf.scene;

        scene.add(model);

        const box =
        new THREE.Box3()
        .setFromObject(model);

        const size =
        box.getSize(
            new THREE.Vector3()
        );

        const center =
        box.getCenter(
            new THREE.Vector3()
        );

        model.position.sub(
            center
        );

        const maxDimension =
        Math.max(

            size.x,

            size.y,

            size.z
        );

        const scale =
        2.8 /
        maxDimension;

        model.scale.setScalar(
            scale
        );

        model.position.set(
            0,
            -0.2,
            0
        );

        controls.target.set(
            0,
            0.3,
            0
        );

        console.log(
            "Model Loaded"
        );
    },

    undefined,

    (error)=>{

        console.error(
            error
        );
    }
);

/* ANIMATE */

function animate(){

    requestAnimationFrame(
        animate
    );

    if(model){

        model.position.y =

        -0.2 +

        Math.sin(

            clock.getElapsedTime()

        ) * 0.03;
    }

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

        const width =
        viewer.clientWidth;

        const height =
        viewer.clientHeight;

        camera.aspect =
        width /
        height;

        camera.updateProjectionMatrix();

        renderer.setSize(
            width,
            height
        );
    }
);
