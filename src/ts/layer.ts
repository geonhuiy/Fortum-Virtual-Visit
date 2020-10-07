import {
  AbstractViewInterface,
  CustomLayer,
  MainViewInterface,
  SceneLayerConfigInterface,
} from "@navvis/indoorviewer";
import * as THREE from "three";


export class Layer extends CustomLayer {
  private main_view: any;
  private main_scene: any;
  constructor(view: any, scene: SceneLayerConfigInterface) {
    super(view, scene);
    this.main_view = view;
    this.main_scene = scene;
  }
  onTransitionStart(): void {
    //this.paintSphere();
  }
  paintSphere(): void {
    var geo = new THREE.BoxGeometry(0.3,0.3,0.3);
    var mat = new THREE.MeshLambertMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.8,
    });
    var mesh = new THREE.Mesh(geo, mat);
    var image_loc = this.main_view.currentImage.location;
    mesh.position.set(image_loc.x + 2, image_loc.y, image_loc.z);
    this.main_scene.add(mesh);
    console.log("Mesh added");
  }
}
