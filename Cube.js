import {Mesh} from "three";
import * as THREE from "three";

export class Cube extends Mesh {
    constructor({
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
                    }
                }) {
        super(
            new THREE.BoxGeometry(width, height, depth),
            new THREE.MeshStandardMaterial({color: color})
        );
        this.width = width;
        this.height = height;
        this.depth = depth;

        this.position.x = position.x;
        this.position.y = position.y;
        this.position.z = position.z;

        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        console.log(this.top)
        console.log(this.bottom)

        this.velocity = velocity;
    }


    update(floor) {
        this.bottom = this.position.y - this.height / 2;
        this.top = this.position.y + this.height / 2;

        this.velocity.y += 0.01;

        this.position.y += this.velocity.y;

        console.log({bottom: this.bottom})
        console.log({floorTop: floor.top})

        if (this.bottom + this.velocity.y <= floor.top) this.velocity.y = -this.velocity.y;
    }
}