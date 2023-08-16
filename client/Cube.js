import {Mesh} from "three";
import * as THREE from "three";

export class Cube extends Mesh {
    constructor({
                    playerId,
                    width,
                    height,
                    depth,
                    position = {
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    color,
                    velocity = {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                }) {
        super(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMaterial({color: color})
        );
        this.playerId = playerId;
        this.width = width;
        this.height = height;
        this.depth = depth;

        this.position.set(position.x, position.y, position.z)

        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.velocity = velocity;
        this.gravity = -0.005;
    }


    update() {
        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;
        this.position.x += this.velocity.x;
        this.position.z += this.velocity.z;
    }

    applyGravity(floor) {
        this.velocity.y += this.gravity;

        if (this.bottom + this.velocity.y <= floor.top) {
            this.velocity.y *= 0.5;
            this.velocity.y = -this.velocity.y;
        } else {
            this.position.y += this.velocity.y;
        }
    }

    applyFalling() {
        this.position.y += this.velocity.y;
    }
}