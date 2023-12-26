import { gsap } from "gsap";
import { scene } from "./Scene";
import THREE from "./Scene";
export var particleArray = [], slowMoFactor = 1;
var Particle = /** @class */ (function () {
    function Particle() {
        this.isFlying = false;
        var scale = 20 + Math.random() * 20;
        var nLines = 3 + Math.floor(Math.random() * 5);
        var nRow = 3 + Math.floor(Math.random() * 5);
        this.geometry = new THREE.SphereGeometry(scale, nLines, nRow);
        this.material = new THREE.MeshLambertMaterial({
            color: 0xe3e3e3,
            flatShading: true,
            transparent: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        recycleParticle(this);
    }
    return Particle;
}());
export { Particle };
export function recycleParticle(p) {
    p.mesh.position.x = 0;
    p.mesh.position.y = 0;
    p.mesh.position.z = 0;
    p.mesh.rotation.x = Math.random() * Math.PI * 2;
    p.mesh.rotation.y = Math.random() * Math.PI * 2;
    p.mesh.rotation.z = Math.random() * Math.PI * 2;
    p.mesh.scale.set(0.1, 0.1, 0.1);
    p.mesh.material.opacity = 0;
    p.color = 0xe3e3e3;
    p.mesh.material.color.set(p.color);
    p.material.needUpdate = true;
    scene.add(p.mesh);
    particleArray.push(p);
}
export function flyParticle(p) {
    var targetPosX, targetPosY, targetSpeed, targetColor;
    p.mesh.material.opacity = 1;
    p.mesh.position.x = -1000 + Math.random() * 2000;
    p.mesh.position.y = 100 + Math.random() * 2000;
    p.mesh.position.z = -1000 + Math.random() * 1500;
    var s = Math.random() * 0.2;
    p.mesh.scale.set(s, s, s);
    targetPosX = 0;
    targetPosY = -p.mesh.position.y - 2500;
    targetSpeed = 1 + Math.random() * 2;
    targetColor = 0xe3e3e3;
    gsap.to(p.mesh.position, {
        duration: targetSpeed * slowMoFactor,
        x: targetPosX,
        y: targetPosY,
        ease: "none",
        onComplete: recycleParticle,
        onCompleteParams: [p],
    });
}
var cloudTargetPosX, cloudTargetPosY, cloudTargetSpeed, cloudTargetColor, cloudSlowMoFactor = 0.65;
export var dropParticle = function (p, rocket) {
    p.mesh.material.opacity = 1;
    p.mesh.position.x = 0;
    p.mesh.position.y = rocket.mesh.position.y - 80;
    p.mesh.position.z = 0;
    var s = Math.random() * 0.2 + 0.35;
    p.mesh.scale.set(0.4 * s, 0.4 * s, 0.4 * s);
    cloudTargetPosX = 0;
    cloudTargetPosY = rocket.mesh.position.y - 500;
    cloudTargetSpeed = 0.8 + Math.random() * 0.6;
    cloudTargetColor = 0xa3a3a3;
    gsap.to(p.mesh.position, {
        duration: 1.3 * cloudTargetSpeed * cloudSlowMoFactor,
        x: cloudTargetPosX,
        y: cloudTargetPosY,
        ease: "none",
        onComplete: recycleParticle,
        onCompleteParams: [p],
    });
    gsap.to(p.mesh.scale, {
        duration: cloudTargetSpeed * cloudSlowMoFactor,
        x: s * 1.8,
        y: s * 1.8,
        z: s * 1.8,
        ease: "linear",
    });
};
// export function fringSmokeLight(L: THREE.PointLight) {
//   // ロケットが発射された時の煙の光の変化
//   gsap.to(L, {
//     intensity: 1.5, // 光の強度を変化させる
//     duration: 3, // アニメーション時間
//     yoyo: true, // 往復アニメーション
//     repeat: 1, // 繰り返し回数
//     onUpdate: () => {
//       // アニメーション中に光の強度を直接変更する
//       L.intensity = gsap.getProperty(L, "intensity") as number;
//     },
//   });
// }
