import THREE from "./Scene";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// glbファイルの読み込み
export const loadModel = (
  scene: THREE.Scene,
  gltfLoader: GLTFLoader,
  position: THREE.Vector3,
  glb_path: string,
  scl: number
): Promise<THREE.Mesh[]> => {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      glb_path,
      (gltf) => {
        const model: THREE.Object3D = gltf.scene;
        let meshes: THREE.Mesh[] = [];
        // モデル内のメッシュを取得
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            meshes.push(child);
          }
        });
        model.scale.set(scl, scl, scl);
        model.position.copy(position);
        scene.add(model);
        resolve(meshes);
      },
      undefined,
      reject
    );
  });
};
