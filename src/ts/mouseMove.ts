import { MainViewInterface, CustomLayer } from "@navvis/indoorviewer";
import * as THREE from "three";
import { TubeBufferGeometry } from "three";

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
  public fP: any;
  public fP2: any;
  public minXPoint: any;
  public minXPoint2: any;
  public maxXPoint: any;

  constructor(raycaster: THREE.Raycaster, view: MainViewInterface) {
    this.raycast = raycaster;
    this.view = view;
    this.fP = null; //First Click
    this.fP2 = null; //Second Click
    this.minXPoint = 0;
    this.minXPoint2 = 0;
    this.maxXPoint = 0;
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
  public setEventHandler = (event: any) => {
    this.onMouseMove(event);
  };
  public setClickEventHandler = (event: any) => {
    this.mouseClicked(event);
  };
  public assignContainer() {
    this.minXPoint = this.view.getCurrentCursorPosition().location.y;
    this.maxXPoint = this.view.getCurrentCursorPosition().location.y;
    console.log("Min X Point: ", this.minXPoint);
    this.container.addEventListener("mousemove", this.setEventHandler);
    //this.container.addEventListener("mousedown", this.setClickEventHandler);
    console.log("Added mouse listener");


  }
  public assignDetectionListener() {
    this.container.addEventListener("mousedown", this.setClickEventHandler);
  }
  public removeListener() {
    this.container.removeEventListener("mousemove", this.setEventHandler);
    console.log("Removed mouse listener");
  }

  public calculateWallOnPosX(mousPos: any) {

  }

  public onMouseMove(event: any) {
    this.mouse = new THREE.Vector3();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycast.setFromCamera(this.mouse, this.raycast.camera);
    //this.raycast.setFromCamera(this.mouse, this.raycast.camera);
 /*   var intersects = this.raycast.intersectObjects(
      this.view.scene.children
    )[0];
    if (intersects) {
      //  console.log(intersects);
      var obj2 = new THREE.Vector3();
      var pos2 = intersects.object.position;
      //  console.log(intersects.object.position);
    }*/

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
  //  if (/*point2.y*/ posX >= this.minXPoint/*-2*/) {
  /*    console.log("posX -= mlength");
      posX -= mLength;
    } else {
      posX += mLength;
    }*/
  //  console.log("posX: ", posX, " , minXpoint: ", this.minXPoint, " point2.y: ", point2.y);
  //  var positivePosX = posX*-1;
  //  console.log(positivePosX, " , ", this.minXPoint*-1);
  //  if (posX <= (this.minXPoint+0.3)) {
    if (posX <= (this.minXPoint)) {
      this.minXPoint = posX;
   //   console.log("posX: ", posX, " , minXpoint: ", this.minXPoint, " point2.y: ", point2.y);
   //   console.log("POS X SMALLER THAN this.minXPoint");
      posX += mLength;
      collapsingXwallMin = true;
    }else {
   //   posX -= (mLength*2); //because calculating min axel takes half away
   //  console.log("Not collapsing at min wall, posX: ",posX);
  //  console.log("this.minXpoint: ",this.minXPoint);
    collapsingXwallMin = false;
    }
    console.log("collapsingXwallMin: ",collapsingXwallMin);

    if(collapsingXwallMin === true){
      posX += mLength;
    }

  /*  if (posX >= (this.maxXPoint)) {
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
  }

  public mouseClicked(event: any) {
    console.log(" minXpoint: ", this.minXPoint);
    /*   var model = this.view.getObjectsUnderCursor(this.mouse)[0].object;
   
       var meshSize2 = model.geometry.toJSON();
    // var model = this.view.getObjectsUnderCursor(this.mouse)[0].object;
         console.log("poinmodelt2: ",model);
       console.log("meshSize2: ",meshSize2);
   
   
   
       var point2 = this.view.getCurrentCursorPosition().datasetLocation;
       console.log("point2: ",point2);
     /*  this.raycast.setFromCamera(this.mouse, this.raycast.camera);
       var intersects = this.raycast.intersectObjects(
         this.view.scene.children
       )[0];
       if (intersects) {
         console.log("intersects:" ,intersects);
       }
   */
    /*
        var point2 = this.view.getObjectsUnderCursor(this.mouse);
        console.log("point2: ",point2);
    */
    switch (event.button) {

      case 0:
        //LMB
        console.log("Left mouse clicked");
        break;
      case 1:
        //MMB
        console.log("Middle mouse clicked");
        break;
      case 2:
        console.log("CASE 2? ");
        //RMB
        this.mouse = new THREE.Vector3();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycast.setFromCamera(this.mouse, this.raycast.camera);
        var intersects = this.raycast.intersectObjects(
          this.view.scene.children
        )[0];
        if (intersects) {
          console.log(intersects);
        }
        this.currentObjPos = this.view.getObjectsUnderCursor(this.mouse)[0];
        console.log(this.currentObjPos);
        console.log(this.view.getCurrentCursorPosition());

        console.log("Right mouse clicked");
        break;
    }
  }
}
