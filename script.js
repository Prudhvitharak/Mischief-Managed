import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container = document.getElementById("viewer");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  35,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

camera.position.set(0, 1.8, 4);

const renderer = new THREE.WebGLRenderer({
  alpha:true,
  antialias:true
});

renderer.setSize(
  container.clientWidth,
  container.clientHeight
);

renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);

const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

const ambient = new THREE.AmbientLight(
  0xffffff,
  2
);

scene.add(ambient);

const key = new THREE.DirectionalLight(
  0xffffff,
  3
);

key.position.set(5,10,10);

scene.add(key);

const loader = new GLTFLoader();

loader.load("assets/Model.glb", (gltf)=>{

    const model = gltf.scene;

    model.scale.set(2.5,2.5,2.5);

    model.position.set(0,-1.3,0);

    scene.add(model);

});
  undefined,

  (error)=>{
      console.log(error);
      document.querySelector(".fallback").style.opacity=1;
  }
);

function animate(){
    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene,camera);
}

animate();

window.addEventListener("resize",()=>{

    camera.aspect=
      container.clientWidth/
      container.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );
});

window.openBook = function(){

    window.location.href="chapters/chapter1.html";
}
