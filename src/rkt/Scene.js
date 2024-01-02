var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as THREE from "three";
export default THREE;
import { Rocket } from "./Rocket";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Particle, particleArray, dropParticle, flyParticle, launchsmoke,
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
    deepblue: 0x003366,
    rocket: 0xc8c8c8,
};
var rocket;
var terminal;
function init(threshold) {
    return __awaiter(this, void 0, void 0, function () {
        var n, bnd_box, grnd, n_1, n_2, n_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    //createScene();
                    createRocket();
                    bnd_box = new THREE.Box3().setFromObject(rocket.mesh);
                    grnd = new THREE.Vector3(rocket.mesh.position.x + 1, bnd_box.min.y, rocket.mesh.position.z);
                    return [4 /*yield*/, loadModel(scene, new GLTFLoader(), grnd, "./terminal.glb", 2.0)];
                case 1:
                    terminal = _a.sent();
                    createLights();
                    //fringSmokeLight(firingLight);
                    // createSky();
                    // document.addEventListener('mousemove', handleMouseMove, false);
                    // controls = new THREE.OrbitControls(camera, renderer.domElement);
                    if (threshold > 30) {
                        n_1 = threshold * 0.005;
                        loop(n_1);
                    }
                    if (30 > threshold && threshold > 25) {
                        n_2 = threshold * 0.005;
                        loop(n_2);
                    }
                    else {
                        n_3 = threshold * 0.005;
                        loop(n_3);
                    }
                    return [2 /*return*/];
            }
        });
    });
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
    rocket.mesh.rotation.y = 1.58;
    scene.add(rocket.mesh);
    // let base = new Base();
    // base.mesh.position.y = -190;
    // base.mesh.scale.set(3.3, 0.8, 3.3);
    // scene.add(base.mesh);
};
var num = 0;
var loop = function (th) {
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
    if (rocket.mesh.position.y < 15) {
        num += 0.003;
    }
    if (15 <= rocket.mesh.position.y && rocket.mesh.position.y < 30) {
        num += 0.007;
    }
    if (30 <= rocket.mesh.position.y) {
        num += 0.02;
    }
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
        create_Smoke(rocket);
        createFlyingParticles();
    }, 7000);
    create_launchSmoke(rocket);
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
var create_Smoke = function (rocket) {
    var p = getParticle();
    dropParticle(p, rocket);
};
var create_launchSmoke = function (rocket) {
    var p = getParticle();
    launchsmoke(p, rocket);
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
