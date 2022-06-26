import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  88,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const loader = new GLTFLoader();
loader.load('models/sunglass/scene.gltf', function (data) {
  console.log(data);
  const root = data.scene;
  root.scale.set(0.24, 0.24, 0.24);
  scene.add(root);
});

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 0);

const controls = new OrbitControls(camera, renderer.domElement);

const pointLight = new THREE.DirectionalLight(0xffffff, 1);
pointLight.position.set(5, 0, 5);
scene.add(pointLight);

camera.position.z = 16;

// Animate the Scene
function animate() {
  requestAnimationFrame(animate);
  controls.enablePan = false;
  controls.update();
  renderer.render(scene, camera);
}

// Adjust on window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

animate();
