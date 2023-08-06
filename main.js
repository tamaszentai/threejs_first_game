import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import './style.css';

const canvas = document.querySelector('.webgl');

const scene = new THREE.Scene();

const playerGeometry = new THREE.CapsuleGeometry( 1, 1, 32, 64 );
const playerMaterial = new THREE.MeshStandardMaterial( {color: 0x184269} );
const player = new THREE.Mesh( playerGeometry, playerMaterial );
player.castShadow = true;

scene.add( player );

const floorGeometry = new THREE.BoxGeometry( 20, .1, 200 );
const floorMaterial = new THREE.MeshStandardMaterial( {color: 0xFFFF00} );
const floor = new THREE.Mesh( floorGeometry, floorMaterial );
floor.receiveShadow = true;
floor.position.y = -2;
floor.position.z = -99;
scene.add( floor );


const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.z = 20;
camera.position.y = 10;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.render(scene, camera);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.z = 3;
light.castShadow = true;
scene.add(light);

const controls = new OrbitControls( camera, canvas );

function animate() {
    controls.update();
    // player.rotation.x += 0.05;
    player.rotation.z += 0.05;
    renderer.render( scene, camera );
    window.requestAnimationFrame( animate );
}
animate()