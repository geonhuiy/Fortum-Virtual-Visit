import { ApiInterface, SceneLayerConfigInterface } from "@navvis/indoorviewer";
import { Layer } from "./layer";
import * as THREE from "three";
import { MouseMove } from "./mouseMove";
import { Mesh } from "three";

export class Modal {
  private layer: Layer;
  private main_view: any;
  private main_scene: any;
  private mouseMove: MouseMove;
  private mesh: Mesh;

  public fP: any;
	public fP2: any;


  public setLayer(iv: ApiInterface): void {
    this.main_view = iv.legacyApi.getMainView();
    //console.log(this.main_view);
    this.main_scene = iv.legacyApi.getMainView().scene;
    this.layer = new Layer(this.main_view, this.main_view.scene);
    this.main_view.addToScene(this.layer);
  }
  public renderBox(): void {
    var height = <HTMLInputElement>document.getElementById("height");
    var width = <HTMLInputElement>document.getElementById("width");
    var length = <HTMLInputElement>document.getElementById("length");
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
    //mesh.position.set(image_loc.x, image_loc.y, image_loc.z);
    //this.mesh.position.set(this.mouseMove.currentObjPos.x, this.mouseMove.currentObjPos.y, this.mouseMove.currentObjPos.z);
    //this.main_scene.add(this.mesh);
    //console.log("Mesh added at "+image_loc.x +","+image_loc.y +","+image_loc.z);
  }
  public assignEventListeners(): void {
    this.mouseMove = new MouseMove(this.main_view.raycaster, this.main_view);
    this.mouseMove.assignContainer();
    var modalContainer = document.getElementById("modal-container");
    var closeButton = document.getElementsByClassName("close")[0];
    var dimensionForm = document.getElementById("dimensions");
    var container = document.getElementById("indoorviewer");
   

    	//mouse click points x,y,z in meters
        this.fP = null; //First Click
				this.fP2 = null; //Second Click
		
				var clicked = false; //reset button

    closeButton.addEventListener("click", function () {
      modalContainer.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == modalContainer) {
        modalContainer.style.display = "none";
      }
    });

    dimensionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.renderBox();
      modalContainer.style.display = "none";
    });

    container.addEventListener("click", (event) => {
      if (this.mesh != null) {
        this.mouseMove.currentObjPos = this.mouseMove.view.getObjectsUnderCursor(
          this.mouseMove.mouse
        )[0].point;

        var point2 = this.main_view.getCurrentCursorPosition().datasetLocation;

        var meshSize = this.mesh.geometry.toJSON();
       
     //   console.log("mesh depth: ",meshSize.depth);
     //   console.log("mesh height: ",meshSize.height);
    //    console.log("mesh width: ",meshSize.width);

      // Half of the cube size
        let mHeight = meshSize.height/2;
        let mWidth = meshSize.depth/2;
        let mLength = meshSize.width/2;

      //  this.fP = point2;
    	if(clicked == false){

        this.fP = point2;

        clicked = true;

      }else{ //After first click calculate distances and create cube based on them
 
        this.fP2 = point2;

        //Checking the distance between walls, floors in meters...
        let distanceZ = this.fP.x - this.fP2.x;
        let distanceX = this.fP.y - this.fP2.y;
        let distanceY = this.fP.z - this.fP2.z;

        //turn them to positive 
        if(distanceX <= 0){
          distanceX *= -1;
          }
          if(distanceY <= 0){
          distanceY *= -1;
          }
          if(distanceZ <= 0){
          distanceZ *= -1;
          }

       //Check if mouse is on the floor or at the roof and based on that make it either pos or negative
          console.log("this.main_view.getCurrentCursorPosition().datasetLocation ",
          this.main_view.getCurrentCursorPosition().datasetLocation);
       if(this.main_view.getCurrentCursorPosition().location.y<1){
         if(mHeight<0){
            mHeight *= -1;
         }
          
        }
        console.log("mHeigh: ",mHeight);
        //Calculate distance between empty space and cube
        var emptySpaceY = distanceY - mHeight;
        console.log("distanceY: ",distanceY);
        console.log("cubemptySpaceYeY: ",emptySpaceY);

        //check if cube goes over empty space
     
      
   //     var y1 = this.main_view.getCurrentCursorPosition().location.y-mHeight;
    //    var y2 = y1+this.fP2.y;
   //     console.log("Rest of y: "+y2);
/*
        console.log("distanceX: ",distanceX);
        console.log("distanceY Y: ",distanceY);
        console.log("distanceZ Z: ",distanceZ);
        
    */

        this.mesh.position.set(
          this.main_view.getCurrentCursorPosition().location.x-mWidth,
          this.main_view.getCurrentCursorPosition().location.y-mHeight,
          this.main_view.getCurrentCursorPosition().location.z-mLength,
        );

        var point2 = this.main_view.getCurrentCursorPosition().datasetLocation;
        
        var meshSize = this.mesh.geometry.toJSON();

        console.log("mesh depth: ",meshSize.depth);
        console.log("mesh height: ",meshSize.height);
        console.log("mesh width: ",meshSize.width);


      /*    console.log("X: ",this.main_view.getCurrentCursorPosition().location.x);
        console.log("Y: ",this.main_view.getCurrentCursorPosition().location.y);
        console.log("Z: ",this.main_view.getCurrentCursorPosition().location.z);*/
        this.main_scene.add(this.mesh);
    //    console.log("Mes h: ",this.mesh.geometry.toJSON());
        this.mesh = null;
        console.log(
          "Mesh added at " +
            this.mouseMove.currentObjPos.x +
            "," +
            this.mouseMove.currentObjPos.y +
            "," +
            this.mouseMove.currentObjPos.z
        );

        console.log(this.main_view.scene);
        console.log(this.main_view.getCurrentCursorPosition());

       //reset clicks
        clicked = false;
      }


       
      }

      //console.log(this.mouseMove.currentObjPos);
      //console.log(this.mouseMove.view.getObjectsUnderCursor(this.mouseMove.mouse));
    });
  }
}
