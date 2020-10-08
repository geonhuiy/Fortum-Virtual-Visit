import { ApiInterface, SceneLayerConfigInterface } from "@navvis/indoorviewer";
import { Layer } from "./layer";
import * as THREE from "three";

export class Modal {
  private layer: Layer;
  private main_view: any;
  private main_scene: any;

  public setLayer(iv: ApiInterface): void {
    this.main_view = iv.legacyApi.getMainView();
    console.log(this.main_view);
    this.main_scene = iv.legacyApi.getMainView().scene;
    this.layer = new Layer(this.main_view, this.main_view.scene);
    this.main_view.addToScene(this.layer);
  }
  public paintSphere(): void {
    var height = <HTMLInputElement>document.getElementById("height");
    var width = <HTMLInputElement>document.getElementById("width");
    var length = <HTMLInputElement>document.getElementById("length");
    //var geo = new THREE.SphereGeometry(1, 32, 32);
    var geo = new THREE.BoxGeometry(
      parseFloat(length.value),
      parseFloat(height.value),
      parseFloat(width.value)
    );
    //var box = new THREE.BoxGeometry()
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
  public assignEventListeners(): void {
    var modalContainer = document.getElementById("modal-container");
    var closeButton = document.getElementsByClassName("close")[0];
    var submitButton = document.getElementById("submit");
    console.log(this.main_view);

    closeButton.addEventListener("click", function () {
      modalContainer.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == modalContainer) {
        modalContainer.style.display = "none";
      }
    });

    submitButton.addEventListener("click", (evt) =>{
      evt.preventDefault();
      this.paintSphere();
    });
  }
}
