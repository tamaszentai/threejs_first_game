import {Mesh} from "three";
import * as THREE from "three";

export class Floor extends Mesh {
    constructor({
                    width,
                    height,
                    depth,
                }) {
        super(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMaterial({color: 0xFFFF00})
        );
        this.width = width;
        this.height = height;
        this.depth = depth;
    }
}