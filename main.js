import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import './style.css';
import {Cube} from "./Cube.js";

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const player = new Cube({
    width: 1, height: 1, depth: 1, position: {x: 0, y: 0, z: 4.5}, color: 0xFFFFFF, velocity: {
        x: 0, y: -0.01, z: 0
    }
});
player.castShadow = true;
scene.add(player);

const floor = new Cube({width: 5, height: 0.5, depth: 10, position: {x: 0, y: -2, z: 0}, color: 0xFFFF00})
floor.receiveShadow = true;
scene.add(floor);

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
light.position.y = 3;
light.position.z = 2;
light.castShadow = true;
scene.add(light);


const controls = new OrbitControls(camera, canvas);

window.addEventListener('keydown', (event) => {
    console.log(event)
    switch (event.code) {
        case 'KeyW':
            player.position.z -= 0.1;
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
            player.position.y = 3;
            break;
    }
})


function animate() {
    controls.update();
    renderer.render(scene, camera);
    player.update(floor);
    window.requestAnimationFrame(animate);
}

animate()