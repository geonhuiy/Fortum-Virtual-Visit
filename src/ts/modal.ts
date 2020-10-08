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
    //console.log(this.main_view);

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
        this.mesh.position.set(
          this.main_view.getCurrentCursorPosition().location.x,
          this.main_view.getCurrentCursorPosition().location.y,
          this.main_view.getCurrentCursorPosition().location.z,
        );
        this.main_scene.add(this.mesh);
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
      }

      //console.log(this.mouseMove.currentObjPos);
      //console.log(this.mouseMove.view.getObjectsUnderCursor(this.mouseMove.mouse));
    });
  }
}
