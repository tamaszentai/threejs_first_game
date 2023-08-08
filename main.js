import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import './style.css';
import {Player} from "./Player.js";
import {Floor} from "./Floor.js";

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

// const floorGeometry = new THREE.BoxGeometry(20, .1, 200);
// const floorMaterial = new THREE.MeshStandardMaterial({color: 0xFFFF00});
const floor = new Floor({width: 20, height: 1, depth: 200})
floor.receiveShadow = true;
floor.position.y = -2;
floor.position.z = -99;
scene.add(floor);

// const playerGeometry = new THREE.CapsuleGeometry( 1, 1, 32, 64 );
// const playerMaterial = new THREE.MeshStandardMaterial( {color: 0x184269} );
const player = new Player({
    radius: 1, length: 1, capSegments: 32, radialSegments: 64, velocity: {
        x: 0, y: -0.01, z: 0
    }
}, floor);

player.castShadow = true;

scene.add(player);


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.z = 20;
camera.position.y = 10;
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
    player.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
}

animate()