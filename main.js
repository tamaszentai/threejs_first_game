import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import './style.css';
import {Cube} from "./Cube.js";

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const floor = new Cube({width: 20, height: 1, depth: 200, position: {x: 0, y: -1, z: -99}, color: 0xFFFF00})
floor.receiveShadow = true;
scene.add(floor);


const player = new Cube({
    width: 1, height: 1, depth: 1, position: {x: 0, y: 0, z: 0}, color: 0xFFFFFF, velocity: {
        x: 0, y: -0.01, z: 0
    }
});
player.castShadow = true;
scene.add(player);


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.z = 20;
camera.position.y = 0;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setClearColor(0xa0c4e0);
renderer.render(scene, camera);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.z = 3;
light.castShadow = true;
scene.add(light);


const controls = new OrbitControls(camera, canvas);

window.addEventListener('keydown', (event) => {
    console.log(event)
    switch (event.code) {
        case 'KeyW':
            player.position.z -= 0.2;
            break;
        case 'KeyA':
            player.position.x -= 0.2;
            break;
        case 'KeyS':
            player.position.z += 0.2;
            break;
        case 'KeyD':
            player.position.x += 0.2;
            break;
        case 'Space':
            player.position.y += 0.5;
            break;
    }
})


function animate() {
    controls.update();
    player.update(floor);
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

animate()