import {Mesh} from "three";
import * as THREE from "three";
import {floor} from "three/nodes";

export class Player extends Mesh {
    constructor({
                    radius,
                    length,
                    capSegments,
                    radialSegments,
                    velocity = {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                }, floor) {
        super(
            new THREE.CapsuleGeometry(radius, length, capSegments, radialSegments),
            new THREE.MeshStandardMaterial({color: 0xffffff})
        );
        this.radius = radius;
        this.length = length;
        this.capSegments = capSegments;
        this.radialSegments = radialSegments;
        this.floor = floor;

        this.bottom = this.position.y - this.length / -2;
        this.top = this.position.y + this.length / -2;
        this.velocity = velocity;
        }

    update() {

        this.bottom = this.position.y - this.length / 2;
        this.top = this.position.y + this.length / 2;

        this.velocity.y += 0.01;

        this.position.y += this.velocity.y;

        console.log({bottom: this.bottom})
        console.log({floorTop: this.floor.top})

        if (this.bottom + this.velocity.y <= this.floor.top) this.velocity.y = -this.velocity.y;

        // this.velocity.y += -0.01
        //
        // if (this.bottom + this.velocity.top <= this.floor.top){
        //     this.velocity = -this.velocity.y;
        // } else {
        //     this.position.y += this.velocity.y
        // }


    }
}