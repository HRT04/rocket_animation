import THREE from "./Scene";
// glbファイルの読み込み
export var loadModel = function (scene, gltfLoader, position, glb_path, scl) {
    return new Promise(function (resolve, reject) {
        gltfLoader.load(glb_path, function (gltf) {
            var model = gltf.scene;
            var meshes = [];
            // モデル内のメッシュを取得
            model.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    meshes.push(child);
                }
            });
            model.scale.set(scl, scl, scl);
            model.position.copy(position);
            scene.add(model);
            resolve(meshes);
        }, undefined, reject);
    });
};
