import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { Rocket } from "./Rocket";
import * as THREE from "three";

const scene = new THREE.Scene();

// GLTF形式にエクスポート
const export_rocket = (rokcetMesh: THREE.Object3D, ex_path: string) => {
  const exporter = new GLTFExporter();
  exporter.parse(
    rokcetMesh,
    (result: any) => {
      // glbはUint8Array形式のGLBデータです
      // これをBlobに変換し、ユーザーがダウンロードできるようにします
      const blob = new Blob([result], { type: "model/gltf-binary" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", ex_path); // ダウンロード時のファイル名
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    (error) => {
      // エラー発生時の処理
      console.error("Export Error:", error);
    },
    { binary: true }
  );
};
let rocket: any;
rocket = new Rocket();
rocket.mesh.scale.set(0.1, 0.1, 0.1);
rocket.mesh.position.y = 0;
rocket.mesh.rotation.y = 1.5;
scene.add(rocket.mesh);
export_rocket(rocket.mesh, "rocket.glb");
