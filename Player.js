import {Mesh} from "three";
import * as THREE from "three";

export class Player extends Mesh {
    constructor({
                    radius,
                    length,
                    capSegments,
                    radialSegments
                }) {
        super(
            new THREE.CapsuleGeometry(radius, length, capSegments, radialSegments),
            new THREE.MeshStandardMaterial({color: 0x184269})
        );
        this.radius = radius;
        this.length = length;
        this.capSegments = capSegments;
        this.radialSegments = radialSegments;
    }
}