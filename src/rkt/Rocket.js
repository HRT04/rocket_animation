import { CSG } from "three-csg-ts";
import { Colors } from "./Scene";
import * as THREE from "three";
import { RocketcreateLights } from "./Lights";
var Rocket = /** @class */ (function () {
    function Rocket() {
        this.mesh = new THREE.Object3D();
        // 形の編集
        var geoFinShape = new THREE.Shape();
        var x = 0, y = 0;
        geoFinShape.moveTo(x, y);
        geoFinShape.lineTo(x, y + 50);
        geoFinShape.lineTo(x + 35, y + 10);
        geoFinShape.lineTo(x + 35, y - 10);
        geoFinShape.lineTo(x, y);
        var finExtrudeSettings = {
            depth: 8,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 1,
            bevelThickness: 1,
        };
        var geoWindowShape = new THREE.Shape();
        geoWindowShape.moveTo(x - 18, y + 45);
        geoWindowShape.lineTo(x + 18, y + 45);
        geoWindowShape.lineTo(x + 18, y - 45);
        geoWindowShape.lineTo(x - 18, y - 45);
        geoWindowShape.lineTo(x - 18, y + 45);
        // geometry
        var geoCone = new THREE.ConeGeometry(50, 70, 8);
        var geoUpper = new THREE.CylinderGeometry(50, 75, 80, 8);
        var geoMiddle = new THREE.CylinderGeometry(75, 85, 80, 8);
        var geoColumn = new THREE.CylinderGeometry(85, 85, 200, 8);
        var geoWindowFrameOuter = new THREE.CylinderGeometry(55, 55, 40, 8);
        var positions = Array.from(geoWindowFrameOuter.attributes.position.array);
        var vectors = [];
        for (var i = 0; i < positions.length; i += 3) {
            vectors.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]));
        }
        var geoWindowFrameInner = new THREE.CylinderGeometry(40, 40, 40, 16);
        var geoWindow = new THREE.CylinderGeometry(50, 50, 40, 8);
        var geoWindowReflection = new THREE.ShapeGeometry(geoWindowShape);
        var geoFin = new THREE.ExtrudeGeometry(geoFinShape, finExtrudeSettings);
        var geoThruster = new THREE.CylinderGeometry(55, 55, 40, 8);
        var geoConnector = new THREE.CylinderGeometry(55, 35, 10, 8);
        // materials
        var matRoof1 = new THREE.MeshPhongMaterial({
            color: Colors.red1,
            flatShading: true,
        });
        var matRoof2 = new THREE.MeshPhongMaterial({
            color: Colors.red2,
            flatShading: true,
        });
        var matRoof3 = new THREE.MeshPhongMaterial({
            color: Colors.red3,
            flatShading: true,
        });
        var matBody = new THREE.MeshPhongMaterial({
            color: Colors.grey,
            flatShading: true,
        });
        var matWindowFrame = new THREE.MeshPhongMaterial({
            color: Colors.darkGrey,
            side: THREE.DoubleSide,
            flatShading: true,
        });
        var matWindow = new THREE.MeshPhongMaterial({
            color: Colors.windowDarkBlue,
        });
        var matWindowReflection = new THREE.MeshPhongMaterial({
            color: Colors.windowBlue,
        });
        var matThruster = new THREE.MeshPhongMaterial({
            color: Colors.thrusterOrange,
            flatShading: true,
        });
        var m = new THREE.Mesh(geoCone, matRoof1);
        m.position.y = 70;
        m.castShadow = true;
        m.receiveShadow = true;
        var m2 = new THREE.Mesh(geoUpper, matRoof2);
        m2.castShadow = true;
        m2.receiveShadow = true;
        var m3 = new THREE.Mesh(geoMiddle, matRoof3);
        m3.position.y = -70;
        m3.castShadow = true;
        m3.receiveShadow = true;
        this.roof = new THREE.Object3D();
        this.roof.add(m, m2, m3);
        var mColumn = new THREE.Mesh(geoColumn, matBody);
        mColumn.position.y = -210;
        mColumn.position.x = 0;
        mColumn.position.z = 0;
        mColumn.castShadow = true;
        mColumn.receiveShadow = true;
        var zPlacement = 85;
        var yPlacement = -310;
        var xPlacement = 8;
        var yRotation = 1.6;
        var scale = 1.8;
        var finWidth = 15;
        var mFinLeft = new THREE.Mesh(geoFin, matRoof3);
        mFinLeft.position.y = yPlacement;
        mFinLeft.position.z = -zPlacement;
        mFinLeft.rotation.y = yRotation - 0.08;
        mFinLeft.scale.set(scale, scale, scale);
        mFinLeft.castShadow = true;
        mFinLeft.receiveShadow = true;
        var mFinRight = new THREE.Mesh(geoFin, matRoof3);
        mFinRight.position.y = yPlacement;
        mFinRight.position.z = zPlacement;
        mFinRight.rotation.y = -yRotation;
        mFinRight.scale.set(scale, scale, scale);
        mFinRight.castShadow = true;
        mFinRight.receiveShadow = true;
        var mfins = new THREE.Object3D();
        mfins.rotation.y += 0.05;
        mfins.add(mFinLeft, mFinRight);
        this.body = new THREE.Object3D();
        this.body.add(mColumn, mfins);
        var innerMesh = new THREE.Mesh(geoWindowFrameInner);
        innerMesh.rotation.y = 0.2;
        var outerMesh = new THREE.Mesh(geoWindowFrameOuter);
        var outerCSG = CSG.fromMesh(outerMesh);
        var innerCSG = CSG.fromMesh(innerMesh);
        // ブーリアン演算...?
        var subtractResult = outerCSG.subtract(innerCSG);
        var m5 = CSG.toMesh(subtractResult, outerMesh.matrix);
        m5.position.y = -200;
        m5.position.x = -77;
        m5.rotation.z = 1.59;
        m5.castShadow = true;
        m5.receiveShadow = true;
        var m6 = new THREE.Mesh(geoWindow, matWindow);
        m6.position.y = -200;
        m6.position.x = -67;
        m6.rotation.z = 1.59;
        m6.castShadow = true;
        m6.receiveShadow = true;
        var mWindowReflection = new THREE.Mesh(geoWindowReflection, matWindowReflection);
        mWindowReflection.position.x = -90;
        mWindowReflection.position.y = -200;
        mWindowReflection.rotation.y = -1.5;
        mWindowReflection.rotation.x = 0.82;
        mWindowReflection.receiveShadow = true;
        this.window = new THREE.Object3D();
        this.window.add(m5, m6, mWindowReflection);
        var mThruster = new THREE.Mesh(geoThruster, matWindowFrame);
        mThruster.position.y = -305;
        mThruster.receiveShadow = true;
        mThruster.castShadow = true;
        var mConnector = new THREE.Mesh(geoConnector, matThruster);
        mConnector.position.y = -330;
        mConnector.receiveShadow = true;
        mConnector.castShadow = true;
        var mBurner = new THREE.Mesh(geoThruster, matWindowFrame);
        mBurner.position.y = -340;
        mBurner.scale.set(0.7, 0.55, 0.7);
        mBurner.receiveShadow = true;
        mBurner.castShadow = true;
        this.base = new THREE.Object3D();
        this.base.add(mThruster, mConnector, mBurner);
        RocketcreateLights(mThruster.position.x, mThruster.position.y, mThruster.position.z, this.mesh);
        this.mesh.add(this.roof);
        this.mesh.add(this.body);
        this.mesh.add(this.window);
        this.mesh.add(this.base);
    }
    return Rocket;
}());
export { Rocket };
