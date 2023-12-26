import * as THREE from "three";
export default THREE;
import { Rocket } from "./Rocket";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Particle, particleArray, dropParticle, flyParticle,
//fringSmokeLight,
 } from "./Particle";
import { createLights } from "./Lights";
//import { Rocket } from "./Rocket";
import { loadModel } from "./GLTF";
import { handleMotion } from "./cencer_camera";
export var scene;
var HEIGHT, WIDTH;
export var renderer;
var container;
var camera;
var aspectRatio, fieldOfView, nearPlane, farPlane;
var THRESHOLD = 20;
var judge = false;
var requestDeviceMotionPermission = function () {
    if (DeviceMotionEvent &&
        DeviceMotionEvent.requestPermission() === "function") {
        // 許可を取得
        DeviceMotionEvent
            .requestPermission()
            .then(function (permissionState) {
            if (permissionState === "granted") {
                console.log("許可を得られました");
                // 許可を得られた場合、devicemotionをイベントリスナーに追加
                // devicemotionのイベント処理
            }
            else {
                // 許可を得られなかった場合の処理
                console.log("許可を得られませんでした");
            }
        })
            .catch(console.error); // https通信でない場合などで許可を取得できなかった場合
    }
    else {
        // 上記以外のブラウザ
    }
};
window.addEventListener("devicemotion", function (event) {
    // console.log(" event");
    var accelerationStrength = handleMotion(event);
    //console.log({ accelerationStrength });
    // const displayDiv = document.getElementById("accelerationStrengthDisplay");
    // if (displayDiv !== null) {
    //   displayDiv.textContent = "Acceleration Strength: " + accelerationStrength;
    // }
    if (!judge && accelerationStrength > THRESHOLD) {
        judge = true;
        init(THRESHOLD);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    // ボタンクリックでrequestDeviceMotionPermission実行
    var startButton = document.getElementById("capture-button");
    if (startButton !== null) {
        startButton.addEventListener("click", function () {
            requestDeviceMotionPermission();
            console.log("bottun");
        });
    }
});
export var Colors = {
    white: 0xffffff,
    black: 0x000000,
    red1: 0xd25138,
    red2: 0xc2533b,
    red3: 0xbf5139,
    grey: 0xd9d1b9,
    darkGrey: 0x4d4b54,
    windowBlue: 0xaabbe3,
    windowDarkBlue: 0x4a6e8a,
    thrusterOrange: 0xfea036,
};
var rocket;
var terminal;
function init(threshold) {
    var n;
    //createScene();
    createRocket();
    // const rocket_glb_path: string = "../../public/rocket.glb";
    // const rkt_pst: THREE.Vector3 = new THREE.Vector3(0, 1.5, 0);
    // rocket = loadModel(scene, new GLTFLoader(), rkt_pst, rocket_glb_path, 0.1);
    var bnd_box = new THREE.Box3().setFromObject(rocket.mesh);
    var grnd = new THREE.Vector3(rocket.mesh.position.x + 2, bnd_box.min.y, rocket.mesh.position.z);
    terminal = loadModel(scene, new GLTFLoader(), grnd, "./terminal.glb", 1.0);
    createLights();
    //fringSmokeLight(firingLight);
    // createSky();
    // document.addEventListener('mousemove', handleMouseMove, false);
    // controls = new THREE.OrbitControls(camera, renderer.domElement);
    if (threshold > 30) {
        var n_1 = threshold * 0.05;
        loop(n_1);
    }
    if (30 > threshold && threshold > 25) {
        var n_2 = threshold * 0.01;
        loop(n_2);
    }
    else {
        var n_3 = threshold * 0.005;
        loop(n_3);
    }
}
var createScene = function () {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    // シーン作成
    scene = new THREE.Scene();
    // 透明な背景とアンチエイリアスを使用してRendererを作成します
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
    });
    renderer.setSize(WIDTH, HEIGHT);
    // 影の有効化
    renderer.shadowMap.enabled = true;
    container = document.getElementById("world");
    container.appendChild(renderer.domElement);
    // シーンに同じ色のフォグ効果を追加
    scene.fog = new THREE.Fog(0xf7d9aa, 300, 950);
    // カメラ作成
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 120;
    nearPlane = 1;
    farPlane = 950;
    camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    // カメラの位置座標
    camera.position.x = 0;
    camera.position.z = 400;
    camera.position.y = 0;
};
window.addEventListener("load", createScene, false);
var createRocket = function () {
    rocket = new Rocket();
    rocket.mesh.scale.set(0.1, 0.1, 0.1);
    rocket.mesh.position.y = 0;
    rocket.mesh.rotation.y = 1.5;
    scene.add(rocket.mesh);
    // let base = new Base();
    // base.mesh.position.y = -190;
    // base.mesh.scale.set(3.3, 0.8, 3.3);
    // scene.add(base.mesh);
};
var num = 0.1;
var loop = function (th) {
    if (rocket.mesh.position.y < 30) {
        num += 0.005;
    }
    else {
        num += 0.05;
    }
    // render the scene
    var cmr = new THREE.Vector3(0, 10, 60);
    camera.position.copy(cmr);
    camera.lookAt(rocket.mesh.position);
    renderer.render(scene, camera);
    rocket.mesh.position.y = Math.pow(th, num);
    rocket.mesh.position.x = Math.random() * Math.PI * 0.5;
    rocket.mesh.rotation.x = Math.random() * Math.sin(1) * 0.04;
    rocket.mesh.rotation.z = Math.random() * Math.sin(1) * 0.04;
    rocket.mesh.position.z = Math.random() * Math.PI * 0.5;
    // if (rocket.mesh.position.y < 130) {
    //   rocket.mesh.position.y += 1;
    //   rocket.mesh.position.x = Math.random() * Math.PI * 0.5;
    //   rocket.mesh.rotation.x = Math.random() * Math.sin(1) * 0.04;
    //   rocket.mesh.rotation.z = Math.random() * Math.sin(1) * 0.04;
    //   rocket.mesh.position.z = Math.random() * Math.PI * 0.5;
    // } else {
    //   rocket.mesh.rotation.y += Math.sin(1) * 0.02;
    // }
    // if (rocket.mesh.position.y > 350) {
    //   rocket.mesh.position.y = -300;
    // }
    setTimeout(function () {
        createSmoke(rocket);
    }, 1000);
    createFlyingParticles();
    requestAnimationFrame(loop);
};
var getParticle = function () {
    var p;
    if (particleArray.length > 0) {
        p = particleArray.pop();
    }
    else {
        p = new Particle();
    }
    return p;
};
var createSmoke = function (rocket) {
    var p = getParticle();
    dropParticle(p, rocket);
};
var createFlyingParticles = function () {
    var p = getParticle();
    flyParticle(p);
};
// handle windowのサイズ変更
window.onresize = function () {
    // renderer と camera の高さと幅を更新する
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
};
// inspiration/credits:
// https://codepen.io/murdoc/pen/aOPaqZ?editors=0010#0
// https://codepen.io/carrot-e/pen/WGkJBZ?editors=0010
// https://codepen.io/Yakudoo/pen/eNmjEv?editors=0010
