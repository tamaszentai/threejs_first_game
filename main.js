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

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            keys.w.pressed = true;
            break;
        case 'KeyA':
            keys.a.pressed = true;
            break;
        case 'KeyS':
            keys.s.pressed = true;
            break;
        case 'KeyD':
            keys.d.pressed = true;
            break;
        case 'Space':
            keys.space.pressed = true;
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
            keys.w.pressed = false;
            break;
        case 'KeyA':
            keys.a.pressed = false;
            break;
        case 'KeyS':
            keys.s.pressed = false;
            break;
        case 'KeyD':
            keys.d.pressed = false;
            break;
        case 'Space':
            keys.space.pressed = false;
            break;
    }
})




function animate() {
    controls.update();
    renderer.render(scene, camera);
    if (keys.w.pressed) player.velocity.z = -0.01;
    if (keys.a.pressed) player.velocity.x = -0.01;
    if (keys.s.pressed) player.velocity.z = +0.01;
    if (keys.d.pressed) player.velocity.x = +0.01;


    player.update();
    player.applyGravity(floor);
    window.requestAnimationFrame(animate);
}

animate()