import * as THREE from "three";
export default THREE;
import { Rocket } from "./Rocket";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  Particle,
  particleArray,
  dropParticle,
  flyParticle,
  //fringSmokeLight,
} from "./Particle";
import { createLights } from "./Lights";
//import { Rocket } from "./Rocket";
import { loadModel } from "./GLTF";
import { handleMotion } from "./cencer_camera";

export let scene: THREE.Scene;
let HEIGHT: number, WIDTH: number;
export let renderer: THREE.WebGLRenderer;
let container: HTMLElement | null;
let camera: THREE.PerspectiveCamera;
let aspectRatio: number,
  fieldOfView: number,
  nearPlane: number,
  farPlane: number;
let THRESHOLD: number = 20;
let judge: boolean = false;
const requestDeviceMotionPermission = () => {
  if (
    DeviceMotionEvent &&
    (DeviceMotionEvent as any).requestPermission() === "function"
  ) {
    // 許可を取得
    (DeviceMotionEvent as any)
      .requestPermission()
      .then((permissionState: any) => {
        if (permissionState === "granted") {
          console.log("許可を得られました");
          // 許可を得られた場合、devicemotionをイベントリスナーに追加
          // devicemotionのイベント処理
        } else {
          // 許可を得られなかった場合の処理
          console.log("許可を得られませんでした");
        }
      })
      .catch(console.error); // https通信でない場合などで許可を取得できなかった場合
  } else {
    // 上記以外のブラウザ
  }
};

window.addEventListener("devicemotion", (event) => {
  // console.log(" event");
  const accelerationStrength = handleMotion(event);
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
document.addEventListener("DOMContentLoaded", () => {
  // ボタンクリックでrequestDeviceMotionPermission実行
  const startButton: HTMLElement | null =
    document.getElementById("capture-button");
  if (startButton !== null) {
    startButton.addEventListener("click", () => {
      requestDeviceMotionPermission();
      console.log("bottun");
    });
  }
});
interface Colors {
  white: number;
  black: number;
  red1: number;
  red2: number;
  red3: number;
  grey: number;
  darkGrey: number;
  windowBlue: number;
  windowDarkBlue: number;
  thrusterOrange: number;
}

export const Colors: Colors = {
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

let rocket: any;
let terminal: any;
function init(threshold: number) {
  let n: number;
  //createScene();
  createRocket();
  // const rocket_glb_path: string = "../../public/rocket.glb";
  // const rkt_pst: THREE.Vector3 = new THREE.Vector3(0, 1.5, 0);
  // rocket = loadModel(scene, new GLTFLoader(), rkt_pst, rocket_glb_path, 0.1);
  const bnd_box: THREE.Box3 = new THREE.Box3().setFromObject(rocket.mesh);
  const grnd: THREE.Vector3 = new THREE.Vector3(
    rocket.mesh.position.x + 2,
    bnd_box.min.y,
    rocket.mesh.position.z
  );
  terminal = loadModel(scene, new GLTFLoader(), grnd, "./terminal.glb", 1.0);
  createLights();
  //fringSmokeLight(firingLight);
  // createSky();

  // document.addEventListener('mousemove', handleMouseMove, false);
  // controls = new THREE.OrbitControls(camera, renderer.domElement);
  if (threshold > 30) {
    let n = threshold * 0.05;
    loop(n);
  }
  if (30 > threshold && threshold > 25) {
    let n = threshold * 0.01;
    loop(n);
  } else {
    let n = threshold * 0.005;
    loop(n);
  }
}

const createScene = () => {
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
  container = document.getElementById("world")!;
  container.appendChild(renderer.domElement);
  // シーンに同じ色のフォグ効果を追加
  scene.fog = new THREE.Fog(0xf7d9aa, 300, 950);

  // カメラ作成
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 120;
  nearPlane = 1;
  farPlane = 950;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  // カメラの位置座標
  camera.position.x = 0;
  camera.position.z = 400;
  camera.position.y = 0;
};
window.addEventListener("load", createScene, false);

const createRocket = () => {
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

let num: number = 0.1;
const loop = (th: number) => {
  if (rocket.mesh.position.y < 30) {
    num += 0.005;
  } else {
    num += 0.05;
  }
  // render the scene
  const cmr: THREE.Vector3 = new THREE.Vector3(0, 10, 60);
  camera.position.copy(cmr);
  camera.lookAt(rocket.mesh.position);
  renderer.render(scene, camera);
  rocket.mesh.position.y = th ** num;
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

  setTimeout(() => {
    createSmoke(rocket);
  }, 1000);
  createFlyingParticles();
  requestAnimationFrame(loop);
};

const getParticle = () => {
  let p: any;
  if (particleArray.length > 0) {
    p = particleArray.pop();
  } else {
    p = new Particle();
  }
  return p;
};

const createSmoke = (rocket: any) => {
  let p = getParticle();
  dropParticle(p, rocket);
};

const createFlyingParticles = () => {
  let p = getParticle();
  flyParticle(p);
};

// handle windowのサイズ変更
window.onresize = () => {
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
