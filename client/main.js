import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import './style.css';
import {Cube} from "./Cube.js";
import { io } from "socket.io-client";


let newPlayer;
const socket = io("//localhost:3000");
socket.on('message', (arg) => {
    console.log(arg);
    newPlayer = new Cube({playerId: arg,
        width: 1, height: 1, depth: 1, position: {x: 0, y: 0, z: 24.5}, color: 0xFFFFFF, velocity: {
            x: 0, y: -0.01, z: 0
        },})
    newPlayer.castShadow = true;
    scene.add(newPlayer);
})

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const player = new Cube({id: 111,
    width: 1, height: 1, depth: 1, position: {x: 0, y: 0, z: 24.5}, color: 0xFFFFFF, velocity: {
        x: 0, y: -0.01, z: 0
    }
});

if (newPlayer) {
    newPlayer.castShadow = true;
    scene.add(newPlayer);
    console.log(!!newPlayer);
}

console.log(!!newPlayer);


const floor = new Cube({id: 555, width: 10, height: 0.5, depth: 50, position: {x: 0, y: -2, z: 0}, color: 0xFFFF00})
floor.receiveShadow = true;
scene.add(floor);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.z = 50;
camera.position.y = 10;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setClearColor(0xa0c4e0);
renderer.render(scene, camera);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight)

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.y = 2;
light.position.z = 25;
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
            newPlayer.velocity.y = 0.2    ;
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
    }
})




function animate() {
    controls.update();
    renderer.render(scene, camera);
    if (newPlayer) {
        console.log(newPlayer)
        newPlayer.velocity.x = 0;
        newPlayer.velocity.z = 0;
        if (keys.w.pressed) {
            socket.emit('forward', 'forward');
            newPlayer.velocity.z = -0.05;
        }
        if (keys.a.pressed) newPlayer.velocity.x = -0.05;
        if (keys.s.pressed) newPlayer.velocity.z = 0.05;
        if (keys.d.pressed) newPlayer.velocity.x = 0.05;
        newPlayer.update();
        if (Math.abs(newPlayer.position.x) < (floor.width / 2 + newPlayer.width / 2)) {
            newPlayer.applyGravity(floor);
        }

        if (Math.abs(newPlayer.position.x) > (floor.width / 2 + newPlayer.width / 2) || newPlayer.bottom < floor.top) {
            newPlayer.velocity.y = -0.1;
            newPlayer.applyFalling();
        }

        if (Math.abs(newPlayer.position.z) > (floor.depth / 2 + newPlayer.depth / 2) || newPlayer.bottom < floor.top) {
            newPlayer.velocity.y = -0.1;
            newPlayer.applyFalling();
        }
    }

    window.requestAnimationFrame(animate);
}

animate()