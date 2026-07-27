import * as THREE from "three";

export default function getStarfield({ numStars = 500 } = {}) {
    const geometry = new THREE.IcosahedronGeometry(0.05, 0);

    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        fog: false,
    });

    const white = new THREE.Color("#ffffff");
    const orange = new THREE.Color("#db5902");
    const blue = new THREE.Color("#0355fc");

    const mesh = new THREE.InstancedMesh(geometry, material, numStars);

    const dummy = new THREE.Object3D();

    for (let i = 0; i < numStars; i++) {
        const phi = Math.random() * Math.PI * 2;
        const cosTheta = Math.random() * 2 - 1;
        const theta = Math.acos(cosTheta);
        const radius = 49 + Math.random();

        dummy.position.set(
            radius * Math.sin(theta) * Math.cos(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * cosTheta
        );

        const scale = THREE.MathUtils.randFloat(0.5, 2);

        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        const r = Math.random();

        if (r < 0.33) {
            mesh.setColorAt(i, white);
        } else if (r < 0.7) {
            mesh.setColorAt(i, orange);
        } else {
            mesh.setColorAt(i, blue);
        }
    }

    mesh.instanceMatrix.needsUpdate = true;

    if (mesh.instanceColor) {
        mesh.instanceColor.needsUpdate = true;
    }

    return mesh;
}
