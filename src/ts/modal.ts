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
  private ivApi: ApiInterface;
  constructor(iv: ApiInterface) {
    this.ivApi = iv;
  }
  // Adds a custom layer to the current scene for adding 3D objects
  public setLayer(): void {
    // Gets the main view and its scene
    this.main_view = this.ivApi.legacyApi.getMainView();
    this.main_scene = this.main_view.scene;
    this.mouseMove = new MouseMove(this.main_view.raycaster, this.main_view);
    // Creating a custom layer
    this.layer = new Layer(this.main_view, this.mouseMove);
    // Adds custom layer to scene
    this.main_view.addToScene(this.layer);
  }

  public assignEventListeners(): void {
    var modalContainer = document.getElementById("modal-container");
    var closeButton = document.getElementsByClassName("close")[0];
    var dimensionForm = document.getElementById("dimensions");
    var container = document.getElementById("indoorviewer");
    this.mouseMove.assignDetectionListener();
    closeButton.addEventListener("click", function () {
      modalContainer.style.display = "none";
    });

    // Dismissing modal if window clicked
    window.addEventListener("click", function (event) {
      if (event.target == modalContainer) {
        modalContainer.style.display = "none";
      }
    });

    // Creates box when form is submitted
    dimensionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.mouseMove.renderBox();
      modalContainer.style.display = "none";
      this.main_scene.add(this.mouseMove.mesh);
      console.log(this.layer);
    });

    // Adds a listener to the NavVis API container
    container.addEventListener("click", (event) => {
      // Checks if there is a mesh (3D object) present
      if (this.mouseMove.mesh != null) {
        // Only places the object with CTRL + LMB

        var point2 = this.main_view.getCurrentCursorPosition().datasetLocation;
   
    //    var meshSize = this.mesh.geometry.toJSON();
       
     //   console.log("mesh depth: ",meshSize.depth);
     //   console.log("mesh height: ",meshSize.height);
    //    console.log("mesh width: ",meshSize.width);

      // Half of the cube size
    /*    let mHeight = meshSize.height/2;
        let mWidth = meshSize.depth/2;
        let mLength = meshSize.width/2;
*/
      //  this.fP = point2;



        if (event.ctrlKey) {
          this.mouseMove.mesh.position.copy(
            this.main_view.getCurrentCursorPosition().location
          );
          this.mouseMove.removeListener();
          this.mouseMove.mesh = null;
        }
      }
    });
  }
}
