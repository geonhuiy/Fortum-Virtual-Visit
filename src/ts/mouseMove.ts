import { MainViewInterface, CustomLayer } from "@navvis/indoorviewer";
import * as THREE from "three";
import { ContextMenuManager } from "./ContextMenuManager";
import { TubeBufferGeometry, Vector3 } from "three";

//import { CustomMenuLayer } from "./CustomMenuLayer";
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
  public fP: any;
  public fP2: any;
  public minXPoint: any;
  public maxXPoint: any;
  public meshCoords: Vector3;

  constructor(raycaster: THREE.Raycaster, view: MainViewInterface) {
    this.raycast = raycaster;
    this.view = view;
    this.fP = null; //First Click
    this.fP2 = null; //Second Click
    this.minXPoint = 0;
    this.maxXPoint = 0;
    this.meshCoords = new Vector3(0,0,0);
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
    } else {
      /*    console.log("no mesh??");
         this.mesh = null; //
          this.mouseUpFromRotation();
         */
    }
  }

  public rotateModelVertical(event: any) {
    if (this.isDragging === true) {
      this.mesh.rotation.x += event.movementX * 0.005;
    }
  }

  public mouseUpFromRotation() {
    console.log("mouseUpFromRotation");
    if (this.isDragging == true) {
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
  public setRotationHandlerVertical = (event: any) => {
    this.rotateModelVertical(event);
  };

  //Stop rotating with mouse click on anywhere
  public stopRotation = (event: any) => {
    console.log("stopRotation. rotateActive: ", this.rotateActive);
    if (this.rotateActive === true) {
      //Stop horizontal rotation
      console.log("stop rotating");
      try {
        this.container.removeEventListener("mousemove", this.setRotationHandler);
      } catch (e) {
        console.log("e: ", e);
      }
      //Stop vertical rotation
      try {
        this.container.removeEventListener("mousemove", this.setRotationHandlerVertical);
      } catch (e) {
        console.log("e: ", e);
      }
    } else {
      console.log("no rotate");
      this.rotateActive = true;
    }

  };

  public assignContainer() {

    this.minXPoint = this.view.getCurrentCursorPosition().location.y;
    this.maxXPoint = this.view.getCurrentCursorPosition().location.y;

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

  public addRotationListenerVertical() {
    this.container.addEventListener("mousemove", this.setRotationHandlerVertical);
  }

  public addMouseClickOffRotation() {
    this.container.addEventListener("click", this.stopRotation);
  }
  public calculateWallOnPosX(mousPos: any) {

  }

  public onMouseMove(event: any) {
    this.mouse = new THREE.Vector3();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycast.setFromCamera(this.mouse, this.raycast.camera);
    this.objectOnMouse = true;

    //Mouse position
    var point2 = this.view.getCurrentCursorPosition().datasetLocation;
    //  console.log("point2: ",point2);
    var meshSize = this.mesh.geometry.toJSON();

    // Half of the cube size
    let mHeight = meshSize.height / 2;
    let mWidth = meshSize.depth / 2;
    let mLength = meshSize.width / 2;

    let posY = this.view.getCurrentCursorPosition().location.z;
    let posX = this.view.getCurrentCursorPosition().location.y;

    let collapsingXwallMin = false;
    //Get the wall by calculating smallest point of x axel
    //Z axel

    /* ////original conclusion below */
    //  if (/*point2.y*/ posX >= this.minXPoint/*-2*/) {
    /*    console.log("posX -= mlength");
        posX -= mLength;
      } else {
        posX += mLength;
      }*/

    if (posX <= (this.minXPoint + 0.1)) {
      //  if (posX <= (this.minXPoint)) {
      this.minXPoint = posX;
      //   console.log("posX: ", posX, " , minXpoint: ", this.minXPoint, " point2.y: ", point2.y);
      posX += mLength;
      collapsingXwallMin = true;
    } else {
      //   posX -= (mLength*2); //because calculating min axel takes half away
      collapsingXwallMin = false;
    }
    console.log("collapsingXwallMin: ", collapsingXwallMin);

    //Check if collpasing with walls and add half of to cube size on position
    if (collapsingXwallMin === true) {
      posX += mLength;
    } else {
      posX -= mLength;
    }

    /* Calculating Max point, not necessary if min works properly */ /* if (posX >= (this.maxXPoint)) {
       // posX -= (mLength*2);
        posX += mLength;
        this.maxXPoint = posX;
        console.log("MAX X posX: ", posX, " , maxXPoint: ", this.maxXPoint, " point2.y: ", point2.y);
      //  posX -= (mLength*2); //because calculating min axel takes half away
      }*/

    //Y axel, height collapse detection
    if (point2.z < 1) {
      posY += mHeight;
    } else {
      posY -= mHeight;
    }

    //console.log("posY: ",posY);

    if (this.mesh != null) {
      this.mesh.position.set(
        this.view.getCurrentCursorPosition().location.x,
        posX,
        posY
      );
    }
       //console.log(this.currentObjPos);
       this.meshCoords = new Vector3(this.view.getCurrentCursorPosition().location.x,posX,posY);
  }
  public onMouseUp() {
    this.mesh = null;
    this.isDragging = false;
  }

  public mouseClicked(event: any) {
   
    console.log("this.meshCoords: ",this.meshCoords);

    //reset the calculating point on click
    this.minXPoint = 0;

    switch (event.button) {

      case 0:
        //LMB
        //console.log(this.intersect);
       
        if (this.intersect && !this.objectOnMouse) {
          this.setIntersectAsMesh(this.intersect);
         
           //Rotate Horizontally with Ctrl key
          if (event.ctrlKey) {
            this.rotateActive = false;
            this.isDragging = true;

            this.addRotationListener();
            this.addMouseClickOffRotation();
          } 
          //Rotate Vertically with Alt key
          else if(event.altKey){
          
            this.rotateActive = false;
            this.isDragging = true;

            this.addRotationListenerVertical();
            this.addMouseClickOffRotation();
          }
          /*else
          {
            this.isDragging = false;
          }*/
        }

        break;
        //Bug in switch cases on context menu, for now vertical rotate is done with alt key
   /*   case 1:
        //Rotate vertically
        if (this.intersect && !this.objectOnMouse) {
          this.setIntersectAsMesh(this.intersect);
          if (event.ctrlKey) {
            this.rotateActive = false;
            this.isDragging = true;

            this.addRotationListenerVertical();
            this.addMouseClickOffRotation();
          } else {
            this.isDragging = false;
          }
        }
        break;*/
      case 1:
        //MMB
        break;
      case 2:
        //RMB
        this.mouse = new THREE.Vector3();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycast.setFromCamera(this.mouse, this.raycast.camera);
        this.intersect = this.raycast.intersectObjects(this.view.scene.children)[0];    
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
