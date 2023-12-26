<template>
  <div id="app">
    <div id="ar-container">
      <video id="video-element" autoplay playsinline></video>
    </div>
    <button id="capture-button">BUTTON</button>
    <div
      id="accelerationStrengthDisplay"
      style="color: black; font-size: 20px; z-index: 10"
    ></div>
    <div id="world" style="z-index: -10"></div>
  </div>
</template>
<style>
/* スタイルをここに追加できます */
body {
  margin: 0;
  padding: 0;
}
#world {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(#144066, #c7c9ea);
}
#ar-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /* 最後面 */
  z-index: 9;
}
/* ボタン */
#capture-button {
  font-size: 20px;
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 25px 40px;
  background-color: #3498db;
  color: black;
  border: none;
  cursor: pointer;
  z-index: 10;
}
</style>

<script>
import SceneBundle from "../dist/SceneBundle.js";
import cencerBundle from "../dist/cencer_cameraBundle.js";
import RocketBundle from "../dist/RocketBundle.js";
import ParticleBundle from "../dist/ParticleBundle.js";
import LightsBundle from "../dist/LightsBundle.js";
import GLTFBundle from "../dist/GLTFBundle.js";
import Scene from "./rkt/Scene.js";
import Lights from "./rkt/Lights.js";
import Particle from "./rkt/Particle.js";
import Rocket from "./rkt/Rocket.js";
import cencer from "./rkt/cencer_camera.js";
export default {
  // コンポーネントのロジック
  mounted() {
    // コンポーネントがマウントされた後のロジックをここに追加することができます
  },
};
</script>
