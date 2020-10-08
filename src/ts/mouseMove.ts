import {
  MainViewInterface,
  SceneLayerConfigInterface,
} from "@navvis/indoorviewer";
import * as THREE from "three";
export class MouseMove {
  mouse: any;
  raycast: THREE.Raycaster;
  view: any;
  container = document.getElementById("indoorviewer");
  currentObjPos: THREE.Vector3;
  mesh: THREE.Mesh;
  constructor(raycaster: THREE.Raycaster, view: MainViewInterface) {
    this.raycast = raycaster;
    this.view = view;
  }
  public assignContainer() {
    this.container.addEventListener("mousemove", (event) => {
      this.onMouseMove(event);
    });
  }
  public onMouseMove(event: any) {
    this.mouse = new THREE.Vector3();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    this.raycast.setFromCamera(this.mouse, this.raycast.camera);
    var intersects = this.raycast.intersectObjects(this.view.scene.children, true);
    //currentObjPos = this.view.getObjectsUnderCursor(this.mouse)
    //console.log(this.view.getObjectsUnderCursor(this.mouse));
    this.currentObjPos = (this.view.getObjectsUnderCursor(this.mouse)[0].point);
    //console.log(intersects);
    //mesh.position.set(this.currentObjPos.x, this.currentObjPos.y, this.currentObjPos.z);
    //console.log(this.currentObjPos);
    if (intersects.length > 0) {
      //console.log(this.view.scene);
    }
  }
}
