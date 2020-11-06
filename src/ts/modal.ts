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
  private modalActive: boolean = false;
  private meshObj: [Mesh];

  // Adds a custom layer to the current scene for adding 3D objects
  public setLayer(iv: ApiInterface): void {
    // Gets the main view and its scene
    this.main_view = iv.legacyApi.getMainView();
    this.main_scene = iv.legacyApi.getMainView().scene;

    // Creating a custom layer
    this.layer = new Layer(this.main_view, this.main_view.scene);
    // Adds custom layer to scene
    this.main_view.addToScene(this.layer);
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
    this.mouseMove.mesh = new THREE.Mesh(geo, mat);
    console.log(this.main_scene);

    // Attaches the created box object to mouse cursor
    this.mouseMove.assignContainer();
  }
  public assignEventListeners(): void {
    this.mouseMove = new MouseMove(this.main_view.raycaster, this.main_view);
    var modalContainer = document.getElementById("modal-container");
    var closeButton = document.getElementsByClassName("close")[0];
    var dimensionForm = document.getElementById("dimensions");
    var container = document.getElementById("indoorviewer");

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
      this.renderBox();
      modalContainer.style.display = "none";
      this.main_scene.add(this.mouseMove.mesh);
    });

    // Adds a listener to the NavVis API container
    container.addEventListener("click", (event) => {
      // Checks if there is a mesh (3D object) present
      if (this.mouseMove.mesh != null) {
        // Updates mouse cursor position via raycast
        this.mouseMove.currentObjPos = this.mouseMove.view.getObjectsUnderCursor(
          this.mouseMove.mouse
        )[0].point;
        // Sets the position of the mesh when clicked
        this.mouseMove.mesh.position.set(
          this.main_view.getCurrentCursorPosition().location.x,
          this.main_view.getCurrentCursorPosition().location.y,
          this.main_view.getCurrentCursorPosition().location.z,
        );
        this.mouseMove.mesh = null;
        this.mouseMove.removeListener();
        console.log(
          "Mesh added at " +
            this.mouseMove.currentObjPos.x +
            "," +
            this.mouseMove.currentObjPos.y +
            "," +
            this.mouseMove.currentObjPos.z
        );
      }
    });
  }
}
