import {Model} from "./model";

export class Modal {
  constructor() {}
  public assignEventListeners(): void {
    var modalContainer = document.getElementById("modal-container");
    var closeButton = document.getElementsByClassName("close")[0];

    closeButton.addEventListener("click", function () {
      modalContainer.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == modalContainer) {
        modalContainer.style.display = "none";
      }
    });
  }
}
