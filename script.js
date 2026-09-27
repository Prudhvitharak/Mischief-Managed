import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

/* =====================================
   SPELL SCREEN
===================================== */

const micBtn =
document.getElementById("micBtn");

const spellStatus =
document.getElementById("spellStatus");

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (SpeechRecognition) {

    const recognition =
    new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.interimResults = false;

    recognition.continuous = false;

    micBtn.addEventListener(
        "click",
        () => {

            spellStatus.innerText =
            "Listening...";

            recognition.start();
        }
    );

    recognition.onresult = (event) => {

        const spell =
        event.results[0][0]
        .transcript
        .toLowerCase();

        console.log(spell);

        if (
            spell.includes("mischief managed")
        ) {

            spellStatus.innerText =
            "Spell Accepted ✨";

            revealSite();

        } else {

            spellStatus.innerText =
            "Wrong Spell. Try Again.";
        }
    };

    recognition.onerror = () => {

        spellStatus.innerText =
        "Microphone Error";
    };
}

function revealSite() {

    const spellScreen =
    document.getElementById(
        "spellScreen"
    );

    spellScreen.classList.add(
        "fade"
    );

    document
    .querySelector(".cover")
    .classList.add("show");

    setTimeout(() => {

        spellScreen.remove();

    }, 2000);
}

/* =====================================
   THREE JS
===================================== */

const container =
document.getElementById(
    "model-container"
);

const scene =
new THREE.Scene();

/* CAMERA */

const camera =
new THREE.PerspectiveCamera(
    35,
    container.clientWidth /
    container.clientHeight,
    0.1,
    100
);

camera.position.set(
    0,
    0,
    5
);

/* RENDERER */

const renderer =
new THREE.WebGLRenderer({

    alpha: true,
    antialias: true

});

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);

renderer.setSize(
    container.clientWidth,
    container.clientHeight
);

container.appendChild(
    renderer.domElement
);

/* LIGHTS */

const ambientLight =
new THREE.AmbientLight(
    0xffffff,
    2
);

scene.add(
    ambientLight
);

const directionalLight =
new THREE.DirectionalLight(
    0xffffff,
    2.5
);

directionalLight.position.set(
    5,
    5,
    5
);

scene.add(
    directionalLight
);

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

/* MODEL */

let model;

loader.load(

    "assets/Model.glb",

    (gltf) => {

        model =
        gltf.scene;

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

        console.log(
            "Model Loaded"
        );
    },

    undefined,

    (error) => {

        console.error(
            "Model Load Error:",
            error
        );
    }
);

/* ANIMATION */

function animate() {

    requestAnimationFrame(
        animate
    );

    if (model) {

        model.rotation.y += 0.003;

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

/* RESIZE */

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

/* =====================================
   WAX SEAL BUTTON
===================================== */

const openButton =
document.getElementById(
    "openButton"
);

const passwordModal =
document.getElementById(
    "passwordModal"
);

openButton.addEventListener(
    "click",
    () => {

        passwordModal.classList.add(
            "show"
        );
    }
);

/* =====================================
   HINT
===================================== */

const hintBtn =
document.getElementById(
    "hintBtn"
);

const hintText =
document.getElementById(
    "hintText"
);

hintBtn.addEventListener(
    "click",
    () => {

        hintText.style.display =
        hintText.style.display === "block"
        ? "none"
        : "block";
    }
);

/* =====================================
   PASSWORD CHECK
===================================== */

document
.getElementById(
    "unlockBtn"
)
.addEventListener(
    "click",
    () => {

        const password =
        document
        .getElementById(
            "passwordInput"
        )
        .value
        .trim();

        if (
            password === "0.32"
        ) {

            document
            .getElementById(
                "passwordModal"
            )
            .classList.remove(
                "show"
            );

            document
            .getElementById(
                "questionModal"
            )
            .classList.add(
                "show"
            );

        } else {

            alert(
                "Mischief Managed... Incorrect Password."
            );
        }
    }
);

/* =====================================
   MEMORY QUESTION
===================================== */

document
.getElementById(
    "continueBtn"
)
.addEventListener(
    "click",
    () => {

        const selected =
        document.querySelector(
            'input[name="memory"]:checked'
        );

        if (!selected) {

            alert(
                "Choose one memory first 😊"
            );

            return;
        }

        document
        .getElementById(
            "questionModal"
        )
        .classList.remove(
            "show"
        );

        document
        .getElementById(
            "kedarModal"
        )
        .classList.add(
            "show"
        );
    }
);

/* =====================================
   OPEN MAP
===================================== */

document
.getElementById(
    "openMapBtn"
)
.addEventListener(
    "click",
    () => {

        document.body.classList.add(
            "fade"
        );

        setTimeout(() => {

            window.location.href =
            "map1.html";

        }, 600);
    }
);
