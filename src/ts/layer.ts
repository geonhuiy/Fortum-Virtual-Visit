import {
  AbstractViewInterface,
  CustomLayer,
  MainViewInterface,
  SceneLayerConfigInterface,
} from "@navvis/indoorviewer";
import * as THREE from "three";
declare var scene: any;
declare var viewa: any;

export class Layer extends CustomLayer {
  constructor(view: AbstractViewInterface, scene: SceneLayerConfigInterface) {
    super(view, scene);
  }
  onTransitionStart(): void {
    this.paintSphere();
  }
  paintSphere(): void {
    var geo = new THREE.SphereGeometry(1, 32, 32);
    var mat = new THREE.MeshLambertMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.8,
    });
    var mesh = new THREE.Mesh(geo, mat);
    var mouse_loc = this.view.getLastMousePosition();

    //var loc = this.view.scene.
    mesh.position.set(7.8, -5.5, 1.7);
    console.log(mouse_loc.x);
    console.log(mouse_loc.y);
    //var image_loc = viewa.currentImage.location;
    //mesh.position.set(image_loc.x + 1, image_loc.y + 1, image_loc.z + 1);
    scene.add(mesh);
    console.log("Mesh added");
  }
}
