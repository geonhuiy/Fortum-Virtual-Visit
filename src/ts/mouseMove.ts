import { MainViewInterface, CustomLayer } from "@navvis/indoorviewer";
import * as THREE from "three";
import { TubeBufferGeometry } from "three";
import { ContextMenuManager } from "./ContextMenuManager";
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
  box: THREE.Box3;
  contextMenuMgr: ContextMenuManager;
  intersect: THREE.Intersection;
  rotateActive: Boolean = false;
  objectOnMouse: Boolean = false;
  isDragging: Boolean = false;

  constructor(raycaster: THREE.Raycaster, view: MainViewInterface) {
    this.raycast = raycaster;
    this.view = view;
  }

  public initContextMenu() {
    this.contextMenuMgr = new ContextMenuManager(this.view, false, this);
    this.container.addEventListener("mouseup", this.onMouseUp);
    this.container.addEventListener("mouseclick", this.mouseUpFromRotation);
  }

  // Renders a 3D box into the scene using user-given dimensions
  public renderBox(): void {
    // Fields from the dimensions modal
    var height = <HTMLInputElement>document.getElementById("height");
    var width = <HTMLInputElement>document.getElementById("width");
    var length = <HTMLInputElement>document.getElementById("length");

    // Create box geometry with a set material

    var geo = new THREE.BoxGeometry(
      parseFloat(length.value),
      parseFloat(height.value),
      parseFloat(width.value)
    );
    var mat = new THREE.MeshLambertMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.8,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    //this.mesh.geometry.computeBoundingBox();
    this.box = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.box.setFromObject(this.mesh);
    // Attaches the created box object to mouse cursor
    this.assignContainer();
  }


  public deleteModel(view: any, obj: any) {
    view.scene.remove(obj.object);
    obj.object.geometry.dispose();
    obj.object.material.dispose();
  }

  public relocateModel(obj: any) {
    this.mesh = obj.object;
    this.assignContainer();
  }

  public rotateModel(event: any) {
    //this.mesh = obj.object;
    if (this.isDragging === true) {
   /*   console.log("this.isDragging 1 ",this.isDragging);
      if (this.mesh != null) {
          console.log("this.isDragging 2",this.isDragging);*/
          this.mesh.rotation.z += event.movementX * 0.005;
   /*   }
   */
    }else {
  /*    console.log("no mesh??");
     this.mesh = null; //
      this.mouseUpFromRotation();
     */
    }
  }

  public mouseUpFromRotation(){
    console.log("mouseUpFromRotation");
    if(this.isDragging == true){
      this.isDragging == false;
    };
  };

  public setIntersectAsMesh(obj: any) {
    this.mesh = obj.object;
  }

  public setEventHandler = (event: any) => {
    this.onMouseMove(event);
  };
  public setClickEventHandler = (event: any) => {
    this.mouseClicked(event);
  };
  public setRotationHandler = (event: any) => {
    this.rotateModel(event);
  };

  //Stop rotating with mouse click on anywhere
  public stopRotation = (event: any) => {
    console.log("stopRotation. rotateActive: ",this.rotateActive);
    if(this.rotateActive === true){
      console.log("stop rotating");
    try{
      this.container.removeEventListener("mousemove", this.setRotationHandler);
      }catch(e){
        console.log("e: ",e);
      }
    }else{
      console.log("no rotate");
      this.rotateActive = true;
    }
   
  
  };
  public assignContainer() {
    this.container.addEventListener("mousemove", this.setEventHandler);
  }
  public assignDetectionListener() {
    this.initContextMenu();
    this.container.addEventListener("mousedown", this.setClickEventHandler);
  }
  public removeListener() {
    this.container.removeEventListener("mousemove", this.setEventHandler);
  }
  public addRotationListener() {
    this.container.addEventListener("mousemove", this.setRotationHandler);
  }
  public addMouseClickOffRotation() {
    this.container.addEventListener("click", this.stopRotation);
  /* try{
    this.container.removeEventListener("mousemove", this.setRotationHandler);
    }catch(e){
      console.log("e: ",e);
    }*/
  }
  public onMouseMove(event: any) {
    this.mouse = new THREE.Vector3();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycast.setFromCamera(this.mouse, this.raycast.camera);
    this.objectOnMouse = true;
    if (this.mesh != null) {
      this.mesh.position.set(
        this.view.getCurrentCursorPosition().location.x,
        this.view.getCurrentCursorPosition().location.y,
        this.view.getCurrentCursorPosition().location.z
      );
    }
  }
  public onMouseUp() {
    this.mesh = null;
    this.isDragging = false;
    console.log("rivi 165: ",this.isDragging);
   // this.addMouseClickOffRotation();
  }

  /*public mouseRotate(event: any) {
    if (this.mesh != null) {
      this.mesh.rotation.z += event.movementX * 0.005;
    }
  }*/
  public mouseClicked(event: any) {
    this.mouse = new THREE.Vector3();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycast.setFromCamera(this.mouse, this.raycast.camera);
    this.intersect = this.raycast.intersectObjects(this.view.scene.children)[0];
    switch (event.button) {
      case 0:
        //LMB
        //console.log(this.intersect);
        if (this.intersect && !this.objectOnMouse) {
          this.setIntersectAsMesh(this.intersect);
          if (event.ctrlKey) {
            this.rotateActive = false;
            console.log("CTRL key");
            this.isDragging = true;
            console.log("rivi 183: ",this.isDragging);          
            
            this.addRotationListener();
            this.addMouseClickOffRotation();
          }else{
             this.isDragging = false;
             
          }

        }
        
        break;
      case 1:
        //MMB
        break;
      case 2:
        //RMB
        if (this.intersect) {
          console.log(this.intersect);
          this.contextMenuMgr.setVar(this.view, this.intersect);
          this.contextMenuMgr.modelContextActive = true;
        } else {
          this.contextMenuMgr.modelContextActive = false;
        }
        break;
    }
  }
}
