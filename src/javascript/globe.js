import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function rotation_to_point(rotation, radius) {
    let result = [radius, 0];

    const rotation_in_radians = rotation * Math.PI / 180;

    result[0] = Math.cos(rotation_in_radians) * radius;
    result[1] = Math.sin(rotation_in_radians) * radius;

    return result;
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

const wrapper = document.getElementById("main-wrapper");
wrapper.appendChild(renderer.domElement);

// 1. Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("#101010");

// 2. Create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 3. Create a globe
const geometry = new THREE.SphereGeometry(2, 32, 16);
const material = new THREE.MeshPhongMaterial();
const sphere = new THREE.Mesh(geometry, material);
material.map = new THREE.TextureLoader().load('/src/assets/earth.jpg');
scene.add(sphere);

// 4. Create a light source
const global_light = new THREE.AmbientLight(0x888888);
const directional_light = new THREE.DirectionalLight(0xffffff, 1);

// 4.1 Make the light follow current time
const time_offset = 12;
const current_hour = new Date().getUTCHours() + time_offset;

const resulting_camera_rotation = (current_hour * 360 / 24);

const resulting_camera_position = rotation_to_point(resulting_camera_rotation, 5);

directional_light.position.set(resulting_camera_position[0], 0, resulting_camera_position[1]);
scene.add(global_light);
scene.add(directional_light);

// 5. Make the globe can rotate 
const control = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    control.update();

    renderer.render(scene, camera);
}

// 6. Render
renderer.render(scene, camera);
animate();