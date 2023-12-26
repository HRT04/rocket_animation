import { CSG } from "three-csg-ts";
import { Colors } from "./Scene";
import * as THREE from "three";

import { RocketcreateLights } from "./Lights";

export class Rocket {
  mesh: THREE.Object3D;
  roof: THREE.Object3D;
  body: THREE.Object3D;
  window: THREE.Object3D;
  base: THREE.Object3D;

  constructor() {
    this.mesh = new THREE.Object3D();

    // 形の編集
    let geoFinShape: THREE.Shape = new THREE.Shape();
    let x: number = 0,
      y: number = 0;

    geoFinShape.moveTo(x, y);
    geoFinShape.lineTo(x, y + 50);
    geoFinShape.lineTo(x + 35, y + 10);
    geoFinShape.lineTo(x + 35, y - 10);
    geoFinShape.lineTo(x, y);

    interface ExtrudeSettings {
      depth: number;
      bevelEnabled: boolean;
      bevelSegments: number;
      steps: number;
      bevelSize: number;
      bevelThickness: number;
    }

    let finExtrudeSettings: ExtrudeSettings = {
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1,
    };

    let geoWindowShape: THREE.Shape = new THREE.Shape();
    geoWindowShape.moveTo(x - 18, y + 45);
    geoWindowShape.lineTo(x + 18, y + 45);
    geoWindowShape.lineTo(x + 18, y - 45);
    geoWindowShape.lineTo(x - 18, y - 45);
    geoWindowShape.lineTo(x - 18, y + 45);

    // geometry
    let geoCone: THREE.ConeGeometry = new THREE.ConeGeometry(50, 70, 8);
    let geoUpper: THREE.CylinderGeometry = new THREE.CylinderGeometry(
      50,
      75,
      80,
      8
    );
    let geoMiddle: THREE.CylinderGeometry = new THREE.CylinderGeometry(
      75,
      85,
      80,
      8
    );
    let geoColumn: THREE.CylinderGeometry = new THREE.CylinderGeometry(
      85,
      85,
      200,
      8
    );
    let geoWindowFrameOuter: THREE.CylinderGeometry =
      new THREE.CylinderGeometry(55, 55, 40, 8);
    const positions: number[] = Array.from(
      geoWindowFrameOuter.attributes.position.array
    );
    const vectors: THREE.Vector3[] = [];

    for (let i = 0; i < positions.length; i += 3) {
      vectors.push(
        new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2])
      );
    }

    let geoWindowFrameInner: THREE.CylinderGeometry =
      new THREE.CylinderGeometry(40, 40, 40, 16);
    let geoWindow: THREE.CylinderGeometry = new THREE.CylinderGeometry(
      50,
      50,
      40,
      8
    );
    let geoWindowReflection: THREE.ShapeGeometry = new THREE.ShapeGeometry(
      geoWindowShape
    );
    let geoFin: THREE.ExtrudeGeometry = new THREE.ExtrudeGeometry(
      geoFinShape,
      finExtrudeSettings
    );
    let geoThruster: THREE.CylinderGeometry = new THREE.CylinderGeometry(
      55,
      55,
      40,
      8
    );
    let geoConnector: THREE.CylinderGeometry = new THREE.CylinderGeometry(
      55,
      35,
      10,
      8
    );

    // materials
    let matRoof1: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      color: Colors.red1,
      flatShading: true,
    });
    let matRoof2: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      color: Colors.red2,
      flatShading: true,
    });
    let matRoof3: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      color: Colors.red3,
      flatShading: true,
    });
    let matBody: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      color: Colors.grey,
      flatShading: true,
    });
    let matWindowFrame: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      color: Colors.darkGrey,
      side: THREE.DoubleSide,
      flatShading: true,
    });
    let matWindow: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      color: Colors.windowDarkBlue,
    });
    let matWindowReflection: THREE.MeshPhongMaterial =
      new THREE.MeshPhongMaterial({
        color: Colors.windowBlue,
      });
    let matThruster: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
      color: Colors.thrusterOrange,
      flatShading: true,
    });

    let m: THREE.Mesh = new THREE.Mesh(geoCone, matRoof1);
    m.position.y = 70;
    m.castShadow = true;
    m.receiveShadow = true;

    let m2: THREE.Mesh = new THREE.Mesh(geoUpper, matRoof2);
    m2.castShadow = true;
    m2.receiveShadow = true;

    let m3: THREE.Mesh = new THREE.Mesh(geoMiddle, matRoof3);
    m3.position.y = -70;
    m3.castShadow = true;
    m3.receiveShadow = true;

    this.roof = new THREE.Object3D();
    this.roof.add(m, m2, m3);

    let mColumn: THREE.Mesh = new THREE.Mesh(geoColumn, matBody);
    mColumn.position.y = -210;
    mColumn.position.x = 0;
    mColumn.position.z = 0;
    mColumn.castShadow = true;
    mColumn.receiveShadow = true;

    let zPlacement: number = 85;
    let yPlacement: number = -310;
    let xPlacement: number = 8;
    let yRotation: number = 1.6;
    let scale: number = 1.8;
    let finWidth: number = 15;
    let mFinLeft: THREE.Mesh = new THREE.Mesh(geoFin, matRoof3);
    mFinLeft.position.y = yPlacement;
    mFinLeft.position.z = -zPlacement;
    mFinLeft.rotation.y = yRotation - 0.08;
    mFinLeft.scale.set(scale, scale, scale);
    mFinLeft.castShadow = true;
    mFinLeft.receiveShadow = true;
    let mFinRight: THREE.Mesh = new THREE.Mesh(geoFin, matRoof3);
    mFinRight.position.y = yPlacement;
    mFinRight.position.z = zPlacement;
    mFinRight.rotation.y = -yRotation;
    mFinRight.scale.set(scale, scale, scale);
    mFinRight.castShadow = true;
    mFinRight.receiveShadow = true;

    let mfins: THREE.Object3D = new THREE.Object3D();
    mfins.rotation.y += 0.05;
    mfins.add(mFinLeft, mFinRight);
    this.body = new THREE.Object3D();
    this.body.add(mColumn, mfins);

    let innerMesh: THREE.Mesh = new THREE.Mesh(geoWindowFrameInner);
    innerMesh.rotation.y = 0.2;

    let outerMesh: THREE.Mesh = new THREE.Mesh(geoWindowFrameOuter);

    let outerCSG: CSG = CSG.fromMesh(outerMesh);
    let innerCSG: CSG = CSG.fromMesh(innerMesh);
    // ブーリアン演算...?
    let subtractResult: CSG = outerCSG.subtract(innerCSG);
    let m5: THREE.Mesh = CSG.toMesh(subtractResult, outerMesh.matrix);

    m5.position.y = -200;
    m5.position.x = -77;
    m5.rotation.z = 1.59;
    m5.castShadow = true;
    m5.receiveShadow = true;

    let m6: THREE.Mesh = new THREE.Mesh(geoWindow, matWindow);
    m6.position.y = -200;
    m6.position.x = -67;
    m6.rotation.z = 1.59;
    m6.castShadow = true;
    m6.receiveShadow = true;

    let mWindowReflection: THREE.Mesh = new THREE.Mesh(
      geoWindowReflection,
      matWindowReflection
    );
    mWindowReflection.position.x = -90;
    mWindowReflection.position.y = -200;
    mWindowReflection.rotation.y = -1.5;
    mWindowReflection.rotation.x = 0.82;
    mWindowReflection.receiveShadow = true;

    this.window = new THREE.Object3D();
    this.window.add(m5, m6, mWindowReflection);

    let mThruster: THREE.Mesh = new THREE.Mesh(geoThruster, matWindowFrame);
    mThruster.position.y = -305;
    mThruster.receiveShadow = true;
    mThruster.castShadow = true;

    let mConnector: THREE.Mesh = new THREE.Mesh(geoConnector, matThruster);
    mConnector.position.y = -330;
    mConnector.receiveShadow = true;
    mConnector.castShadow = true;

    let mBurner: THREE.Mesh = new THREE.Mesh(geoThruster, matWindowFrame);
    mBurner.position.y = -340;
    mBurner.scale.set(0.7, 0.55, 0.7);
    mBurner.receiveShadow = true;
    mBurner.castShadow = true;

    this.base = new THREE.Object3D();
    this.base.add(mThruster, mConnector, mBurner);

    RocketcreateLights(
      mThruster.position.x,
      mThruster.position.y,
      mThruster.position.z,
      this.mesh
    );
    this.mesh.add(this.roof);
    this.mesh.add(this.body);
    this.mesh.add(this.window);
    this.mesh.add(this.base);
  }
}
