import {
  MainViewInterface,
  SceneLayerConfigInterface,
} from "@navvis/indoorviewer";
import * as THREE from "three";
import { Modal } from "./modal";
declare global {
  interface Window {
    IV: any;
  }
}
export class MouseMove {
  mouse: any;
  raycast: THREE.Raycaster;
  view: any;
  container = document.getElementById("indoorviewer");
  currentObjPos: THREE.Vector3;
  mesh: THREE.Mesh = null;
  constructor(raycaster: THREE.Raycaster, view: MainViewInterface) {
    this.raycast = raycaster;
    this.view = view;
  }
  public setEventHandler = (event: any) => {
    this.onMouseMove(event);
  };

  public setClickEventHandler = (event: any) => {
    this.mouseClicked(event);
  }
  public assignContainer() {
    this.container.addEventListener("mousemove", this.setEventHandler);
    this.container.addEventListener("mousedown", this.setClickEventHandler);
    //this.container.addEventListener("mousedown", this.setClickEventHandler);
    console.log("Added mouse listener");
  }
  public removeListener() {
    this.container.removeEventListener("mousemove", this.setEventHandler);
    console.log("Removed mouse listener");
  }
  public onMouseMove(event: any) {
    this.mouse = new THREE.Vector3();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
    this.raycast.setFromCamera(this.mouse, this.raycast.camera);
    var intersects = this.raycast.intersectObjects(this.view.scene.children)[0];
    this.currentObjPos = this.view.getObjectsUnderCursor(this.mouse)[0].point;
    if (this.mesh != null) {
      this.mesh.position.set(
        this.view.getCurrentCursorPosition().location.x,
        this.view.getCurrentCursorPosition().location.y,
        this.view.getCurrentCursorPosition().location.z
      );
    }
    //console.log(this.currentObjPos);
  }


  public mouseClicked(event: any) {
    switch(event.button) {
      case 0:
        //LMB
        console.log("Left mouse clicked");
        break;
      case 1:
        //MMB
        console.log("Middle mouse clicked");
        break;
      case 2:
        //RMB
        this.raycast.setFromCamera(this.mouse, this.raycast.camera);
        var intersects = this.raycast.intersectObjects(this.view.scene.children)[0];
        if(intersects) {
          console.log(intersects);
        }
        console.log("Right mouse clicked");
        break;
    }
  }
}


