import {Mesh} from "three";
import * as THREE from "three";

export class Floor extends Mesh {
    constructor({
                    width,
                    height,
                    depth,
                    velocity = {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                }) {
        super(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMaterial({color: 0xFFFF00})
        );
        this.width = width;
        this.height = height;
        this.depth = depth;

        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.velocity = velocity;
    }


    update() {
        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;
    }
}