import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

import { GLTFLoader }
from "https://cdn.jsdelivr.net/npm/three@0.165/examples/jsm/loaders/GLTFLoader.js";

import { DRACOLoader }
from "https://cdn.jsdelivr.net/npm/three@0.165/examples/jsm/loaders/DRACOLoader.js";

const container =
document.getElementById("model-container");

const scene =
new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
35,
container.clientWidth /
container.clientHeight,
0.1,
100
);

camera.position.z = 5;

const renderer =
new THREE.WebGLRenderer({
alpha:true,
antialias:true
});

renderer.setPixelRatio(
window.devicePixelRatio
);

renderer.setSize(
container.clientWidth,
container.clientHeight
);

container.appendChild(
renderer.domElement
);

/* Lights */

scene.add(
new THREE.AmbientLight(
0xffffff,
2
)
);

const dir =
new THREE.DirectionalLight(
0xffffff,
2.5
);

dir.position.set(
5,
5,
5
);

scene.add(dir);

/* Draco */

const draco =
new DRACOLoader();

draco.setDecoderPath(
"https://www.gstatic.com/draco/v1/decoders/"
);

const loader =
new GLTFLoader();

loader.setDRACOLoader(
draco
);

let model;

/* Load Model */

loader.load(
"assets/Model.glb",

(gltf)=>{

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

},

undefined,

(error)=>{
    console.error(error);
}
);

/* Hover Animation */

function animate(){

    requestAnimationFrame(
        animate
    );

    if(model){

    
        model.position.y =
        -1.2 +
        Math.sin(
            Date.now()*0.0015
        )*0.12;
    }

    renderer.render(
        scene,
        camera
    );
}

animate();

/* Responsive */

window.addEventListener(
"resize",
()=>{

renderer.setSize(
container.clientWidth,
container.clientHeight
);

camera.aspect =
container.clientWidth/
container.clientHeight;

camera.updateProjectionMatrix();

// OPEN BUTTON CLICK

document
    .getElementById("openButton")
    .addEventListener("click", () => {

        window.location.href = "map.html";

    });

});

