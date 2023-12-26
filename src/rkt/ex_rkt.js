import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { Rocket } from "./Rocket";
import * as THREE from "three";
var scene = new THREE.Scene();
// GLTF形式にエクスポート
var export_rocket = function (rokcetMesh, ex_path) {
    var exporter = new GLTFExporter();
    exporter.parse(rokcetMesh, function (result) {
        // glbはUint8Array形式のGLBデータです
        // これをBlobに変換し、ユーザーがダウンロードできるようにします
        var blob = new Blob([result], { type: "model/gltf-binary" });
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", ex_path); // ダウンロード時のファイル名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, function (error) {
        // エラー発生時の処理
        console.error("Export Error:", error);
    }, { binary: true });
};
var rocket;
rocket = new Rocket();
rocket.mesh.scale.set(0.1, 0.1, 0.1);
rocket.mesh.position.y = 0;
rocket.mesh.rotation.y = 1.5;
scene.add(rocket.mesh);
export_rocket(scene, "rocket.glb");
